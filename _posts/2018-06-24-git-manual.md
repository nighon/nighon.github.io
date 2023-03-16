---
layout: post
title: "Git 常用操作"
categories: git
bgcolor: "#F1F7EE"
---
### 设置密钥

权限校验有两种方式：密码和密钥，推荐使用密钥校验。方法如下：

```ssh
# 生成秘钥，用于 Git 权限验证
ssh-keygen -t rsa -b 4096 -C "your.name@gmail.com"
```

并加入到 Gitlab 上：Profile Settings > SSH Keys

```ssh
# 在 Windows 上可以这样复制到剪切板
clip < ~/.ssh/id_rsa.pub
```

> 如果已经有私钥了，可以[从私钥创建公钥](https://askubuntu.com/a/53555)
>
> $ ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub

在本地电脑上，设置提交人的身份信息

    $ git config --global user.email "your.name@gmail.com"
    $ git config --global user.name "Your Name"

这样，访问 Git 远程仓库时，不需要每次都输入密码了。

### 在分支上开发

我们可以创建很多分支，但通常只有一个主线分支：master。

- master: 保护分支。禁止推送，只能通过 PR (Pull Request) 进行合并。
- 其它分支: 可以随意创建，推送，删除。所有的开发都在这些分支上进行。

首先从公共仓库（假设是 nighon）Fork 到自己的仓库下面（假设是 john）。
`nighon/master` => `john/master`（这个分支并不需要设置禁止推送）。

然后拉取仓库到本地电脑

    $ git pull git@github.com:john/myapp.git

先要设置远程的 origin 仓库地址

    $ git remote set-url origin git@github.com:john/myapp.git

从公共分支合并到自己的主分支，先要设置远程的 upstream 仓库地址

    $ git remote add upstream git@github.com:nighon/myapp.git

> 查看一下设置结果 git remote -v

拉取并合并 nighon/master => john/master（本地）

    $ git fetch upstream
    $ git checkout master
    $ git merge upstream/master

每次需要添加功能时，通常会新建一个分支。从 master 新建分支

    $ git checkout -b my-awesome-feature master

    # 或者是为修复问题而新建分支 (fix issue)
    $ git checkout -b fix-something-wrong master

开发阶段

    $ vim ...

开发，修改，测试通过后，添加到本地仓库

    $ git add ...
    $ git commit -m 'Add something awesome'

推送到远程仓库

    $ git push -u origin my-awesome-feature

然后，在远程仓库管理页面上，发起一个 PR (Pull Request)，由版本库维护人员（其他同事）进行 Code Review，确认无误后，合并到 master 分支，并删除 my-awesome-feature 分支，最后关闭该 PR。

> 如果维护人员觉得不妥，在该 PR 提出相关意见，开发人员继续改进，然后再到该 PR 提请合并。

把远程已删除的分支，同步到本地

    $ git remote prune origin

删除本地分支

    $ git branch -d my-awesome-feature

### 取消刚才的提交 [Undo the Last Commit and Redo](https://stackoverflow.com/questions/927358/how-to-undo-the-last-commits-in-git/927386#927386)

    $ git commit -m "Something terribly misguided"              (1)
    $ git reset HEAD~                                           (2)
    << edit files as necessary >>                               (3)
    $ git add ...                                               (4)
    $ git commit -c ORIG_HEAD                                   (5)

### [使用历史版本的某个文件](https://stackoverflow.com/questions/215718/reset-or-revert-a-specific-file-to-a-specific-revision-using-git/215731#215731)

    $ git checkout <COMMIT-ID> -- file1/to/restore file2/to/restore
    $ git reset --hard <COMMIT-ID> -- file1/to/restore file2/to/restore

两种方法都可以，推荐用 git checkout。[关于两者的区别](https://stackoverflow.com/questions/3639342/whats-the-difference-between-git-reset-and-git-checkout/3639387#3639387)

- git reset is specifically about updating the index, moving the HEAD.
- git checkout is about updating the working tree (to the index or the specified tree). It will update the HEAD only if you checkout a branch (if not, you end up with a detached HEAD).

### 删除远程最后一次提交

    # Remove commit locally
    $ git reset HEAD~

    # Force-push the new HEAD commit
    $ git push origin +HEAD:master

或者仅删除远程

    # If you want to still have it in your local repository
    # and only remove it from the remote, then you can use
    $ git push origin +HEAD^:<name of your branch, most likely 'master'>

> 先重置本地分支
>
>    $ git reset ea75bd4a02afa2bf09ab5d33
>
> 然后本地修改，再重置远程分支 master，重新发起 PR
>
>    $ git push origin +ea75bd4a02afa2bf09ab5d33:master

## Git 常用指令

以 HEAD~ 为例

```ssh
# 列出改动
git diff HEAD~

# 列出改动的文件
git diff-tree --no-commit-id --name-only -r HEAD~
```
