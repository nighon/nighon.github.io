---
layout: post
title: "用 rbenv 安装 Ruby 运行环境"
categories: ruby
bgcolor: "#8e5ea2"
color: "#fff"
---
### 安装 rbenv

安装依赖包

```shell
$ sudo apt-get update
$ sudo apt-get install -y autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm3 libgdbm-dev
```

安装 rbenv

```shell
$ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
$ echo 'export PATH="$PATH:$HOME/.rbenv/bin"' >> ~/.bashrc
$ echo 'eval "$(rbenv init -)"' >> ~/.bashrc
$ source ~/.bashrc
```

> 如果是 macos，推荐使用 Homebrew 安装
>
>    $ brew install rbenv
>
>    $ echo 'export PATH="$PATH:$HOME/.rbenv/bin"' >> ~/.zshrc
>
>    $ echo 'eval "$(rbenv init -)"' >> ~/.zshrc
>
>    $ source ~/.zshrc

Restart your shell so that PATH changes take effect. Verify that rbenv is properly set up using this rbenv-doctor script（重新打开 Shell，使 PATH 生效。检验 rbenv 是否已经设置好了，用 `type rbenv`，或者下面语句）:

```shell
$ curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash
```

### Install ruby-build as an rbenv plugin（安装插件 ruby-build）

```shell
$ mkdir -p "$(rbenv root)"/plugins
$ git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
```

### Install Ruby

> 如果无法直接在线安装，可以[安装下载好的 Ruby 文件](https://stackoverflow.com/questions/35589469/install-ruby-using-rbenvs-downloaded-file/35589999#35589999)。
>
>    $ mkdir ~/.rbenv/cache
>
>    $ cp ~/Downloads/ruby-2.7.2.tar.bz2 ~/.rbenv/cache/
>
>    $ env RUBY_BUILD_MIRROR_URL=file:///home/$(whoami)/.rbenv/cache/ruby-2.7.2.tar.bz2

```shell
$ rbenv install --verbose 2.7.2
```

### Set default Ruby（设置默认的 Ruby 版本）

```shell
$ rbenv global 2.7.2
$ rbenv versions
```
