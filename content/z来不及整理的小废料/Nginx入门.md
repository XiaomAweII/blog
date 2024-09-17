---
title: Nginx
tags:
  - 下载
  - 安装
  - nginx
  - 入门
---

> 之前想把博客搭载云服务器上,看了一个很牛up程序员鱼皮,把博客搭在了阿里云的服务器上边,中间用到了Nginx,一个Web服务器, 但是当时不太了解什么是Nginx,简单看了看不以为意, 后来使用Redis的时候, 讲了一个集群, 又用到了负载均衡来提升性能, 然后我忽然发现我的Nginx不太懂, 于是找了几个教程, 看了看视频, 这篇博客就是我跟着稀土掘金社区上的一个作者的文章来学习一下什么是Nginx, 但是对于像我这样的小菜鸡, 知道基本的使用我感觉就可以了, 以后用到了再深度的研究
> 赋上连接, 有兴趣的话, 可以去扒一扒这位佬其他的帖子, 也是蛮有意思的
> https://juejin.cn/post/7380296247720837155

# Nginx入门

## 介绍

Nginx是一款轻量级的Web服务器、反向代理服务器，是由俄罗斯的程序设计师Igor Sysoev所开发，使用C语言开发，由于它的内存占用少，启动速度极快，具有高并发的能力，在互联网项目中被广泛地应用。
它的功能丰富，可作为HTTP服务器，静态资源服务器，也可作为反向代理服务器，邮件服务器等。支持FastCGI、SSL、Virtual Host、URL Rewrite、Gzip等功能。并且支持很多第三方的模块扩展。Nginx在全球网站中的市场份额为33.5%，位居第二，仅次于Apache.
在性能方面, Nginx采用事件驱动的异步非阻塞处理方式, 这使得它能够在高并发情况下保持低内存消耗和高效率.
然后是大名鼎鼎的负载均衡, 很多人听过额, Nginx提供多种负载均衡算法, 如轮询, IP哈希, 最少连接数等, 可以有效分配流量到多个后端服务器.
动静分离,Nginx擅长处理静态内容,可以有效地将动态请求转发到应用服务器, 实现动静分离, 提高整体性能.
Nginx可以作为Web应用防火墙(WAF使用),提供基本的安全功能如现只能连接数吗,IP黑白名单等. 同时Nginx的配置文件语法简介明了, 易于理解和维护. 支持条件判断, 使配置更加灵活.
热部署也支持, 即可以在不停止服务的情况下更新配置文件, 更换日志文件等. Nginx从1.9.5版本开始支持HTTP/2协议, 提供更快的web体验.
Nginx在微服务架构中, Nginx常用做API网关, 处理请求路由, 负载均衡,SSl终止等任务.提供强大的缓存功能, 可以大幅减少对后端服务器的请求, 提高响应速度. Nginx还是跨平台的, 支持多种操作系统, 包括Unix, Linux, Windows, MacOS等.

## 安装

在Mac上下载和安装Nginx的最简单的方法是使用Homebrew包管理器, 当然如果没有安装Homebrew, 首先需要安装它再安装Nginx

### 安装Homebrew(如果尚未安装)

打开终端, 复制并粘贴以下命令:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

按照提示完成安装

### 安装Nginx

安装Homebrew后，使用以下命令安装Nginx：

```bash
brew install nginx
```

### 启动Nginx

安装完成后，可以使用以下命令启动Nginx：

```bash
brew services start nginx
```

### 验证安装

在浏览器中访问 http://localhost:8080，如果看到Nginx欢迎页面，说明安装成功。

### 常用命令

- 停止Nginx: `brew services stop nginx`
- 重启Nginx: `brew services restart nginx`
- 查看Nginx状态: `brew services list`

### 配置文件位置

Nginx的主配置文件通常位于 /usr/local/etc/nginx/nginx.conf

### 日志文件位置

日志文件通常位于 /usr/local/var/log/nginx/

