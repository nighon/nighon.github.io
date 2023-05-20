---
layout: post
title: "安装 Python 环境"
categories: python
image: "/assets/img/photo-1458819714733-e5ab3d536722.avif"
bgcolor: "#7290a4"
color: "#fff"
---

在 Linux 和 macOS 上安装 Python 环境。

[Installing Python 3 on Linux](https://docs.python-guide.org/starting/install3/linux/)

```shell
$ python3 --version

$ sudo apt-get update
$ sudo apt-get install python3.6
```

[Install pip](https://pip.pypa.io/en/stable/installing/)

```shell
$ curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
$ python get-pip.py
```

Prerequisites, [Install python3.x-dev](https://stackoverflow.com/a/33874511/2862195).

```shell
$ sudo apt-get install python-dev
$ sudo apt-get install python3.6-dev
```

I would just avoid the use of virtualenv after Python3.3+ and instead [use the standard shipped library venv](https://stackoverflow.com/a/47559925/2862195). To create a new virtual environment you would type:

```shell
$ sudo apt-get install python3-venv
$ python3 -m venv ~/.myvenv
$ source ~/.myvenv/bin/activate
$ deactivate
```

Install pip

```shell
$ pip install --upgrade pip
```

Install packages using pip

```shell
$ pip install Scrapy --user
$ scrapy startproject mybot

# cd mybot
$ scrapy genspider example example.com  # website to crawl
```

macOS 上安装 Python 和 Windows 上有所不同。

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
