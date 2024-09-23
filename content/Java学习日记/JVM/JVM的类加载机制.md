---
title: JVM 的类加载机制
tags:
  - JVM
  - 类加载机制
---

# JVM类加载机制

## 类加载器的层次结构

JVM中有三种标准的类加载器:

```mermaid
graph TD
    A[Bootstrap ClassLoader] --> B[Extension ClassLoader]
    B --> C[Application ClassLoader]
```

- Bootstrap ClassLoader：最顶层的加载类，主要加载核心类库，如rt.jar、resources.jar等。
- Extension ClassLoader：加载ext目录下的jar包。
- Application ClassLoader：加载应用程序的类，即classpath下的类。

## 双亲委派模型

```mermaid
graph TD
    A[类加载请求] --> B{Application ClassLoader}
    B -->|委派| C{Extension ClassLoader}
    C -->|委派| D{Bootstrap ClassLoader}
    D -->|加载失败| C
    C -->|加载失败| B
    B -->|都加载失败| E[抛出ClassNotFoundException]
```