## Nginx核心功能

### 反向代理

#### 什么是代理

说到代理, 首先要明确一个概念, 所谓代理就是一个代表, 一个渠道, 此时就涉及到两个角色, 一个是被代理角色, 一个是目标角色, 被代理角色通过这个代理访问目标角色完成一些任务的过程称为代理操作过程; 如同生活中随处可见的中介, 我们可以通过中介买到房子, 中介就是代理, 被代理的就是买房子的人, 而我们就是目标角色.

其实代理就是一个中间实体, 它代表其他实体执行操作. 在网络环境中, 代理服务器作为客户端和目标服务器之间的中介.

#### 正向代理

说到正向代理, 最熟悉的就是VPN: VPN通俗的将就是一种中转服务, 当我们电脑介入介入VPN后, 我们对外IP地址就会变成VPN服务器的公网IP, 我们请求接收任何数据都会通过这个VPN服务器传入到我们主机, 隐藏了本机的地址. 那么这样做有什么好处呢? VPN利于低成本的公共网络作为企业骨干网, 同时又克服了公网网络缺乏保密性的缺点, 在VPN网络中, 位于公网网络两端的网络在公共网络上传输信息时, 其信息都是经过安全处理的, 可以保证数据的完整性, 真实性和私有性.

这里的VPN就是做正向代理. 正向代理服务器位于客户端和服务器之间, 为了向服务器获取数据, 客户端要向代理服务器发送一个请求, 并指定目标服务器, 代理服务器将目标服务器返回的数据转交给客户端. 这里客户端是要进行一些正向代理的设置的.

简单来说, 正向代理就是客户端明确知道代理的存在, 常用于访问受限资源, 隐藏客户端身份, 绕过防火墙等, 例如VPN服务, 企业内网代理.

#### 反向代理

反向代理, 对比正向代理来说其实就是反过来了, 正向代理是隐藏用户的信息, 而反向代理是隐藏真实的服务信息.

反向代理和正向代理的区别就是: 正向代理代理的是客户端, 反向代理代理的是服务器

简单来说,反向代理是客户端通常不知道代理的存在, 用于负载均衡, 缓存, 安全防护等, 如Nginx作为反向代理服务器

### 负载均衡

利用反向代理可以作为内部负载均衡(load balance)的手段.

举个例子来说, 比如我现在开发了一个java web的博客网站, 我把它直接部署到它的tomcat服务器上, 让tomcat监听80端口, 直接对外服务. 一开始访问量也不大, 所以这样也是没有问题的, 但是当用户增多, 访问量上来的时候, 一个tomcat进程处理不过来了, 那现在怎么办? 于是我们想到了再起一个tomcat进程, 但是这样又多了一个问题, 我只有80端口, 那么我们只能起一个其他的端口, 这样做的话显然是又问题的, 用户在访问的时候不可能有的访问80端口, 有的人在访问的时候用其他端口把.

基于以上的问题, 我们可以想到可以用Nginx的反向代理来实现两个tomcat进程的负载均衡, 那么我们只需要代理两个tomcat进程, 配置负载均衡策略, 将入口交个Nginx来管理, 那么用户在访问同一个地址的时候就可以将请求分发到不同的tomcat上以实现负载均衡.

看一个简单的配置:

```shell
http {
    upstream server1{
        server 127.0.0.1:8080 weight=3;
        server 127.0.0.1:8081 weight=2;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://server1;
        }
    }
}
```

其中weight是权重，当机器的配置不一样的时候可以控制流向每个机器的流量占比。

1. `http`块:
   这是Nginx配置的主要部分, 包含了所有与HTTP相关的指令
2. `upstream`块:

- 名称为`server1`
- 定义了一组服务器, 用于负载均衡
- 包含两个服务器:
  - 127.0.0.1:8080 权重为3
  - 127.0.0.1"8081 权重为2

3. 权重(`weight`):

