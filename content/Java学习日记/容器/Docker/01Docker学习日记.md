---
title: Docker学习日记(一)
tags:
  - Docker
  - 学习日记
---

# 前言

`Docker`彻底释放了虚拟化的威力, 极大降低了云计算资源供应的成本, 同时让应用的分发, 测试, 部署和分发都变得前所未有的高效和轻松!

# 什么是Docker

Docker是一个开源项目, 诞生于2013年初, 最初是dotCloud公司内部的一个业余项目. 基于Google公司推出的Go语言实现. 项目后来加入了Linux基金会, 遵从了Apache 2.0协议.

Docker项目的目标是实现轻量级的操作系统虚拟化解决方案. Docker的基础是Linux容器(LXC)等基础

在LXC的基础上Docker进行了进一步的封装, 让用户不需要去关心容器的管理, 使得操作更为简便. 用户操作Docker的容器就像操作一个快速轻量级的虚拟机一样简单.

容器是在操作系统层面上实现虚拟化, 直接复用本地主机的操作系统, 而传统方式则是在硬件层面实现.

# 为什么要用Docker

作为一种新兴的虚拟化方式，Docker 跟传统的虚拟化方式相比具有众多的优势。

首先，Docker 容器的启动可以在秒级实现，这相比传统的虚拟机方式要快得多。 其次，Docker 对系统资源的利用率很高，一台主机上可以同时运行数千个 Docker 容器。

容器除了运行其中应用外，基本不消耗额外的系统资源，使得应用的性能很高，同时系统的开销尽量小。传统虚拟机方式运行 10 个不同的应用就要起 10 个虚拟机，而Docker 只需要启动 10 个隔离的应用即可。

具体说来，Docker 在如下几个方面具有较大的优势。

## 更快速的交付和部署

对开发和运维（devop）人员来说，最希望的就是一次创建或配置，可以在任意地方正常运行。

开发者可以使用一个标准的镜像来构建一套开发容器，开发完成之后，运维人员可以直接使用这个容器来部署代码。 Docker 可以快速创建容器，快速迭代应用程序，并让整个过程全程可见，使团队中的其他成员更容易理解应用程序是如何创建和工作的。 Docker 容器很轻很快！容器的启动时间是秒级的，大量地节约开发、测试、部署的时间。

## 更高效的虚拟化

Docker 容器的运行不需要额外的 hypervisor 支持，它是内核级的虚拟化，因此可以实现更高的性能和效率。

## 更轻松的迁移和扩展

Docker 容器几乎可以在任意的平台上运行，包括物理机、虚拟机、公有云、私有云、个人电脑、服务器等。 这种兼容性可以让用户把一个应用程序从一个平台直接迁移到另外一个。

## 更简单的管理

使用Docker，只需要小小的修改，就可以替代以往大量的更新工作。所有的修改都以增量的方式被分发和更新，从而实现自动化并且高效的管理。

## 对比传统虚拟机总结

| 特性       | 容器               | 虚拟机     |
| ---------- | ------------------ | ---------- |
| 启动       | 秒级               | 分钟级     |
| 硬盘使用   | 一般为 MB          | 一般为 GB  |
| 性能       | 接近原生           | 弱于       |
| 系统支持量 | 单机支持上千个容器 | 一般几十个 |

# Docker镜像

Docker镜像就是一个只读的模版

例如: 一个镜像可以包含一个完整的ubuntu操作系统环境, 里面仅安装了Apache或用户需要的其它应用程序

镜像可以用来创建Docker容器

Docker提供了一个很简单的机制来创建镜像或者更新现有的镜像, 用户甚至可以直接从其他人那里下载一个已经做好的镜像来直接使用.

# Docker容器的运用

Docker利用容器来运行应用

容器是从镜像创建的运行实例. 它可以被启动, 开始, 停止, 删除. 每个容器都是相互隔离, 保证安全的平台.

可以把容器看做时一个简易版的Linux环境(包括root用户权限,进程空间,用户空间和网络空间等)和在其中的应用程序

注意:镜像是只读的, 容器在启动的时候创建一层可写层作为最上层

# Docker仓库

仓库是集中存放镜像文件的场所. 有时候会把仓库和仓库注册服务器(Registry)混为一谈, 并不严格区分. 实际上, 仓库注册服务器上往往存放着多个仓库, 每个仓库中又包含了多个镜像, 每个镜像又不同的标签(tag).

仓库分为公开仓库(Public)和私有仓库(Private)两种形式

最大的公开仓库是`Docker Hub`,存放了数量庞大的镜像供用户下载. 国内公开的仓库包括`Docker Pool`等, 可以提供大陆用户更稳定快速的访问.

当然, 用户也可以在本地网络内创建一个私有仓库

