---
title: 用 rbenv 安装 Ruby 运行环境
categories: ruby
---

To be Updated. check [this article](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-18-04)

有两种工具创建 Ruby 运行环境，rbenv 或者 RVM。这里我们介绍 rbenv。

### 安装 rbenv

安装依赖包

    $ sudo apt-get install -y autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm3 libgdbm-dev

安装 rbenv

    $ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
    $ cd ~/.rbenv && src/configure && make -C src
    $ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
    $ echo 'eval "$(rbenv init -)"' >> ~/.bashrc
    $ source ~/.bashrc

Restart your shell so that PATH changes take effect. Verify that rbenv is properly set up using this rbenv-doctor script（重新打开 Shell，使 PATH 生效。检验 rbenv 是否已经设置好了，用 `type rbenv`，或者下面语句）:

    $ curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash

### Install ruby-build as an rbenv plugin（安装插件 ruby-build）

    $ mkdir -p "$(rbenv root)"/plugins
    $ git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build

### Install Ruby

>    如果无法直接在线安装，可以[安装下载好的 Ruby 文件](https://stackoverflow.com/a/35589999)。
>
>    $ mkdir ~/.rbenv/cache  
>    $ cp /vagrant/ruby-2.4.4.tar.bz2 ~/.rbenv/cache/  
>    $ env RUBY_BUILD_MIRROR_URL=file:///home/$(whoami)/.rbenv/cache/ruby-2.4.4.tar.bz2

    $ rbenv install --verbose 2.4.4

### Set default Ruby（设置默认的 Ruby 版本）

    $ rbenv global 2.4.4
    $ rbenv versions