- 用于控制流向每个服务器的流量bilibili
- 在这个例子中, 8080端口的服务器会接收60%的流量(3/5),8081端口的服务器会接收40%的流量(2/5)
- 权重越高, 分配到的请求越多

4. `server`块:定义了一个虚拟服务器
5. `listen 80`

- 指定这个服务器监听的80端口

6. `location /`块:

- 匹配所有的请求路径
- 定义了如何处理这些请求
  7/ `proxy_pass http://server1`:
- 将请求代理到名为`server1`的上游服务器组
- Nginx会根据之前定义的权重在两个服务器之间分配请求

这个配置实现了一个简单的负载均衡. 当请求到达Nginx服务器的80端口时, 它会被转发到两个后端服务器之一, 根据设定的权重来分配流量. 这种设置可以提高系统的整体处理能力和可用性

`location`指令用于定义如何处特定的URL路径. 在这个例子中, `location /`匹配所有请求. 可以添加更多的`location`块来处理不同的路径, 例如:

```shell
location /api/ {
    proxy_pass http://api_servers;
}

location /static/ {
    root /path/to/static/files;
}
```

这样可以为不同的路径配置不同的处理方式

### 限流

Nginx限流就是限制用户请求的速度, 防止服务器过载的情况, 限流一般有3种, 正常限制访问频率(正常流量), 突发限制访问频率(突发流量) 限制, 并发连接数Nginx的限流都是基于漏桶流算法, 后面会说到

#### 正常限制访问频率(正常流量)

这是最基本的限流方式, 它限制在一定时间内可以接受的请求数量. 例如, 每秒最多允许10个请求, 适用于稳定的, 可预测的流量模式

Nginx配置示例:

```shell
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;
server {
    location / {
        limit_req zone=mylimit;
    }
}
```

#### 突发限制访问频率(突发流量)

这种方式允许短时间内的流量突发, 但仍然控制总体速率. 它在正常限制的基础上, 允许一定数量的请求快速通过, 超过这个数量后才开始限制, 适用于有短期流量峰值的场景.

Nginx配置示例:

```shell
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;
server {
    location / {
        limit_req zone=mylimit burst=20;
    }
}
```

这里的`brust=20`是允许短时间内额外的20个请求快速通过

#### 并发连接数限制

这种方式限制同时连接到服务器的客户端数量, 它控制的是活跃连接数, 而不是请求速率, 适用于需要控制服务器资源使用的场景

Nginx配置示例:

```shell
limit_conn_zone $binary_remote_addr zone=addr:10m;
server {
    location / {
        limit_conn addr 10;
    }
}
```

这限制每个IP地址最多同时又10个连接

#### 漏桶算法:

- 想象一个有小孔的桶, 水(请求)以不均匀的速度流入, 但以固定速率流出.
- 桶可以暂时存储突发的水(请求), 但最终输出速率是恒定的.
- 这确保了即使有流量突发, 输出到服务器的请求也是平滑的

这些限制机制帮助保护服务器不被过多请求研磨, 同时允许一定程度的灵活性来处理流量波动. 根据应用的具体需求, 可以单独使用这些方法, 也可以组合使用.

## Nginx基础使用及配置文件介绍

### Nginx基本命令

```shell
nginx -s stop ：强制关闭Nginx，可能不保存相关信息，并迅速终止web服务。
pkill nginx ：强制关闭nginx
nginx -s quit ：平稳关闭Nginx，保存相关信息，有安排的结束web服务。
nginx -s reload ：重新加载配置而不用重启服务。
nginx -s reopen ：重新打开日志文件。
nginx -c filename ：为 Nginx 指定一个配置文件，来代替缺省的。
nginx -t ：不运行，而仅仅测试配置文件。nginx 将检查配置文件的语法的正确性，并尝试打开配置文件中所引用到的文件。
nginx -v：显示 nginx 的版本。
nginx -V：显示 nginx 的版本，编译器版本和配置参数。
```

