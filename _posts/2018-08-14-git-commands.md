---
layout: post
title: "Git 常用命令"
categories: git
---

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
    $ git reset HEAD^

    # Force-push the new HEAD commit
    $ git push origin +HEAD:master

或者仅删除远程

    # If you want to still have it in your local repository
    # and only remove it from the remote, then you can use
    $ git push origin +HEAD^:<name of your branch, most likely 'master'>

> 先重置本地分支
>
>    `$ git reset ea75bd4a02afa2bf09ab5d33`
>
> 然后本地修改，再重置远程分支 master，重新发起 PR
>
>    `$ git push origin +ea75bd4a02afa2bf09ab5d33:master`
