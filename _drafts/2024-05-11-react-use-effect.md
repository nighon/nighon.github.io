---
layout: post
title: 使用 useEffect
---

使用 useEffect

## Specify the Effect dependencies（指定 Effect 的依赖）

```javascript
useEffect(() => {
  // This runs after every render
});
```

```javascript
useEffect(() => {
  // This runs only on mount (when the component appears)
}, []);
```

```javascript
useEffect(() => {
  // This runs on mount *and also* if either a or b have changed since the last render
}, [a, b]);
```

The code inside the Effect does not use any props or state, so your dependency array is [] (empty). This tells React to only run this code when the component “mounts”, i.e. appears on the screen for the first time.

Effect 中的代码没有用任何属性或状态，因此你的依赖数组为 []（空）。这告诉 React 仅在组件“挂载”时运行此代码，即第一次出现在屏幕上时。

## Clean up function（清理函数）

React will call your cleanup function each time before the Effect runs again, and one final time when the component unmounts (gets removed). Let’s see what happens when the cleanup function is implemented:

每当 Effect 再次运行之前，React 都会调用你的清理函数，并且当组件被卸载（被删除）时，还会最后再调用一次。让我们看看执行清理功能时会发生什么：

```javascript
useEffect(() => {
  const connection = createConnection();
  connection.connect();
  return () => {
    connection.disconnect();
  };
}, []);
```

摘自 [https://react.dev/learn/synchronizing-with-effects](https://react.dev/learn/synchronizing-with-effects)