当用户创建了自己的镜像之后就可以使用push命令将它上传到共有或者私有仓库, 这样下次在另外一台机器上使用这个镜像时候, 只需要从仓库pull下来就可以了.

`Docker Hub`:https://hub.docker.com/
`Docker Pool`:https://promotion.aliyun.com/ntms/act/kubernetes.html

# Ubuntu系列安装Docker

## 通过Docker源安装最新版本

要安装最新的Docker版本, 首先需要安装`apt-transport-https`支持,然后通过添加源来安装

### 更新APT包索引并安装依赖包

```bash
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
```

### 添加Docker的GPG密钥

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

### 设置Docker的APT源

```bash
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 更新APT包索引

```bash
sudo apt-get update
```

### 安装Docker

```bash
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
```

### 验证Docker安装

```bash
sudo docker --version
```

### 启动Docker服务(如果未自动启动)

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

## 14.04之前版本

如果是较低版本的Ubuntu系统,需要先更新内核

```bash
sudo apt-get update
sudo apt-get install linux-image-generic-lts-raring linux-headers-generic-lts-raring
sudo reboot
```

然后重复上面的步骤即可.
安装之后启动Docker服务

```bash
sudo service docker start
```

# CentOS系列安装Docker

Docker支持CentOS6及以后的版本

## CentOS 6

对于CentOS6, 可以使用`EPEL`库安装Docker,命令如下

```bash
$ sudo yum install http://mirrors.yun-idc.com/epel/6/i386/epel-release-6-8.noarch.rpm
$ sudo yum install docker-io
```

## CentOS 7

CentOS系统CentOS-Extras库中已带Docker, 可以直接安装

```bash
$ sudo yum install docker
```

如果以已经安装了Docker的一个旧版本,比方说(1.13.1),如果想要安装最新版本的Docker

### 卸载旧版本的Docker

```bash
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine
```

### 安装最新版本的Docker

1. 安装必要的依赖包

```bash
sudo yum install -y yum-utils
```

2. 设置Docker的稳定仓库

```bash
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo # 设置阿里云的Docker仓库
```

3. 更新yum包索引

```bash
sudo yum makecache fast
```

4. 安装最新版本的Dokcer

```bash
sudo yum install docker-ce docker-ce-cli containerd.io
```

5. 启动Docker

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

6. 验证Docker安装

```bash
sudo docker --version
```

安装之后启动Docker服务, 并让它随系统启动自动加载

```bash
$ sudo service docker start
$ sudo chkconfig docker on # 较新版本可能过时了
$ sudo systemctl enable docker
```

# Docker如何获取镜像

可以使用`docker pull`命令从仓库获取所需要的镜像

之前那篇用CentOS拉取的,下面的例子将从\*\*Docker Hub`仓库下载一个Ubuntu 12.04`操作系统的镜像

```bash
sudo docker pull ubuntu:latest # 拉取最新的
sudo docker pull ubuntu:12.04 # 拉取特定版本的Ubuntu镜像
```

## 配置Docker使用阿里云镜像加速器

1. 创建或编辑Docker的daemon配置文件

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://<your-mirror-id>.mirror.aliyuncs.com"]
}
EOF
```

2. 重新启动Docker服务

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

3. 验证配置是否生效

```bash
sudo docker info
```

## 创建容器

完成后, 即可随时使用该镜像了,例如创建一个容器,让其中运行bash应用

```bash
sudo docker run -t -i ubuntu:12.04 /bin/bash
root@8ebff2f3d314:/# ls
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  selinux  srv  sys  tmp  usr  var
```

# Docker 列出镜像

```bash
root@iZbp1agwyngc5ksvd2psjdZ:/# sudo docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
ubuntu       12.04     5b117edd0b76   7 years ago   104MB
```

在列出的信息中, 可以看到几个字段信息

- 来自哪个仓库, 比如ubuntu
- 镜像的标记, 比如12.04
- 它的ID号(唯一)
- 创建时间
- 镜像大小

其中镜像的ID唯一标识了镜像, 注意到`ubuntu:12.04`和`ubuntu:trusty`具有相同的镜像ID,说明它们实际上是同一镜像.

`TAG`信息用来标记来自同一个仓库的不同镜像. 例如ubuntu仓库中有多个镜像, 通过`TAG`信息来区分发行版本, 例如10.04,12.04,12.10,13.04,14.04等. 例如下面的命令指定使用镜像ubuntu:14.04来启动一个容器

```bash
sudo docker run -t -i ubuntu:12.04 /bin/bash
```

**如果不指定具体的标记,则默认使用latest标记信息**

# Docker 创建镜像

创建镜像有很多方法, 用户可以从`Docker Hub`获取已有镜像并更新, 也可以利用本地文件系统创建一个

## 修改已有镜像

1. 运行ubuntu镜像

```bash
$ sudo docker run -t -i ubuntu:latest /bin/bash
```

