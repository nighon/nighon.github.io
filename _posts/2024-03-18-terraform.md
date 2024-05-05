---
layout: "post"
title: "Terraform 安装和使用"
bgcolor: "#d6e3f8"
---

通过 IaC (Infrastructure as Code) 的方式部署云计算的基础设施高效，不易出错。这里介绍一个 IaC 工具 Terraform。

## 安装 Terraform

[Homebrew]({% post_url 2023-03-09-install-iterm2-oh-my-zsh %}) 是一款适用于 macOS 的免费开源包管理系统。从终端安装官方 Terraform 公式。

首先，安装 HashiCorp Tap，它是我们所有 Homebrew 软件包的存储库。

```shell
$ brew tap hashicorp/tap
```

现在，使用 hashcorp/tap/terraform 安装 Terraform。

```shell
$ brew install hashicorp/tap/terraform
```

通过使用 Terraform 创建云计算基础设施**（注意此过程可能会涉及云服务提供商扣费）**，Kubernetes 托管服务。部署高可用云服务。
