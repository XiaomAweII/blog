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