2. 在容器中安装curl和vim两个应用

```bash
root@<container_id>:/# apt-get update
root@<container_id>:/# apt-get install -y curl vim
```

3. 退出容器

```bash
root@<container_id>:/# exit
```

4. 使用`docker commit`命令来提交更新后的副本

```bash
sudo docker commit -m "Added curl and vim" -a "Docker Newbee" <container_id> ouruser/ubuntu:v1
```

其中，-m来指定提交的说明信息，-a可以指定更新的用户信息，<container_id>是用来创建镜像的容器的ID，最后指定目标镜像的仓库名和tag信息。创建成功后会返回这个镜像的ID信息。5. 使用`docker images`来查看新创建的镜像

```bash
sudo docker images
```

6. 输出示例

```bash
REPOSITORY          TAG     IMAGE ID       CREATED       SIZE
ouruser/ubuntu      v1      <image_id>     <time>        <size>
```

7. 使用新的镜像来启动容器

```bash
sudo docker run -t -i ouruser/ubuntu:v1 /bin/bash
```

## 利用 Dockerfile 来创建镜像

使用`docker commit`来扩展一个镜像比较简单, 但是不方便在一个团队中分享. 我们可以使用`docker build`来创建一个新的镜像. 为此, 首先需要创建一个Dockerfile,包含一些如何创建镜像的指令

新建一个目录和一个Dockerfile

```bash
$ mkdir mydockerbuild
$ cd mydockerbuild
$ touch Dockerfile
```

### Dockerfile示例

Dockerfile 中每一条指令都创建镜像的一层，例如：

```bash
# This is a comment
FROM ubuntu:latest
MAINTAINER Docker Newbee <newbee@docker.com>
RUN apt-get -qq update
RUN apt-get -qqy install curl vim
```

Dockerfile 基本的语法是

- 使用 # 来注释
- FROM 指令告诉 Docker 使用哪个镜像作为基础
- 接着是维护者的信息
- RUN开头的指令会在创建中运行，比如安装一个软件包，在这里使用 apt-get 来安装了一些软件

**编写完成 Dockerfile 后可以使用 docker build 来生成镜像。**

#### 构建Docker镜像

```bash
sudo docker build -t="ouruser/ubuntu:v1" .
```

#### 构建过程示例输出

```bash
Uploading context  2.56 kB
Uploading context
Step 0 : FROM ubuntu:latest
 ---> 99ec81b80c55
Step 1 : MAINTAINER Newbee <newbee@docker.com>
 ---> Running in 7c5664a8a0c1
 ---> 2fa8ca4e2a13
Removing intermediate container 7c5664a8a0c1
Step 2 : RUN apt-get -qq update
 ---> Running in b07cc3fb4256
 ---> 50d21070ec0c
Removing intermediate container b07cc3fb4256
Step 3 : RUN apt-get -qqy install curl vim
 ---> Running in a5b038dd127e
Selecting previously unselected package curl.
(Reading database ... 11518 files and directories currently installed.)
Preparing to unpack .../curl_7.68.0-1ubuntu2.6_amd64.deb ...
Setting up curl (7.68.0-1ubuntu2.6) ...
Setting up vim (2:8.1.2269-1ubuntu5.4) ...
Processing triggers for libc-bin (2.31-0ubuntu9.9) ...
 ---> 2acb20f17878
Removing intermediate container a5b038dd127e
Successfully built 324104cde6ad
```

#### 使用新的镜像来启动容器

```bash
sudo docker run -t -i ouruser/ubuntu:v1 /bin/bash
```

#### 使用docker tag命令来修改镜像的标签

```bash
sudo docker tag 324104cde6ad ouruser/ubuntu:devel
sudo docker images ouruser/ubuntu
```

## 从本地文件系统导入

要从本地文件系统导入一个镜像, 可以使用openvz(容器虚拟化的先锋技术)的模版来创建:openvz的模版下载地址为templates

比如,先下载了一个ubuntu-12.04的镜像,之后使用以下命令导入

```bash
sudo cat ubuntu-12.04-x86_64-minimal.tar.gz  |docker import - ubuntu:12.04
```

然后查看新导入的镜像

```bash
docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
ubuntu              14.04               05ac7c0b9383        17 seconds ago      215.5 MB
```

## 上传镜像

用户可以通过docker push命令,把自己创建的镜像上传到仓库中来共享. 例如, 用户在Docker Hub上完成注册后, 可以推送自己的镜像到仓库中

```bash
$ sudo docker push ouruser/sinatra
The push refers to a repository [ouruser/sinatra] (len: 1)
Sending image list
Pushing repository ouruser/sinatra (3 tags)
```

# 存出和载入Docker镜像

## 存出镜像

如果要导出镜像到本地文件, 可以使用`docker save`命令

