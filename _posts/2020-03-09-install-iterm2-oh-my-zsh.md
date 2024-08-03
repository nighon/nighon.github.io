---
layout: post
title: "在 macOS 上使用 iTerm2, Zsh 和 Oh My Zsh"
image: "/assets/img/screen-mock-1.jpg"
bgcolor: "#cfc"
---

用 Homebrew 安装 macOS 上命令行的开发环境组合：iTerm2, Zsh 和 Oh My Zsh。

## 安装 Homebrew

Homebrew 是一个免费的开源软件包管理系统，可简化 macOS 上的软件安装。

```shell
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## 安装 iTerm2

iTerm2 是一款适用于 macOS 的免费开源终端模拟器，用来替代系统默认的 Terminal。

```shell
$ brew install --cask iterm2
```

## 安装 Zsh 和 Oh My Zsh

Zsh 是一种专为交互式使用而设计的 shell，同时它也是一种功能强大的脚本语言。<br>
Oh My Zsh 是一个用于管理 Zsh 配置的开源框架。

```shell
$ brew install zsh && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

安装完毕后，Oh My Zsh 会自动替换原来默认的终端。

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

## iTerm2，Zsh 和 Oh My Zsh 的区别

当您在命令行中输入命令并读取输出时，您正在使用一个称为终端（或 Windows 上的控制台）的程序。终端接收您的命令并将它们转发到一个称为 shell 的程序，该程序的工作是实际执行您在终端中输入的命令，并可能打印一些输出。然后 shell 的输出将显示在终端窗口中。

终端就像 Web 浏览器，而 shell 就像 javascript 引擎。您的浏览器接受您的输入（单击、按键、鼠标移动）并将它们发送到 javascript，由 javascript 处理这些操作，然后浏览器显示结果。

iTerm2 是一个终端模拟器，旨在替代 macOS 终端，并且功能更加丰富。它是为您提供命令行界面的终端程序。

Zsh 是一种特定的 shell，bash 也是一种特定的 shell，就像 linux 是一种特定的操作系统一样。有不同的 shell 提供不同的语法、特性和功能。有 bash、cshell、fish、powershell、Zsh 等。
安装 Zsh，您实际上是在下载一个新程序并告诉您的终端使用该程序（例如，而不是 bash）来处理命令并运行脚本。

Oh My Zsh 提供了一种管理 Zsh 配置、主题和插件的方法，以扩展 shell 的外观和功能。
我非常推荐这个设置——它就像命令行中的凯迪拉克。

(原文: [Difference between iTerm2, zsh and oh-my-zsh](https://stackoverflow.com/a/64316750/2862195))
