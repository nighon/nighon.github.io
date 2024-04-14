---
layout: post
title: "CSS Margin Collapsing"
image: "/assets/img/photo-1614813502891-ee4d23e03dba.avif"
---

CSS 边距在某些情况下会产生折叠 (Margin Collapsing)，此时，边距不会相加。

## 1. 上下两个相邻元素垂直边距折叠

当上下两个元素之间都有垂直边距时，你可能认为两个元素的边距是两个边距之和。而实际上，两个元素之间的边距只取两者之间大的那个边距。

例如：有上下两个 div，上面 div 的 margin-bottom: 100px, 下面 div 的 margin-top: 20px, 则他们之间实际的边距是 100px (margin-bottom: 100px)

<p class="codepen" data-height="400" data-default-tab="html,result" data-slug-hash="zYLgwdx" data-user="nighon">
  <span>See the Pen <a href="https://codepen.io/nighon/pen/zYLgwdx">
  Margin Collapse</a> by John Jian (<a href="https://codepen.io/nighon">@nighon</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## 2. 父元素和子元素垂直边距折叠

当父元素和子元素都有同方向的垂直边距（都有 margin-top，或者都有 margin-bottom），只有大的那个边距会生效。

例如：有里外父子两个 div，父 div 的 margin-top: 20px, 子 div 的 margin-top: 100px, 则父元素与外界的实际边距是 100px。

<p class="codepen" data-height="400" data-default-tab="html,result" data-slug-hash="BaOEXYX" data-user="nighon">
  <span>See the Pen <a href="https://codepen.io/nighon/pen/BaOEXYX">
  Margin Collapse (Parent with or without padding-top)</a> by John Jian (<a href="https://codepen.io/nighon">@nighon</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<br/>

**注意：尽管子元素设置的是与父元素的边距，但实际上并没有生效！反而变成了父元素与外界的边距了。**

这是正常现象，边距不会影响子元素相对于其父元素的位置，[**除非父元素与子元素之间有垂直方向的 padding**](https://stackoverflow.com/a/1762575/2862195)。

现在，我们把代码中 .parent 被注释的那行开启 (padding-top: 1px)，看看会发生什么。

<p class="codepen" data-height="400" data-default-tab="css,result" data-slug-hash="OJoYLMy" data-user="nighon">
  <span>See the Pen <a href="https://codepen.io/nighon/pen/OJoYLMy">
  Margin Collapse (Parent with padding-top)</a> by John Jian (<a href="https://codepen.io/nighon">@nighon</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<br/>

这次，子元素的 margin-top 才真正是与父元素之间的边距了，而不是父元素与外界的边距。

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
