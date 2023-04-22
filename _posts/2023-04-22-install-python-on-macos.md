---
layout: post
title: "在 macOS 上安装 Python 环境"
categories: python
---

## 安装

macOS 默认安装了 Python 2.7 版本，但是这个版本已经停止维护了，不适合开发。
我们需要安装 Python 3.x（之后我们提到 Python 时，都是指 Python 3.x）。

首先[安装包管理工具 Homebrew](https://nighon.me/2023/03/09/install-iterm2-oh-my-zsh.html)，然后安装 Python:

```shell
$ brew install python
```

## Pip

Homebrew 会安装指向 Homebrew 的 Python 的 pip。

## 使用 Python

设置默认的 Python 版本。找到 Python3 命令所在位置：

```shell
$ which python3
/usr/bin/python3
```

添加别名：

```shell
$ echo "alias python='/usr/bin/python3'" >> ~/.zshrc
```

重新载入 `$ source ~/.zshrc` 使别名生效。

```shell
$ python --version
Python 3.9.6
```
