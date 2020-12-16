---
title: Deploy HTTPS for Tencent CDN
---

- 为 CDN 申请 Let's Encrypt 证书

[详细过程请参考 Digital Ocean 这篇文章](https://www.digitalocean.com/community/tutorials/how-to-acquire-a-let-s-encrypt-certificate-using-dns-validation-with-acme-dns-certbot-on-ubuntu-18-04)

- 配置腾讯云 CDN

1. 进入腾讯云云产品 > 内容分发网络 > 证书管理，点击“配置证书”按钮导入 fullchain.pem 和 key.pem
2. 进入腾讯云云产品 > 内容分发网络 > 域名管理，选择对应的域名，点击“管理”进入，选择 “HTTPS配置” > “强制跳转”，设置 http > https, 302