```bash
$ sudo docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
ubuntu              14.04               c4ff7513909d        5 weeks ago         225.4 MB
...
$sudo docker save -o ubuntu_14.04.tar ubuntu:14.04
```

## 载入镜像

可以使用`docker load`从导出的本地文件中再导入到本地镜像库,例如

```bash
$ sudo docker load --input ubuntu_14.04.tar
```

或者

```bash
$ sudo docker load < ubuntu_14.04.tar
```

这将导入镜像以及其相关的元数据信息（包括标签等）。

# Docker 移除镜像

如果要移除本地的镜像, 可以使用`docker rmi`命令. 注意`docker rm`命令是移除容器

```bash
$ sudo docker rmi training/sinatra
Untagged: training/sinatra:latest
Deleted: 5bc342fa0b91cabf65246837015197eecfa24b2213ed6a51a8974ae250fedd8d
Deleted: ed0fffdcdae5eb2c3a55549857a8be7fc8bc4241fb19ad714364cbfd7a56b22f
Deleted: 5c58979d73ae448df5af1d8142436d81116187a7633082650549c52c3a2418f0
```

注意: 在删除镜像之前要先用`docker rm`删掉依赖于这个镜像的所有容器

# Docker 镜像的实现原理

Docker镜像是怎么实现增量的修改和维护的?每个镜像都由很多层次构成,Docker使用`Union FS`将这些不同的层结合到一个镜像中去

通常Union FS由两个用途, 一方面可以实现不借助LVM,RAID将多个disk挂到同一个目录下,另一个更常用的就是将一个只读的分支和一个可写的分支联合在一起,Live CD正是基于此方法可以允许在镜像不变的基础上允许用户在其上进行一些写操作. Docker 在AUFS上构建的容器也是利用了类似的原理..

`Union FS`:https://en.wikipedia.org/wiki/UnionFS

# 进入Docker容器

在使用`-d`参数时, 容器启动后会进入后台, 某些时候需要进入容器进行操作, 有很多种方法, 包括使用`docker attach`命令或`nsenter`工具等

## attach命令

`docker attach`是Docker自带的命令. 下面的示例如何使用该命令

```bash
root@iZbp1agwyngc5ksvd2psjdZ:~# sudo docker run -idt ubuntu
7f1915060d0ac3a5d9d3ec3d31a0a6c82ef0acd4031bfb592b81220db29599f6
root@iZbp1agwyngc5ksvd2psjdZ:~# sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED              STATUS              PORTS     NAMES
7f1915060d0a   ubuntu    "bash"    7 seconds ago        Up 6 seconds                  vigilant_moser
ab910245aa2d   ubuntu    "bash"    About a minute ago   Up About a minute             reverent_panini
root@iZbp1agwyngc5ksvd2psjdZ:~# sudo docker attach reverent_panini
root@ab910245aa2d:/#
```

但是使用 attach 命令有时候并不方便。当多个窗口同时 attach 到同一个容器的时候，所有窗口都会同步显示。当某个窗口因命令阻塞时,其他窗口也无法执行操作了。

## nsenter命令

### 安装

nsenter工具在util-linux包2.23版本后包含. 如果系统中util-linux包没有该命令, 可以按照下面的方法从源码安装

1. 首先, 检查系统是否已经安装了nsenter

```bash
which nsenter
```

如果已经安装,会看到nsenter的路径2. 如果没有安装,可以使用包管理器来安装
对于Ubuntu或Debian系统

```bash
sudo apt update
sudo apt install util-linux
```

对于CentOS或RHEL系统

```bash
sudo yum install util-linux
```

3. 安装完成后,再次检查nsenter是否可用

```bash
which nsenter
```

4. 如果以上方法都不行, 可以尝试从最新的源代码编译

```bash
cd /tmp
git clone https://github.com/util-linux/util-linux.git
cd util-linux
./autogen.sh
./configure --without-ncurses
make nsenter
sudo cp nsenter /usr/local/bin
```

5. 安装完成之后,验证nsenter是否可用

```bash
nsenter --version
```

### 使用

1. 进入容器的所有命名空间

```bash
PID=$(docker inspect --format {{.State.Pid}} <container_name_or_id>)
sudo nsenter --target $PID --mount --uts --ipc --net --pid
```

这个命令会让你进入容器的所有命名空间,就像你在容器内部一样2. 只进入容器的网络命名空间

```bash
PID=$(docker inspect --format {{.State.Pid}} <container_name_or_id>)
sudo nsenter --target $PID --net
```

3. 在容器内执行特定命令

```bash
PID=$(docker inspect --format {{.State.Pid}} <container_name_or_id>)
sudo nsenter --target $PID --mount --uts --ipc --net --pid -- <command>
```

例如, 要在容器内运行ls命令

```bash
sudo nsenter --target $PID --mount --uts --ipc --net --pid -- ls /
```

4. 查看容器的网络配置

