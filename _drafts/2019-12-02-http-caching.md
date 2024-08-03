---
layout: post
title: "HTTP Caching"
bgcolor: "#FDF0EC"
---

介绍 HTTP 缓存。

Let’s see [Google’s flow chart about what cache-control policy to use](https://itnext.io/laravel-the-hidden-setcacheheaders-middleware-4cd594ba462f):

<img src="/assets/img/flow-of-http-caching.png" class="small-image" />

### Cache-Control Directive

[must-revalidate 与 no-cache 的区别](https://stackoverflow.com/a/19938619)

**must-revalidate** means "once the cache expires, refuse to return stale responses to the user even if they say that stale responses are acceptable". 意思是“只要缓存过期，就拒绝返回旧的响应内容给用户，即使用户能够接受”。

**no-cache** implies `must-revalidate` plus the fact the response becomes stale right away. 包含 `must-revalidate` 并且立即使响应内容过期。

### 浏览器 F5

In browsers, [F5 performs a "Conditional Refresh"](https://stackoverflow.com/a/13078197) which hits the server with a Conditional request (using the cache file only if the server says to do so via a HTTP/304). 在浏览器里按 F5 会向服务器发起请求。如果服务器返回 304，则继续使用浏览器缓存。

