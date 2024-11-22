---
layout: post
title: "安装 Express, Nginx 和 Docker Compose"
categories: docker
bgcolor: "#98bec8"
color: "#fff"
---

Compose is a tool for defining and running multi-container Docker applications.

[Install Compose on Linux systems](https://docs.docker.com/compose/install/#install-compose)

Run this command to download the latest version of Docker Compose:

```console
$ sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
```

Apply executable permissions to the binary:

```console
$ sudo chmod +x /usr/local/bin/docker-compose
```

Optionally, install [command completion](https://docs.docker.com/compose/completion/) for the bash and zsh shell.

Test the installation.

`$ docker-compose --version`

docker-compose version 1.21.2, build 1719ceb

### 使用 Nginx, Node.js 和 MongoDB 组合

创建 compose-nginx-nodejs-mongodb.yml

```yaml
version: "3"
services:
web:
  image: nginx:alpine
  volumes:
    - "/home/vagrant/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf"
  ports:
    - "80:80"
app:
  image: nighon/get-started:express
  ports:
    - "3000:3000"
mongodb:
  image: mongo
  volumes:
    - "/home/ubuntu/mongodb:/data/db"
```

创建 VOLUMES 目录

```console
$ mkdir -p /home/vagrant/nginx/conf.d
$ mkdir -p /home/vagrant/mongodb
```

创建 Nginx 反向代理配置文件 /home/vagrant/nginx/conf.d/default.conf

```nginx
server {
    listen 80;
    listen [::]:80 ipv6only=on;
    server_name _;

    location / {
        proxy_pass http://app:3000;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

运行 docker-compose

```console
$ docker-compose -f compose-nginx-nodejs-mongodb.yml up
```

最后，打开浏览器：http://192.168.33.90，你应该能看到 Counter 字样。

## 常用命令

```console
$ docker volume ls
$ docker volume prune
$ docker volume inspect delivery_storage
$ sudo chown 33:33 -R /var/lib/docker/volumes/delivery_storage

$ docker cp .env delivery_fpm_1:/var/www/html/
$ docker exec -u root delivery_fpm_1 chown www-data:www-data .env

$ docker-compose exec fpm php artisan key:generate
$ docker-compose exec fpm php artisan migrate
$ docker-compose exec fpm php artisan cache:clear
$ docker-compose exec fpm php artisan view:clear
$ docker-compose exec fpm php artisan route:cache
```

## 推送到镜像仓库

您需要使用注册表名称和要将其推送到的存储库来标记您的映像。 例如，要将名为 my-image 的映像推送到 Docker Hub 注册表，您可以使用以下命令：

```console
$ docker tag my-image:latest docker.io/my-username/my-image:latest
$ docker push docker.io/my-username/my-image:latest
```

如果您要将映像推送到私有注册表，则需要先通过注册表进行身份验证，然后才能推送映像。 您可以使用 `docker login` 命令来执行此操作。

您可以使用 -a 或 --all-tags 标志将图像的所有标签推送到注册表。

您可以使用 -f 或 --force 标志将映像推送到注册表，即使该映像已经存在。
