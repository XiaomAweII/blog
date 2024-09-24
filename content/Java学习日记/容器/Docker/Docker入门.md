---
title: Docker
---

# 了解Docker

## 什么是Docker

docker官网: https://www.docker.com/

- Docker是一种容器化技术, 目前市面上流行的容器化技术有两种:Docker和Kubernetes(K8S)
- Docker是一个开源的应用容器引擎,基于Go语言并遵从Apache2.0协议开源
- Docker诞生于2013年, dotCloud公司出品(后改名为Docker Inc)
- Docker可以让开发者打包他们的应用以及依赖包及环境到一个轻量级,可抑制的容器中, 然后发布到任何流行的Linux机器上,也可以实现虚拟化
- Docker容器是完全使用沙箱机制,相互之间不会有任何接口,容器性能开销极低
- Docker从17.03版本之后分为CE(Community Edition:社区版)和EE(Enterprise Editon:企业版)

## Docker的应用场景

- Web应用的自动化和发布. `docker+jenkins+git+maven+gitee`实现项目自动化集成部署
- 自动化测试和持续集成, 发布
- 在服务型环境中部署和调整数据库或其他的后台应用
- 从头编译或者扩展现有的OpenShift或Cloud Foundry平台来搭建自己的Pass环境

## Docker的优点

- 快速,一致性地交付应用程序
- 响应式部署和扩展
- 在同一硬件上运行更多工作负载

# Docker架构的初识

## 镜像

Docker 镜像（Image），就相当于是一个 root 文件系统，也可以理解是一
个安装软件包（.exe）（Linux系统+安装的软件）。比如官方镜像
ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件
系统，Tomcat、mysql等也有相关的景象

## 容器

就好比安装好的软件（Linux系统+安装的软件），镜像（Image）和容器
（Container）的关系，就像是面向对象程序设计中的类(镜像)和实例(容器)
一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、
停止、删除、暂停等。就好比通过镜像安装的系统，或者通过安装软件安装的软
件的系统环境和软件

## 仓库

仓库可看成一个代码控制中心，用来保存镜像。其本质就是一个镜像仓库

## 镜像和容器的关系

- Docker 容器通过 Docker 镜像来创建
- 容器与镜像的关系类似于面向对象编程中的对象与类

## Docker架构