### Nginx配置文件结构

```shell

main                                # 全局配置
events {                            # nginx工作模式配置

}
http {                                # http设置
....
server {                        # 服务器主机配置
    ....
    location {                    # 路由配置
        ....
    }
    location path {
        ....
    }
    location otherpath {
        ....
    }
}
server {
    ....

    location {
        ....
    }
}
upstream name {                    # 负载均衡配置
    ....
}
}


```

如上述配置文件所示, 主要由6个部分组成

1. main: 用于nginx全局信息的配置
2. events: 用于nginx工作模式的配置
3. http: 用于进行http协议信息的一些配置
4. server: 用于进行服务器访问信息的配置
5. location: 用于进行访问路由的配置
6. upstream: 用于进行负载均衡的配置

### main模块

```shell
# user nobody nobody;
worker_processes 2;
# error_log logs/error.log
# error_log logs/error.log notice
# error_log logs/error.log info
# pid logs/nginx.pid
```

- user 用来指定nginx worker进程运行用户以及用户组, 默认nobody账号运行
- worker_processes 指定nginx要开启的子进程数量, 运行过程中监控每个进程消耗内存(一般几M~几十M不等)根据实际情况进行调整, 通常数量是CPU内核数量的整数倍
- error_log 定义错误日志文件的位置及输出级别debug/info/notice/warn/error/crit
- pid 用来指定进程id的存储文件的位置
- worker_rlimit_nofile用于指定一个进程可以打开最多文件数量的描述

### event模块

```shell
	event {
		worker_connections 1024;
		multi_accept on;
		use epoll;
	}
```

- worker_connections 指定最大可以同时接收的连接数量, 这里一定要注意, 最大连接数量是和worker_processes共同决定的
- multi_accept 配置指定nginx在收到一个新链接通知后尽可能多的接收更多的连接
- use epoll 配置指定了线程轮询的方法, 如果是linux2.6+, 使用epoll, 如果是BSD如Mac请使用Kqueue

### http模块

作为web服务器, http模块是nginx最核心的一个模块, 配置项也是比较多的, 项目中会设置到很多的实际业务场景, 需要根据硬件信息进行适当的配置, 常规情况下, 使用默认配置即可! 这里不做介绍.

### server模块

server模块配置是http模块中的一个子模块, 用来定义一个虚拟访问主机, 也就是一个虚拟服务器的配置信息.

```shell
server {
	listen        80;
	server_name localhost    192.168.1.100;
	root        /nginx/www;
	index        index.php index.html index.html;
	charset        utf-8;
	access_log    logs/access.log;
	error_log    logs/error.log;
......
}
```

- server 一个虚拟主机的配置, 一个http中可以配置多个server
- server_name 用来指定ip地址或者域名, 多个配置之间用空格分隔
- root 表示整个server虚拟主机内的根目录, 所有当前主机中web项目的根目录, 可以用来做静态服务器
- index 用户访问web网站时的全局首页
- charset 用来设置www/路径中配置的网页的默认编码格式
- access_log 用于指定该虚拟主机服务器中的访问记录日志存放路径
- error_log 用于指定该虚拟主机服务器中访问错误日志的存放路径

### location模块

location模块是nginx配置中出现最多的一个配置, 主要用于配置路由访问信息, 在路由访问信息配置中关联到反向代理, 负载均衡等等各项功能

```shell
location / {
	root    /nginx/www;
	index    index.php index.html index.htm;
    }
```

- location / 表示匹配访问根目录
- root 用于指定访问根目录时, 访问虚拟主机的web目录
- index 在不指定访问具体资源时, 默认展示的资源文件列表

#### 反向代理配置方式

通过反向代理服务器访问模式, 通过proxy_set配置让客户端访问透明化

```shell
http {
    upstream server1{
        server 127.0.0.1:8080 weight=3;
        server 127.0.0.1:8081 weight=2;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://server1;
	    index    index.php index.html index.htm;
        }
    }
}
```

