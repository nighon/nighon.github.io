---
layout: "post"
title: "Terraform 安装和使用"
bgcolor: "#d6e3f8"
---

通过 IaC (Infrastructure as Code, 基础设施即代码) 的方式部署云计算的基础设施高效，批量，不易出错。这里介绍一个 IaC 工具 Terraform。

Terraform 是 HashiCorp 创建的基础设施即代码软件工具。用户通过使用声明性配置语言，即 HashiCorp 配置语言 (HCL)，定义并提供数据中心基础设施，或者使用 JSON 来配置。Terraform 与提供商一起管理外部资源（例如公共云基础设施、私有云基础设施、网络设备、软件即服务、平台即服务）。

HashiCorp 维护着广泛的官方提供商列表，并且还可以与社区开发的提供商集成。Terraform 支持许多云基础设施提供商，例如：亚马逊 AWS，微软云 Azure、谷歌云、腾讯云和阿里云等。

## 安装 Terraform

在 macOS 上使用 [Homebrew]({% post_url 2020-03-09-install-iterm2-oh-my-zsh %}) 安装官方的 Terraform 公式。

首先，安装 HashiCorp Tap，它是我们所有 Homebrew 软件包的存储库。

```console
$ brew tap hashicorp/tap
```

现在，使用 hashcorp/tap/terraform 安装 Terraform。

```console
$ brew install hashicorp/tap/terraform
```

通过使用 Terraform 创建云计算基础设施**（注意：此过程可能会产生云服务提供商扣费）**，Kubernetes 托管服务。部署高可用云服务。
