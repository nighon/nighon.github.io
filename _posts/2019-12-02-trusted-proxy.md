---
title: Laravel 5.5 Now Includes TrustedProxy
---

Laravel v5.5 was released just a week ago at Laracon EU. You may have noticed that the v5.5 composer.json file requires the fideloper/proxy composer package. For me, this is one of those packages I must include immediately on every project because I use Amazon Web Services and Google Cloud every day, so I am thankful Laravel 5.5 includes this package by default.
你也许注意到 v5.5 的 composer.json 文件依赖 fildeloper/proxy 包了。

Setting up the package is a breeze, and I especially appreciate that this package takes care of redundant setup. Let’s briefly cover what this package provides for Laravel, and why it’s an important package in the Laravel ecosystem.

What Does the TrustedProxy Package Do?
On a high level, Trusted Proxy tells Laravel about proxies that can be trusted and how to map X-Forwarded-* headers from the request.
