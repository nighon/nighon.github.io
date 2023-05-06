---
layout: post
title: "Git 常用操作"
categories: git
---

## 设置密钥

权限校验有两种方式：密码和密钥，推荐使用密钥校验。生成秘钥：

```shell
$ ssh-keygen -t rsa -b 4096 -C "your.name@gmail.com"
```

并加入到 Gitlab 上：Profile Settings > SSH Keys

```shell
$ clip < ~/.ssh/id_rsa.pub          # 在 Windows 上复制到剪切板
```

如果已经有私钥了，可以[从私钥创建公钥](https://askubuntu.com/a/53555)
<br>`ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub`

在本地电脑上，设置提交人的身份信息

```shell
$ git config --global user.email "your.name@gmail.com"
$ git config --global user.name "Your Name"
```

这样，访问 Git 远程仓库时，不需要每次都输入密码了。

## 协同开发

团队公共仓库需要用到两种分支：

- master: 主线分支，团队最新成果，稳定。开发人员通过发起 PR，把自己最新开发成果并入主线分支。
- 其它分支: 开发分支，具有各种不同用途（如：开发新功能，修复问题）。可以随意创建，推送，删除。

举个例子，假设我们有个项目，团队公共仓库叫 nighon，我的私有仓库叫 john。
首先从公共仓库（nighon）Fork 到自己的仓库（john）下面 `nighon/master` => `john/master`。

然后拉取仓库到本地电脑

```shell
$ git pull git@github.com:john/myapp.git
```

接着设置远程的 origin 仓库地址

```shell
$ git remote set-url origin git@github.com:john/myapp.git
```

再从公共分支合并到自己的主分支，同样要设置远程的 upstream 仓库地址

```shell
$ git remote add upstream git@github.com:nighon/myapp.git
```

最后，查看一下设置结果是否正确 `git remote -v`

开发过程中，需要拉取并合并 nighon/master => john/master（本地）

```shell
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
```

每次需要添加功能时，通常会新建一个分支。从 master 新建分支

```shell
$ git checkout -b my-awesome-feature master

# 或者是为修复问题而新建分支 (fix issue)
$ git checkout -b fix-something-wrong master
```

## 常用指令

例子以 HEAD~ 为 commit id

```shell
$ git clean -fd             # 清除未包含的文件
$ git checkout HEAD~ -- file1/to/restore file2/to/restore   # 恢复文件
$ git push origin +HEAD~:master                       # 强制推送（覆盖）远程分支
$ git log -p -- filename                              # 列出单个文件历史改动记录
$ git diff HEAD~                                      # 列出改动
$ git diff-tree --no-commit-id --name-only -r HEAD~   # 列出改动的文件
$ git branch -d my-awesome-feature                    # 删除本地分支
```