```bash
PID=$(docker inspect --format {{.State.Pid}} <container_name_or_id>)
sudo nsenter --target $PID --net -- ip addr
```

5. 在容器内启动一个新的shell

```bash
PID=$(docker inspect --format {{.State.Pid}} <container_name_or_id>)
sudo nsenter --target $PID --mount --uts --ipc --net --pid -- /bin/bash
```

6. 查看容器的进程列表

```bash
PID=$(docker inspect --format {{.State.Pid}} <container_name_or_id>)
sudo nsenter --target $PID --mount --uts --ipc --net --pid -- ps aux
```

使用 nsenter 的注意事项：

- 需要 root 权限（或 sudo）来使用 nsenter。
- 使用 nsenter 进入容器可能会绕过 Docker 的一些安全限制，所以要谨慎使用。
- 在使用 nsenter 时，要确保你知道你在做什么，因为你可能会影响到容器的运行状态。
  nsenter 是一个强大的工具，特别是在需要调试容器或者在不通过 Docker 命令直接访问容器内部时非常有用。但是，在大多数日常操作中，使用 docker exec 可能更安全和方便。

## docker exec命令

### 基本语法

```bash
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```

### 常用选项

- -i:保持STDIN开放
- -t:分配一个伪TTY
- -u:指定用户
- -w:指定工作目录

### 常见用法

1. 在容器中启动一个交互式 shell

```bash
docker exec -it <container_name_or_id> /bin/bash
```

或者对于使用 sh 的容器

```bash
docker exec -it <container_name_or_id> /bin/sh
```

2. 在容器中执行单个命令

```bash
docker exec <container_name_or_id> ls /app
```

3. 以特定用户身份执行命令

```bash
docker exec -u root <container_name_or_id> whoami
```

4. 在特定工作目录中执行命令

```bash
docker exec -w /app <container_name_or_id> pwd
```

5. 查看容器中的环境变量

```bash
docker exec <container_name_or_id> env
```

6. 在容器中安装软件包（以 Ubuntu 容器为例）

```bash
docker exec <container_name_or_id> apt-get update && apt-get install -y vim
```

7. 查看容器中的进程

```bash
docker exec <container_name_or_id> ps aux
```

8. 查看容器的网络配置

```bash
docker exec <container_name_or_id> ifconfig
```

9. 在容器中创建文件

```bash
docker exec <container_name_or_id> touch /tmp/newfile
```

10. 查看容器中的日志文件

```bash
docker exec <container_name_or_id> tail -f /var/log/app.log
```

注意事项

- docker exec 只能在运行中的容器上使用。
- 执行的命令会在容器的当前状态下运行，不会启动新的容器。
- 如果你需要在多个命令之间保持状态，最好使用交互式 shell。
- 使用 docker exec 执行的命令不会影响容器的主进程或改变容器的启动命令。
  docker exec 是一个非常强大的工具，可以帮助你调试、管理和操作运行中的容器。它提供了一种方便的方式来与容器交互，而不需要修改容器的基本配置或重启容器。

# 导出和导入Docker容器

## 导出容器

```bash
root@iZbp1agwyngc5ksvd2psjdZ:/# sudo docker ps -a
CONTAINER ID   IMAGE               COMMAND       CREATED          STATUS                      PORTS     NAMES
7f1915060d0a   ubuntu              "bash"        46 minutes ago   Up 46 minutes                         vigilant_moser
ab910245aa2d   ubuntu              "bash"        47 minutes ago   Exited (0) 41 minutes ago             reverent_panini
06dad32efad8   ouruser/ubuntu:v1   "/bin/bash"   14 hours ago     Exited (0) 14 hours ago               optimistic_grothendieck
5ade407cb4a1   ouruser/ubuntu:v1   "/bin/bash"   15 hours ago     Exited (129) 13 hours ago             focused_ellis
687a0f0f6309   ubuntu:latest       "/bin/bash"   16 hours ago     Exited (0) 16 hours ago               elastic_newton
3aa1cbf21a76   ubuntu:latest       "/bin/bash"   16 hours ago     Exited (0) 16 hours ago               nostalgic_agnesi
8ebff2f3d314   5b117edd0b76        "/bin/bash"   16 hours ago     Exited (127) 16 hours ago             interesting_lamport
root@iZbp1agwyngc5ksvd2psjdZ:/# sudo docker export 7f1915060d0a > ubuntu.tar
```

## 导入容器快照

可以使用docker import从容器快照文件中再导入为镜像,例如

```bash
root@iZbp1agwyngc5ksvd2psjdZ:/# cat ubuntu.tar | sudo docker import - test/ubuntu:v1.0
sha256:85c7c1d70759057b709bae1b5731208ce29af1fc5fc302b317c35d9263548921
root@iZbp1agwyngc5ksvd2psjdZ:/# sudo docker images
REPOSITORY       TAG       IMAGE ID       CREATED         SIZE
test/ubuntu      v1.0      85c7c1d70759   9 seconds ago   127MB
```

