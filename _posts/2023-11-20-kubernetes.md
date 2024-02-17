---
layout: post
title: "Kubernetes 常用命令"
---

Kubernetes 常用命令

## Deployment（部署）

```shell
$ kubectl get deployments     # List deployments（查看列表 deployments）
$ kubectl get pods -o wide    # let’s check if the number of Pods changed （查看列表 Pods）
```

## Scale（扩展）

```shell
$ kubectl get rs              # Show replicas
$ kubectl scale deployments/kubernetes-bootcamp --replicas=4      # Scale up
$ kubectl scale deployments/kubernetes-bootcamp --replicas=2      # Scale down
$ kubectl describe deployments/kubernetes-bootcamp                # The change was registered in the Deployment events log.
```

```shell
{% raw %}$ export NODE_PORT="$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')"{% endraw %}
$ echo "NODE_PORT=$NODE_PORT"
$ curl http://"$(minikube ip):$NODE_PORT"
```

每次运行curl命令时，您都会命中不同的Pod。 请注意，所有 Pod 现在都运行最新版本 (v2)。

## Rolling Update（滚动更新）

回滚更新
让我们执行另一次更新，并尝试部署带有 v10 标记的映像：

```shell
$ kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=gcr.io/google-samples/kubernetes-bootcamp:v10
```

使用 get deployments 查看部署的状态：

```shell
$ kubectl get deployments
```

请注意，输出并未列出所需的可用 Pod 数量。 运行 get pods 子命令以列出所有 Pod：

```shell
$ kubectl get pods
```

请注意，某些 Pod 的状态为 ImagePullBackOff。

要更深入地了解问题，请运行 describe pods 子命令：

```shell
$ kubectl describe pods
```

在受影响 Pod 的输出的“事件”部分中，请注意存储库中不存在 v10 映像版本。

要将部署回滚到上一个工作版本，请使用 rollout undo 子命令：

```shell
$ kubectl rollout undo deployments/kubernetes-bootcamp
```

rollout undo 命令将部署恢复到之前的已知状态（映像的 v2）。 更新已进行版本控制，您可以恢复到任何先前已知的部署状态。

使用 get pods 子命令再次列出 Pod：

```shell
$ kubectl get pods
```

四个 Pod 正在运行。 要检查部署在这些 Pod 上的映像，请使用describe pods 子命令：

```shell
$ kubectl describe pods
```

部署再次使用应用程序的稳定版本 (v2)。 回滚成功。

请记住清理本地集群

```shell
$ kubectl delete deployments/kubernetes-bootcamp services/kubernetes-bootcamp
```
