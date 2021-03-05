---
layout: post
title:  "Dockerfile 指令说明"
categories: docker
---

### ENTRYPOINT

The ENTRYPOINT specifies a command that will always be executed when the container starts.

default: `/bin/sh -c`

### CMD

The CMD specifies arguments that will be fed to the ENTRYPOINT.

e.g.

    # Dockerfile
    FROM debian:wheezy
    ENTRYPOINT ["/bin/app"]
    CMD ["--help"]

    # Then
    $ docker run -it myimage
    $ docker run -it myimage start

    # Result respectively
    /bin/app --help
    /bin/app start

### ADD & COPY

> COPY is preferred.
> ADD has some features (like local-only tar extraction and remote URL support).
> Consequently, the best use for ADD is local tar file auto-extraction into the image, as in ADD rootfs.tar.xz /.

### EXPOSE

EXPOSE doesn't really expose. It's just a note.

---

### Layers

    ubuntu@vm1:~$ docker history nighon/get-started:part2
    IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
    7c69d898538c        22 hours ago        /bin/sh -c #(nop)  CMD ["python" "app.py"]      0B
    6d7b0c60c118        22 hours ago        /bin/sh -c #(nop)  ENV NAME=World               0B
    369a5c151514        22 hours ago        /bin/sh -c #(nop)  EXPOSE 80                    0B
    89ad6306b229        22 hours ago        /bin/sh -c pip install --trusted-host pypi.p…   11.6MB
    0f31a701dae9        22 hours ago        /bin/sh -c #(nop) ADD dir:ec6a312b5632ce195a…   1.61kB
    08c8d3ff1d66        22 hours ago        /bin/sh -c #(nop) WORKDIR /app                  0B

### Use multi-stage builds

    FROM golang:1.7.3 AS build
    WORKDIR /go/src/github.com/alexellis/href-counter/
    ...

    FROM alpine:latest
    WORKDIR /root/
    COPY --from=build /go/src/github.com/alexellis/href-counter/app .
    CMD ["/bin/app"]

Use an external image as a "stage"

    COPY --from=nginx:latest /etc/nginx/nginx.conf /nginx.conf

---

[Pushing a repository image to Docker Hub](https://docs.docker.com/docker-hub/repos/#pushing-a-repository-image-to-docker-hub)

To push a repository to the Docker Hub, you need to name your local image using your Docker Hub username, and the repository name that you created in the previous step. You can add multiple images to a repository, by adding a specific :<tag> to it (for example docs/base:testing). If it’s not specified, the tag defaults to latest. You can name your local images either when you build it, using

    $ docker build -t <hub-user>/<repo-name>[:<tag>]
    
> by re-tagging an existing local image 
>
> `$ docker tag <existing-image> <hub-user>/<repo-name>[:<tag>]`
>
> or by using
>
> `$ docker commit <exiting-container> <hub-user>/<repo-name>[:<tag>]`
>    
> to commit changes.

Now you can push this repository to the registry designated by its name or tag.

    $ docker push <hub-user>/<repo-name>:<tag>

---

最后，[推送到 Docker Hub](https://docs.docker.com/docker-cloud/builds/push-images/)