此外,也可以通过指定URL或者某个目录来导入,例如

```bash
sudo docker import https://example-docker-images.com/ubuntu-20.04.tar.gz my-ubuntu:20.04
```

(这个URL是虚构的,需要替换成实际存在的URL)

\*注：用户既可以使用 docker load 来导入镜像存储文件到本地镜像库，也可以使用 docker import 来导入一个容器快照到本地镜像库。这两者的区别在于容器快照文件将丢弃所有的历史记录和元数据信息（即仅保存容器当时的快照状态），而镜像存储文件将保存完整记录，体积也要大。此外，从容器快照文件导入时可以重新指定标签等元数据信息。

# Docker删除容器

可以使用docker rm来删除一个处于终止状态的容器

```bash
root@iZbp1agwyngc5ksvd2psjdZ:/# docker ps -a
CONTAINER ID   IMAGE               COMMAND       CREATED             STATUS                      PORTS     NAMES
7f1915060d0a   ubuntu              "bash"        59 minutes ago      Up 59 minutes                         vigilant_moser
ab910245aa2d   ubuntu              "bash"        About an hour ago   Exited (0) 54 minutes ago             reverent_panini
06dad32efad8   ouruser/ubuntu:v1   "/bin/bash"   14 hours ago        Exited (0) 14 hours ago               optimistic_grothendieck
5ade407cb4a1   ouruser/ubuntu:v1   "/bin/bash"   16 hours ago        Exited (129) 14 hours ago             focused_ellis
687a0f0f6309   ubuntu:latest       "/bin/bash"   16 hours ago        Exited (0) 16 hours ago               elastic_newton
3aa1cbf21a76   ubuntu:latest       "/bin/bash"   16 hours ago        Exited (0) 16 hours ago               nostalgic_agnesi
8ebff2f3d314   5b117edd0b76        "/bin/bash"   17 hours ago        Exited (127) 17 hours ago             interesting_lamport
root@iZbp1agwyngc5ksvd2psjdZ:/# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED          STATUS          PORTS     NAMES
7f1915060d0a   ubuntu    "bash"    59 minutes ago   Up 59 minutes             vigilant_moser
root@iZbp1agwyngc5ksvd2psjdZ:/# docker rm 5ade407cb4a1
5ade407cb4a1
root@iZbp1agwyngc5ksvd2psjdZ:/# docker ps -a
CONTAINER ID   IMAGE               COMMAND       CREATED             STATUS                      PORTS     NAMES
7f1915060d0a   ubuntu              "bash"        About an hour ago   Up About an hour                      vigilant_moser
ab910245aa2d   ubuntu              "bash"        About an hour ago   Exited (0) 55 minutes ago             reverent_panini
06dad32efad8   ouruser/ubuntu:v1   "/bin/bash"   14 hours ago        Exited (0) 14 hours ago               optimistic_grothendieck
687a0f0f6309   ubuntu:latest       "/bin/bash"   16 hours ago        Exited (0) 16 hours ago               elastic_newton
3aa1cbf21a76   ubuntu:latest       "/bin/bash"   16 hours ago        Exited (0) 16 hours ago               nostalgic_agnesi
8ebff2f3d314   5b117edd0b76        "/bin/bash"   17 hours ago        Exited (127) 17 hours ago             interesting_lamport
root@iZbp1agwyngc5ksvd2psjdZ:/#
```

如果要删除一个运行中的容器,可以添加`-f`参数. Docker会发送SIGKILL信号给容器

# 启动Docker容器

启动容器有两种方式, 一种是基于镜像新建一个容器并启动, 另外一个是将在终止状态(stopped)的容器重新启动

因为Docker的容器是在太轻量级了, 很多时候用户都是随时删除和新创建容器

## 新建并启动

所需要的命令主要为`docker run`

例如，下面的命令输出一个 “Hello World”，之后终止容器。

```bash
$ sudo docker run ubuntu:14.04 /bin/echo 'Hello world'
Hello world
```

这跟在本地直接执行 /bin/echo 'hello world' 几乎感觉不出任何区别。

下面的命令则启动一个 bash 终端，允许用户进行交互。

```bash
$ sudo docker run -t -i ubuntu:14.04 /bin/bash
root@af8bae53bdd3:/#
```

其中，-t 选项让Docker分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上， -i 则让容器的标准输入保持打开。

在交互模式下，用户可以通过所创建的终端来输入命令，例如

```bash
root@af8bae53bdd3:/# pwd
/
root@af8bae53bdd3:/# ls
bin boot dev etc home lib lib64 media mnt opt proc root run sbin srv sys tmp usr var
```