![20240921103625](https://xiaoweii.oss-cn-beijing.aliyuncs.com/img/20240921103625.png)

# centos7 安装docker

## 安装必要的工具

```bash
# yum 包更新到最新
yum update
# 安装需要的软件包， yum-utils 提供yum-config-manager功能，另外
两个是devicemapper驱动依赖的
yum -y install yum-utils device-mapper-persistent-data.x86_64
```

## 添加软件源信息

云服务器不用设置，VMware虚拟机需要做。

```bash
# 设置yum源
yum-config-manager --add-repo
http://mirrors.aliyun.com/docker-ce/linux/centos/docker-
ce.repo
```

## 安装docker

```bash
# 设置yum缓存
yum makecache fast
# 安装docker，出现输入的界面都按 y
yum -y install docker-ce # Vmware中的安装方式
#yum -y install docker #云服务安装方式
```

## 启动Docker服务

```bash
# 启动docker
systemctl start docker
# 查看docker版本，验证是否验证成功
docker -v
```

## 配置阿里云镜像仓库

![20240921104710](https://xiaoweii.oss-cn-beijing.aliyuncs.com/img/20240921104710.png)

![20240921104742](https://xiaoweii.oss-cn-beijing.aliyuncs.com/img/20240921104742.png)

![20240921104827](https://xiaoweii.oss-cn-beijing.aliyuncs.com/img/20240921104827.png)

没有的话,按照步骤先创建一个

## 腾讯云参考文档

https://cloud.tencent.com/document/product/1207/45596

## 配置加速器镜像地址

```bash
sudo tee /etc/docker/daemon.json <<-'EOF'
{
"registry-mirrors":
["你的连接塞进来"]
}
EOF
```

## 重启Docker

```bash
systemctl daemon-reload
systemctl restart docker
docker -v #查看docker版本
```

## Docker的相关命令

### 查看当前本地有哪些镜像

```bash
docker images
docker images -q # 查看所有镜像的id
```

- REPOSITORY 镜像名称
- tag 镜像版本,latest表示最新版本
- image id 镜像的id
- created 创建的时间
- size 镜像大小

### 搜索镜像

```bash
docker search tomcat # 到docker仓库中搜索对应名称的镜像
```

- name: 镜像名称
- description: 镜像描述
- stars: 镜像点赞数
- offical: 是否是官方
- automated: 是否维护

### 下载镜像

```bash
docker pull 镜像名称
docker pull tomcat #默认下载tomcat最新的镜像
docker pull tomcat:7.0.56 #下载7.0.56版的tomcat镜像
docker push #将镜像上传到镜像仓库
```

### 删除镜像

```bash
docker rmi 镜像名称/镜像ID
docker rmi docker images -q # 删除所有本地镜像, 注意上撇号
```

注意:如果镜像生成的有容器, 需要先停止容器删除容器才能删除镜像

### 运行安装镜像

运行安装镜像,就会产生一个容器,所有的操作数据都会存储在容器中

```bash
docker run hello-world #运行镜像,产生容器,如果本地没有镜像,会自动下载
```

当然也可以先下载镜像,再通过镜像运行容器

```bash
docker pull hello-world
docker run hello-world
```

镜像运行执行会产生一个容器,默认安装好的容器是不会运行的

```bash
docker ps -a #查看所有容器
```

### Docker数据卷
**问题**
- Docker容器删除后,在容器中产生的数据也会随之销毁
- Docker容器和外部机器可以直接交换文件吗?
- 容器之间想要进行数据交互?
**数据卷**
![20240921113912](https://xiaoweii.oss-cn-beijing.aliyuncs.com/img/20240921113912.png)
- 数据卷是宿主机中的一个目录或文件
- 当容器目录和数据卷绑定后,对方的修改会立即同步
- 一个数据卷可以被多个容器同时挂载
![20240921114012](https://xiaoweii.oss-cn-beijing.aliyuncs.com/img/20240921114012.png)
- 一个容器也可以被挂载多个数据卷
- 数据卷可在容器之间共享或重用数据
- 不会再容器删除时删除其挂载的数据卷
- 数据卷中的更改不会包含在镜像的更新中
- 数据卷的生命周期一直持续到没有容器使用它为止

#### 数据卷挂载
```bash
docker run -it -v 宿主机目录:容器内目录 centos
```
-v: 目录映射,即数据卷挂载,可以使用多个-v做多个目录或文件映射

### 安装Tomcat

#### 拉取tomcat镜像
```bash
docker pull tomcat:7.0.56
```
#### 通过tomcat镜像来创建一个容器
```bash
docker run -id -p 8080:8080 -v /webapps:/usr/local/tomcat/webapps --name mytomcat tomcat:7.0.56
```
- -i:保持容器运行,通常与-t同时使用,加入it这两个参数后,表示创建出容器就进入到容器中
- -d:以守护(后台)模式运行容器.创建一个容器在后台运行,容器不会自动关闭
- -t:为容器重新分配一个伪输入终端,通常与-i同时使用,构建一个前台运行的容器,创建出容器就进入到容器中,退出容器容器就关闭
> -it和-id可以在docker run指令中使用
> -it:创建交互式容器(前台容器),创建容器之后就会自动进入容器中,退出容器,容器自动停止
> -id:创建守护式容器(后台容器),创建容器之后不会自动进入容器中,退出容器,容器不会自动停止
> 交互式容器:以交互式方法创建并启动容器(前台),启动完成后,直接进入当前容器.使用exit命令退出容器,容器就会停止
> 守护式容器:以守护式方式创建容器(后台),创建容器之后,不会立刻进入容器中,容器是在后台运行的,使用exit命令退出容器后,容器不会停止,会一直运行
- -p 8080:8080 :将宿主机的8080端口映射到容器的8080端口,即端口映射操作.(docker容器是完全使用沙箱机制,外部机器不能直接访问,如果想要访问必须让宿主机的端口和容器的端口和容器的端口映射关联,外部机器通过宿主机端口映射访问容器)
- -v: 目录映射,即数据卷挂载,可以使用多个-v做多个目录或文件映射
- --name mytomcat: 创建容器的名称
- -v:目录映射,即数据卷挂载,可以使用多个-v做多个目录或文件映射
- --name mytomcat: 创建容器的名称
- 最后一个tomcat:7.0.56是镜像的名称

#### 在本机进行测试
因为容器创建时进行了目录映射,所以构建容器中宿主机的/webapps目录会自动同步容器中的/usr/local/tomcat/webapps目录就会自动变成空的,因为宿主机中的/webapps目录是空的

如果想要能够访问成功, 可以找其他的tomcat/webapps/ROOT上传到宿主机中的/webapps目录中,然后同步到容器中的/usr/local/tomcat/webapps目录来设置访问资源

#### 查看容器的id
```bash
docker ps #查看正在运行的容器
docker ps -a #查看所有容器
```

#### 进入到tomcat容器中
执行或进入容器
```bash
docker exec -it 容器ID /bin/bash
```

#### 退出容器
```bash
exit 容器停止退出 #前台容器会停止退出,后台容器只是退出
# ctrl+P+Q 容器不停止退出
```

#### 容器中的命令小结

- docker ps 查看正在运行的容器
- docker ps -a 查看所有的容器
- docker stop 容器ID 停止容器
- docker start 容器id 停止容器//需要把防火墙打开 默认要启用iptables规则
- docker kill 容器ID或者容器名 强制停止容器
- docker rm 容器ID 删除已停止的容器
- docker logs -f -t --tail n 容器ID 查看容器日志(--tail 数字 显示最后多少条)
- docker cp 容器ID:容器内路径 宿主机路径 从容器内拷贝文件到宿主机上

#### 如果出现404错误解决方式
进入到容器中,再进入到tomcat的目录中执行以下指令

`cp -r webapps.dist/* webapps`

在容器中执行以上命令,有的tomcat默认没有webapps,而是webapps.dist


