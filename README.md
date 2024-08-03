# nighon.github.io

## 安装 Ruby

```shell
$ rbenv install 3.3.3
$ rbenv global 3.3.3
$ rbenv versions
```

## 安装第三方库

```shell
$ gem update --system
$ gem install bundler
$ bundle update
```

## 启动

```shell
$ jekyll serve
# $ bundle exec jekyll serve
```

## 生成语法高亮样式

```shell
$ rougify help style
$ rougify style github > assets/css/highlight-github.css
```
