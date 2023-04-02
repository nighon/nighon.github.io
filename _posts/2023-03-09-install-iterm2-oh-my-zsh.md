---
layout: post
title: "在 macOS 系统上安装 iTerm2 和 oh-my-zsh"
bgcolor: "#cfc"
---

## 安装 Homebrew

```shell
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## 安装 iTerm2

```shell
$ brew cask install iterm2
```

## 安装 zsh 和 oh-my-zsh

```shell
$ brew install zsh && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

安装完毕后，oh-my-zsh 会自动替换原来默认的终端。

## 设置色彩和样式

```shell
$ cd Downloads && curl -O https://raw.githubusercontent.com/MartinSeeler/iterm2-material-design/master/material-design-colors.itermcolors
```

把颜色预设包下载到 Downloads 目录后，设置 iTerm2 使用刚才安装的主题文件。打开 iTerm2 然后按下快捷键 “CMD + , " 打开 iTerm2 偏好设置。
点开 Profile 下面的 Colors 页面，在右下角找到 Color Presets 的选项。

![](/assets/img/screenshot-iterm2-preferences.png)

点开 Color Presets 选择 "Import"，从 Downloads 目录导入刚才下载的颜色预设包。

然后，选中刚才导入的预设，就会像这样显示在列表中。

<img src="/assets/img/screenshot-iterm2-options.png" class="small-image" />

设置完成

![](/assets/img/screen-mock-1.jpg)
