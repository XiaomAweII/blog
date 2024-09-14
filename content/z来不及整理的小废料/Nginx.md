---
title: Nginx
tags:
  - 下载
  - 安装
  - nginx
---

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