当利用docker run 来创建容器时，Docker 在后台运行的标准操作包括：

- 检查本地是否存在指定的镜像，不存在就从公有仓库下载
- 利用镜像创建并启动一个容器
- 分配一个文件系统，并在只读的镜像层外面挂载一层可读写层
- 从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去
- 从地址池配置一个 ip 地址给容器
- 执行用户指定的应用程序
- 执行完毕后容器被终止

## 启动已终止容器

可以利用`docker start, 直接将一个已经终止的容器启动运行.

容器的核心为所执行的应用程序,所需要的资源都是应用程序运行所必须的. 除此之外, 并没有其他的资源. 可以在伪终端中利用ps或top来查看进程信息

```bash
root@iZbp1agwyngc5ksvd2psjdZ:~# ps
    PID TTY          TIME CMD
  54025 pts/2    00:00:00 bash
  54037 pts/2    00:00:00 ps
```

可见, 容器中仅运行了指定的bash应用. 这种特点使得Docker对资源的利用率极高, 是货真价实的轻量级虚拟化.

# 守护态运行Docker容器

更多的时候, 需要让Docker容器在后台以守护态(Daemonized)形式运行. 此时,可以通过添加`-d`参数来实现

例如下面的命令会在后台运行容器

```bash
$ sudo docker run -d ubuntu:14.04 /bin/sh -c "while true; do echo hello world; sleep 1; done"
1e5535038e285177d5214659a068137486f96ee5c2e85a4ac52dc83f2ebe4147
```

容器启动会返回一个唯一的id,也可以通过docker ps命令来查看容器信息

```bash
$ sudo docker ps
CONTAINER ID  IMAGE         COMMAND               CREATED        STATUS       PORTS NAMES
1e5535038e28  ubuntu:14.04  /bin/sh -c 'while tr  2 minutes ago  Up 1 minute        insane_babbage
```

要获取容器的输出信息,可以通过docker logs命令

```bash
$ sudo docker logs insane_babbage
hello world
hello world
hello world
. . .
```

# 终止Docker容器

可以使用`docker stop`来终止一个运行中的容器

此外, 当Docker容器中指定的应用终结时, 容器也自动终止. 例如上一章中只启动了一个终端的容器, 用户通过exit命令或Ctrl+d来退出终端时,所创建的容器立刻终止.

处于终止状态的容器,可以通过`docker start`命令来重新启动

# Docker Hub

## 登录

可以通过执行`docker login`命令来输入用户名,密码和邮箱来完成注册和登录. 注册成功后, 本地用户目录的`.dockercfg`中将保存用户的认证信息

## 基本操作

用户无需登录即可通过`docker search`命令来查找官方仓库中的镜像, 并利用`docker pull`命令将它下载到本地

例如以centos为关键词进行搜索

```bash
$ sudo docker search centos
NAME                                            DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
centos                                          The official build of CentOS.                   465       [OK]
tianon/centos                                   CentOS 5 and 6, created using rinse instea...   28
blalor/centos                                   Bare-bones base CentOS 6.5 image                6                    [OK]
saltstack/centos-6-minimal                                                                      6                    [OK]
tutum/centos-6.4                                DEPRECATED. Use tutum/centos:6.4 instead. ...   5                    [OK]
...
```

可以看到返回了很多包含关键字的镜像，其中包括镜像名字、描述、星级（表示该镜像的受欢迎程度）、是否官方创建、是否自动创建。 官方的镜像说明是官方项目组创建和维护的，automated 资源允许用户验证镜像的来源和内容。

根据是否是官方提供，可将镜像资源分为两类。 一种是类似 centos 这样的基础镜像，被称为基础或根镜像。这些基础镜像是由 Docker 公司创建、验证、支持、提供。这样的镜像往往使用单个单词作为名字。 还有一种类型，比如 tianon/centos 镜像，它是由 Docker 的用户创建并维护的，往往带有用户名称前缀。可以通过前缀 user_name/ 来指定使用某个用户提供的镜像，比如 tianon 用户。

另外，在查找的时候通过 -s N 参数可以指定仅显示评价为 N 星以上的镜像。

下载官方 centos 镜像到本地。

```bash
$ sudo docker pull centos
Pulling repository centos
0b443ba03958: Download complete
539c0211cd76: Download complete
511136ea3c5a: Download complete
7064731afe90: Download complete
```

用户也可以在登录后通过 docker push 命令来将镜像推送到 Docker Hub。

## 自动创建

自动创建（Automated Builds）功能对于需要经常升级镜像内程序来说，十分方便。 有时候，用户创建了镜像，安装了某个软件，如果软件发布新版本则需要手动更新镜像。。

而自动创建允许用户通过 Docker Hub 指定跟踪一个目标网站（目前支持 GitHub 或 BitBucket）上的项目，一旦项目发生新的提交，则自动执行创建。

要配置自动创建，包括如下的步骤：

- 创建并登录 Docker Hub，以及目标网站；
- 在目标网站中连接帐户到 Docker Hub；
- 在 Docker Hub 中 配置一个自动创建；
- 选取一个目标网站中的项目（需要含 Dockerfile）和分支；
- 指定 Dockerfile 的位置，并提交创建。

之后，可以 在Docker Hub 的 自动创建页面 中跟踪每次创建的状态。

# Docker的私有仓库

## 使用 Docker Registry 2.0

Docker Registry 2.0 是目前推荐使用的版本。以下是设置和使用的步骤：

1. 拉取官方的 Registry 镜像：

```bash
docker pull registry:2
```

2. 运行 Registry 容器：

```bash
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```

这个命令会启动一个 Registry 容器，将主机的 5000 端口映射到容器的 5000 端口。

3. 配置 Docker 允许使用不安全的仓库（如果你没有配置 HTTPS）：
配置 Docker 允许使用不安全的仓库（如果你没有配置 HTTPS）：

```bash
{
  "insecure-registries" : ["myregistrydomain.com:5000"]
}
```

将 myregistrydomain.com 替换为你的 Registry 主机名或 IP 地址。

重启 Docker 服务：

```bash
sudo systemctl restart docker
```

4. 标记一个镜像，准备推送到私有仓库：

```bash
docker tag ubuntu:latest localhost:5000/my-ubuntu
```

5. 推送镜像到私有仓库：

```bash
docker push localhost:5000/my-ubuntu
```

6. 从私有仓库拉取镜像：

```bash
docker pull localhost:5000/my-ubuntu
```

## 使用 Docker Compose 部署 Registry

可以使用 Docker Compose 来部署 Registry，这样可以更方便地管理配置：

1. 创建一个 docker-compose.yml 文件：

```bash
version: '3'

