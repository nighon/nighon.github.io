---
title: Docker Swarm（集群）
categories: docker
header:
  overlay_image: https://farm5.staticflickr.com/4140/4939863887_84705982fd_b.jpg
---
### 安装 Docker

[Install Docker on Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository)

### 创建镜像

把当前用户添加到 docker 用户组

    $ sudo usermod -aG docker ${USER}

[Create a Dockerfile](https://docs.docker.com/get-started/part2/#define-a-container-with-dockerfile)

### Build the app

    $ docker build -t friendlyhello .
    $ docker image ls

### Share your image

Log in with your Docker ID

    $ docker login

Tag the image: `docker tag image username/repository:tag`

    $ docker tag friendlyhello john/get-started:part2
    $ docker image ls

Publish the image

    $ docker push john/get-started:part2

### Deploy to Swarm Cluster

In a distributed application, different pieces of the app are called "services".

A stack is a group of interrelated services that share dependencies, and can be orchestrated and scaled together. A single stack is capable of defining and coordinating the functionality of an entire application (though very complex applications may want to use multiple stacks).

Create [docker-compose.yml](https://docs.docker.com/get-started/part3/#your-first-docker-composeyml-file)

Create a ./data directory on the manager:

    $ docker-machine ssh myvm1 "mkdir ./data"

### Run your new load-balanced app

Before we can use the docker stack deploy command we first run:

创建 Machine

    $ docker-machine create \
        --driver generic \
        --generic-ip-address=10.250.113.1 \
        --generic-ssh-port "22" \
        --generic-ssh-user ubuntu \
        --generic-ssh-key ~/.ssh/id_rsa \
        myvm1

    $ docker-machine ls

删除 Machine

    $ docker-machine rm myvm1

---

初始化 Swarm 并添加节点

    $ docker-machine ssh myvm1 "docker swarm init --advertise-addr <myvm1 ip>"
    $ docker-machine ssh myvm2 "docker swarm join --token <token> <ip>:2377"
    $ docker-machine ssh myvm1 "docker node ls"

关闭 Swarm

    $ docker swarm leave --force

---

在 Swarm Manager 上部署 Stack

    $ eval $(docker-machine env myvm1)

> `$ docker-machine scp docker-compose.yml vm1:~`  
> `$ docker-machine ssh vm1 "docker stack deploy -c docker-compose.yml getstartedlab"`

    $ docker stack deploy -c docker-compose.yml getstartedlab
    $ docker stack ls
    $ docker stack ps getstartedlab

删除 Stack

    $ docker stack rm getstartedlab
    $ docker service ls
    $ docker service ps getstartedlab_web

---

列出 join-token

    $ docker swarm join-token manager
    $ docker swarm join-token worker
