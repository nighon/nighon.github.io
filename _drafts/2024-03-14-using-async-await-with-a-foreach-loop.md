---
layout: "post"
title: "Using async/await with a forEach loop"
---

Are there any issues with using async/await in a forEach loop? I'm trying to loop through an array of files and await on the contents of each file.

在 `forEach` 循环中使用 `async/await` 是否存在任何问题？我试图循环遍历文件数组并等待每个文件的内容。

```javascript
import fs from 'fs-promise'

async function printFiles () {
  const files = await getFilePaths() // Assume this works fine

  files.forEach(async (file) => {
    const contents = await fs.readFile(file, 'utf8')
    console.log(contents)
  })
}

printFiles()
```

This code does work, but could something go wrong with this? I had someone tell me that you're not supposed to use async/await in a higher-order function like this, so I just wanted to ask if there was any issue with this.

这段代码确实有效，但是会出现什么问题吗？有人告诉我，你不应该在像这样的高阶函数中使用 `async/await`，所以我只是想问一下这是否有任何问题。

--

Sure the code does work, but I'm pretty sure it doesn't do what you expect it to do. It just fires off multiple asynchronous calls, but the printFiles function does immediately return after that.

当然，代码确实有效，但我很确定它没有达到您期望的效果。它只是触发多个异步调用，但 printFiles 函数会立即返回。

## Reading in sequence（按顺序读取）

If you want to read the files in sequence, you cannot use forEach indeed. Just use a modern for … of loop instead, in which await will work as expected:

如果你想按顺序读取文件，你确实不能使用 `forEach`。只需使用现代的 `for ... of` 循环即可，其中 `wait` 将按预期工作：

```javascript
async function printFiles () {
  const files = await getFilePaths();

  for (const file of files) {
    const contents = await fs.readFile(file, 'utf8');
    console.log(contents);
  }
}
```

## Reading in parallel（并行读取）

If you want to read the files in parallel, you cannot use forEach indeed. Each of the async callback function calls does return a promise, but you're throwing them away instead of awaiting them. Just use map instead, and you can await the array of promises that you'll get with Promise.all:

如果你想并行读取文件，你确实不能使用 `forEach` 。每个异步回调函数调用都会返回一个 `promise`，但您将它们扔掉而不是等待它们。只需使用 `map` 即可，您可以等待通过 `Promise.all` 获得的一系列 `promise`：

```javascript
async function printFiles () {
  const files = await getFilePaths();

  await Promise.all(files.map(async (file) => {
    const contents = await fs.readFile(file, 'utf8')
    console.log(contents)
  }));
}
```

（原文: [https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop/37576787#37576787](https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop/37576787#37576787)）