services:
  registry:
    image: registry:2
    ports:
      - "5000:5000"
    volumes:
      - ./registry-data:/var/lib/registry
    restart: always
```

2. 启动 Registry：

```bash
docker-compose up -d
```

## 安全性考虑

在生产环境中，你应该考虑以下安全措施：

1. 使用 HTTPS
2. 实现访问控制
3. 配置存储后端（如 S3、Azure Blob Storage 等）

## 查看仓库中的镜像

Registry v2 不再提供搜索功能，但你可以使用 API 来列出仓库中的镜像：

```bash
curl -X GET http://localhost:5000/v2/_catalog
```

要列出特定镜像的标签：

```bash
curl -X GET http://localhost:5000/v2/<name>/tags/list
```

注意事项

- 确保你的防火墙允许访问 Registry 端口（默认是 5000）。
- 在生产环境中，强烈建议使用 HTTPS 和访问控制。
- 定期备份 Registry 数据。

# Docker配置文件

Docker的Registry利用配置文件提供了一些仓库的模版(flavor),用户可以直接使用它们来进行开发或生产部署

## 模版

在config_sample.xml文件中,可以看到一些现成的模版段:
- common：基础配置
- local：存储数据到本地文件系统
- s3：存储数据到 AWS S3 中
- dev：使用 local 模板的基本配置
- test：单元测试使用
- prod：生产环境配置（基本上跟s3配置类似）
- gcs：存储数据到 Google 的云存储
- swift：存储数据到 OpenStack Swift 服务
- glance：存储数据到 OpenStack Glance 服务，本地文件系统为后备
- glance-swift：存储数据到 OpenStack Glance 服务，Swift 为后备
- elliptics：存储数据到 Elliptics key/value 存储

用户也可以添加自定义的模版段

默认情况下使用的模版是dev, 要使用某个模版作为默认值,可以添加SETTINGS_FLAVOR到环境变量中,例如
```bash
export SETTINGS_FLAVOR=dev
```
另外,配置文件中支持从环境变量中加载值,语法格式为_env:VARIABLENAME\[:DEFAULT\]

## 示例配置

```bash
common:
    loglevel: info
    search_backend: "_env:SEARCH_BACKEND:"
    sqlalchemy_index_database:
        "_env:SQLALCHEMY_INDEX_DATABASE:sqlite:////tmp/docker-registry.db"

prod:
    loglevel: warn
    storage: s3
    s3_access_key: _env:AWS_S3_ACCESS_KEY
    s3_secret_key: _env:AWS_S3_SECRET_KEY
    s3_bucket: _env:AWS_S3_BUCKET
    boto_bucket: _env:AWS_S3_BUCKET
    storage_path: /srv/docker
    smtp_host: localhost
    from_addr: docker@myself.com
    to_addr: my@myself.com

dev:
    loglevel: debug
    storage: local
    storage_path: /home/myself/docker

test:
    storage: local
    storage_path: /tmp/tmpdockertmp

```

# Docker数据卷