## Nginx具体使用

### 静态资源服务器

Nginx可以作为静态web服务器来部署静态资源. 静态资源指在服务端真实存在并且能够直接展示的一些文件, 比如常见的html页面, css文件, js文件, 图片, 视频等资源. 相对于Tomcat, Nginx处理静态资源的能力更加高效, 所以在生产环境下, 一般都会将静态资源部署到Nginx中. 将静态资源部署到Nginx非常简单, 只需要将文件复制到Nginx安装目录下的html目录中, 然后访问相应的地址即可下载对应的静态资源

例如:

```shell
server {
	listen 80; #监听端口
	server_name localhost; #服务器名称
	location / {  #匹配客户端请求url
		root html; #指定静态资源根目录
		index index.html; #指默认首页
	}
}
```

通过以上配置文件启动nginx, 那么我们只需要将静态文件例如图片, 文件放到html目录下面, 然后访问ip地址加80端口加对应的路径就可以访问到服务器中的文件

### 反向代理

反向代理就是隐藏真实的服务器地址, 保护真实的服务器, 用户在访问时访问的就是代理服务器.

nginx中常见的反向代理指令有两个: `proxy_pass`和`fastcgi_pass`, 前者使用标准的HTTP协议转发, 后者使用FastCGI协议转发. 这里我们以`proxy_pass`为例来做介绍

`proxy_pass`有两种写法:

1. 直接指向要代理的地址, 可以是一台具体的主机(ip), 也可以是一个具体的网址
2. 可以搭配负载均衡指向一组服务器(参考负载均衡)

如下面的配置所示最简单的一个反向代理配置:

```shell
server {
	listen 80;
	server_name localhost;
	location / {
		proxy_pass http://tech.xiaoweii.xyz; #反向代理配置,将请求转发到指定服务
	}
}
```

**解释**

- server 块: 定义了一个虚拟服务器
- listen 80: 指定该服务器监听80端口(HTTP默认端口)
- server_name localhost: 设置服务器名称为localhost , 这意味着这个配置块将处理发送到 localhost的请求
- location / 块: 匹配所有请求路径
- proxy_pass http://tech.xiaoweii.xyz
  - 这是反向代理配置
  - 所有到达这个服务器的请求都会被转发到 http://tech.xiaoweii.xyz


这个配置的作用是:
当有请求到达运行这个Nginx服务器的localhost的80端口时, Nginx会将请求转发到http://tech.xiaoweii.xyz

**注意事项**:

1. 首先确保`tech.xiaoweii.xyz`是可访问的, 你需要换成你的的时候是可访问的
2. 这个配置会导致所有请求都被转发, 包括静态资源
3. 可能需要添加一些额外的代理设置, 例如:

```shell
location / {
    proxy_pass http://tech.xiaoweii.xyz;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

这些额外的设置可以确保原始请求的一些重要信息被传递给后端服务器.

#### 正确的热部署步骤

```shell
nginx -t  # 首先测试配置文件
nginx -s reload  # 如果测试通过,则重新加载
```

#### 重启Nginx的命令

```shell
sudo systemctl restart nginx  # 对于使用systemd的系统
# 或
sudo service nginx restart  # 对于较旧的系统
```



### 负载均衡

早期的网站流量和业务功能都比较简单, 单台服务器就可以满足基本需求, 但是随着互联网的发展, 业务流量越来越大并且业务逻辑也越来越复杂, 单台服务器的性能及单点故障问题就凸显出来了, 因此需要多态服务器组成应用集群, 进行性能的水平扩展以及避免单点故障出现. 那么这时候Nginx就可以作为一个负载均衡服务器.

负载均衡基础配置

```shell
upstream loadServer{ #upstream指令可以定义一组服务器
	server 192.168.137.101:8080 weight=10; #可以设置权重，默认都是1，数值越大，分配的流量越多
	server 192.168.137.101:8081 weight=5;
}
server {
	listen 80;
	server_name localhost;
	location / {
		proxy_pass http://loadServer;
	}
}
```

## 负载均衡算法

### 轮询(默认方法)

每个请求按时间顺序逐一分配到不同的后端服务器

```shell
upstream backserver { 
 server http://tech.xiaoweii.xyz/; 
 server 192.168.0.100; 
} 
```

这里定义了一个名为`backserver`的上游服务器组, 包含两个服务器: 一个是域名, 一个是IP地址, Nginx会轮流将请求发送到这两个服务器


### 加权

又称加权轮询, 通过weight参数控制服务器接收请求的比例, 可以根据服务器性能或需求调整流量分配

weight 的值越大，分配到的流量比例就越高。这种设置适用于各种情况，不仅限于服务器配置不同或承受能力不同的情况

```shell
upstream backserver { 
 server http://tech.xiaoweii.xyz/ weight=2; 
 server 192.168.0.100 weight=3; 
} 
```

同样是名为`backserver`的上游服务器组, 但是添加了权重`tech.xiaoweii.xyz`的权重是2, `198.168.0.100`的权重是3, 在5个请求中, 大约2个会发送到第一个服务器, 3个发送到第二个

### ip_hash

每个请求按访问IP的哈希结果分配, 使来自同一个IP的访客固定访问一台后端服务器, 并且可以有效解决动态网页存在的session共享问题

```shell
upstream backserver { 
 ip_hash;	
 server http://tech.xiaoweii.xyz/ weight=2; 
 server 192.168.0.100 weight=3; 
} 
```
添加了`ip_hash`指令
- 基于客户端IP地址的哈希值来选择服务器
- 同一IP的请求总是发送到同一服务器(除非该服务器不可用)
- 权重仍然生效, 但影响较小

### 热备

就是设置备用服务器, 主服务器故障时自动切换到备用服务器

如果你有2台服务器, 当一台服务器发生事故时, 才启用第二台服务器给提供服务

```shell
upstream backserver { 
	
 server http://tech.xiaoweii.xyz/; 
 server 192.168.0.100 backup; 
} 
```

第二个服务器被标记为`backup`, 只有当第一个服务器不可用时, 才会使用备份服务器

### fair

第三方插件, 必须安装upstream_fair模块, 根据服务器响应时间只能分配请求, 可以更好地平衡负载

```shell
upstream backserver { 
 fair;	
 server http://tech.xiaoweii.xyz/; 
 server 192.168.0.100; 
} 
```

使用`fair`指令弃用第三方模块, 根据服务器的响应时间来分配请求, 响应时间短的服务器会收到更多请求

### 限流

Nginx提供了限制请求频率的模块, 可以通过ngx_http_limit_req_module来实现. 以下是一个简单的配置示例, 该配置将请求限制在每秒1个请求, 超过限制的请求将被拒绝

简单来说就是控制请求速率, 防止服务器过载, 可以基于IP地址进行限制, 提供brust参数允许短时间的流量突发

```shell
http {
    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=1r/s;
 
    server {
        location / {
            limit_req zone=mylimit burst=5;
            proxy_pass http://my_upstream;
        }
    }
}
```

- limit_req_zone 指令: 定义了一个速率限制区域, 其中$binary_remote_addr用于识别每个请求的IP地址, 
- mylimit:10m是这个区的名字和内存大小, rate=1r/s设置了允许的平均请求速率
- limit_req: 指令应用了速率限制区域到具体的location, burst=5定义了允许的突发请求数, 即当请求超过限制时, 允许的额外请求数

这个配置将导致对于每个IP地址, Nginx只处理每秒1个请求, 超过这个速率的请求将会收到503错误

注意:
这只是个基本示例, 实际应用中可能需要根据实际需求调整限制的策略. 例如, 可以根据其他变量(如请求的大小, 请求的方法等)来限流, 或者使用更复杂的限流策略, 如带权重的速率限制.