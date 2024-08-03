---
layout: "post"
title: "在腾讯云 COS 上部署静态网站服务"
bgcolor: "#fef5ef"
---

介绍如何利用腾讯云 COS 来部署静态网站，比如：博客，Next.js 前端资源部署等。
分为如下几个步骤：

1. [创建 COS 存储桶](#设置-terraform-基本信息)
2. [配置存储桶为静态网站](#配置存储桶为静态网站)。
3. [关联 CDN 并配置域名访问存储桶](#关联-cdn-并配置域名访问存储桶)。

这些步骤可以通过登录腾讯云控制台手动操作，但步骤繁琐。通过 IaC (Infrastructure as Code, 基础设施即代码) 的方式部署云计算的基础设施高效，批量，不易出错。这里介绍一个 IaC 工具 Terraform。

Terraform 是 HashiCorp 创建的基础设施即代码软件工具。用户通过使用声明性配置语言，即 HashiCorp 配置语言 (HCL)，定义并提供数据中心基础设施，或者使用 JSON 来配置。Terraform 与提供商一起管理外部资源（例如公共云基础设施、私有云基础设施、网络设备、软件即服务、平台即服务）。

HashiCorp 维护着广泛的官方提供商列表，并且还可以与社区开发的提供商集成。Terraform 支持许多云基础设施提供商，例如：亚马逊 AWS，微软云 Azure、谷歌云、腾讯云和阿里云等。

## 安装 Terraform

在 macOS 上使用 [Homebrew]({% post_url 2020-03-09-install-iterm2-oh-my-zsh %}) 安装官方的 Terraform 公式。

首先，安装 HashiCorp Tap，它是我们所有 Homebrew 软件包的存储库。

```shell
$ brew tap hashicorp/tap
```

现在，使用 hashcorp/tap/terraform 安装 Terraform。

```shell
$ brew install hashicorp/tap/terraform
```

通过使用 Terraform 创建云计算基础设施，Kubernetes 托管服务。部署高可用云服务。**（注意：此过程可能会产生云服务提供商扣费）**

## 设置 Terraform 基本信息

需要先在腾讯云控制台创建一个子账号供 Terraform 使用：

1. 禁用密码登录。
2. 仅供 API 调用使用。

复制密钥 secret 并填写到下面的 `terraform.tfvars` 文件中，

```
# terraform.tfvars
secret_id = "your_secret_id"
secret_key = "your_secret_key"
availability_region = "ap-singapore"
availability_zone = "ap-singapore-4"
```

```shell
$ echo 'terraform.tfvars' >> .gitignore # 在版本库中忽略该文件
```

在 `variables.tf` 文件中填写相关的变量，比如域名，CDN 配置。

```terraform
# variables.tf
variable "secret_id" {
  type        = string
  description = "Secret ID"
  # sensitive   = true
}

variable "secret_key" {
  type        = string
  description = "Secret Key"
  sensitive   = true
}

variable "availability_region" {
  type        = string
  description = "Region"
  default     = "ap-singapore"
}

variable "availability_zone" {
  type        = string
  description = "Zone"
  default     = "ap-singapore-4"
}

variable "uin" {
  type        = string
  default     = "100000xxxxxx"
}

variable "sub_domain" {
  type        = string
  default     = "assets"
}

variable "domain" {
  type        = string
  default     = "redridgemountains.com"
}

variable "cdn_area" {
  type        = string
  default     = "overseas"   # mainland, overseas
}
```

```terraform
# provider.tf
terraform {
  required_providers {
    tencentcloud = {
      source = "tencentcloudstack/tencentcloud"
      # version = "1.81.82"
    }
  }
}

provider "tencentcloud" {
  secret_id   = var.secret_id
  secret_key  = var.secret_key
  region      = var.availability_region
}
```

```terraform
# output.tf
output "bucket_endpoint" {
  value = tencentcloud_cos_bucket.example.website.0.endpoint
}
```

## 创建 COS 存储桶

1. 存储桶私有读写。
2. 公开访问只能通过 CDN。

```terraform
# infra_cos.tf
data "tencentcloud_user_info" "example" {}

locals {
  # uin = data.tencentcloud_user_info.example.uin
  uin = var.uin
  app_id = data.tencentcloud_user_info.example.app_id
  bucket_name = "${replace(var.sub_domain, ".", "-")}-${replace(var.domain, ".", "-")}-${local.app_id}"
}

# Bucket for static website
resource "tencentcloud_cos_bucket" "example" {
  # Bucket format should be [custom name]-[appid].
  bucket = local.bucket_name
  acl    = "private"

  website {
    index_document = "index.html"
    error_document = "404.html"
  }

  # cors_rules {
  #   allowed_origins = ["http://*.redridgemountains.com"]
  #   allowed_methods = ["PUT", "POST"]
  #   allowed_headers = ["*"]
  #   max_age_seconds = 300
  #   expose_headers  = ["Etag"]
  # }
}

resource "tencentcloud_cos_bucket_policy" "example" {
  depends_on = [ tencentcloud_cos_bucket.example ]
  bucket = local.bucket_name

  policy = <<EOF
{
  "version": "2.0",
  "Statement": [
    {
      "Principal": {
        "qcs": [
          "qcs::cam::uin/${local.uin}:service/cdn"
        ]
      },
      "Action": [
        "name/cos:GetObject",
        "name/cos:HeadObject",
        "name/cos:OptionsObject"
      ],
      "Effect": "Allow",
      "Resource": [
        "qcs::cos:${var.availability_region}:uid/${local.app_id}:${local.bucket_name}/*"
      ]
    }
  ]
}
EOF
}

resource "tencentcloud_cos_bucket_object" "example" {
  bucket = local.bucket_name
  key    = "404.html"
  source = "404.html"
}
```

创建 404.html 文件，提供更友好的 404 页面：

```shell
$ echo '<html><head><title>404</title></head><body>Page not found.</body></html>' > 404.html
```

## 配置存储桶为静态网站

```terraform
# infra_cdn.tf
locals {
  cdn_domain = "${var.sub_domain}.${var.domain}"
}

resource "tencentcloud_cdn_domain" "example" {
  domain       = local.cdn_domain
  service_type = "web"
  area         = var.cdn_area

  cache_key {
    full_url_cache = "off"
  }

  origin {
    origin_type          = "cos"
    origin_list          = [tencentcloud_cos_bucket.example.website.0.endpoint]
    server_name          = tencentcloud_cos_bucket.example.website.0.endpoint
    origin_pull_protocol = "follow" # http, https and follow
    cos_private_access   = "on"
  }

  https_config {
    https_switch         = "off"
    http2_switch         = "off"
    ocsp_stapling_switch = "off"
    spdy_switch          = "off"
    verify_client        = "off"
  }
}

```

## 关联 CDN 并配置域名访问存储桶

```terraform
# infra_dns_record.tf
# Create a dns record
resource "tencentcloud_dnspod_record" "example" {
  depends_on = [ tencentcloud_cdn_domain.example ]
  domain      = var.domain
  sub_domain  = var.sub_domain
  record_type = "CNAME"
  record_line = "默认"
  value       = tencentcloud_cdn_domain.example.cname
  # depends_on  = [tencentcloud_cos_bucket.example]
}

# # Filter dns records
# data "tencentcloud_dnspod_records" "example" {
#   domain    = "example.com"
#   subdomain = "www"
#   depends_on  = [tencentcloud_dnspod_record.example]
# }

# output "dns_record" {
#   value = data.tencentcloud_dnspod_records.example.result
# }

```

## 运行 Terraform

```shell
$ terraform init
$ terraform plan
$ terraform apply --auto-approve
# $ terraform destroy --auto-approve
```

**注意：每次创建新的存储桶时，要复制此目录，并删除 .tfstate 文件。不然就是在之前的桶上修改，而不是创建新的。**
