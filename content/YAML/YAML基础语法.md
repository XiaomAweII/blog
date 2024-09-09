---
title: YAML 基础语法
tags:
  - YAML
  - 基础语法
---

## 基本语法

### 键值对

YAML 使用冒号和空格来表示键值对：

```yaml
key: value
```

### 缩进

YAML 使用缩进来表示层级关系，通常是 2 个空格

```yaml
parent:
  child: value
```

### 列表

使用短横线(-)表示列表项：

```yaml
fruits:
  - Apple
  - Banana
  - Orange
```

### 复杂对象

结合使用缩进和冒号

```yaml
person:
  name: John Doe
  age: 30
  address:
  street: 123 Main St
  city: Anytown
```

### 多行字符串

使用 | 或 > 符号：

```yaml
message: |
  This is a long message
  that spans multiple lines
```

### 环境变量

可以使用 ${} 引用环境变量：

```yaml
db_password: ${DB_PASSWORD}
```

## 在SpringBoot中使用YAML

1. 创建`application.yml`文件(替代`application.properties`)
2. 几个🌰

```yaml
server:
  port: 8080

spring:
  datasource:
  url: jdbc:mysql://localhost/testdb
  username: root
  password: password

logging:
  level:
  root: INFO
  org.springframework.web: DEBUG

my:
  property: test
  list:
    - item1
    - item2
  config:
  key1: value1
  key2: value2
```

3. Profile配置
   在同一个文件中使用`---`分隔不同的profile

```yaml
spring:
  profiles: development
server:
  port: 8080
---
spring:
  profiles: production
server:
  port: 80
```

4. 复杂配置示例

```yaml
my:
  service:
  enabled: true
  remote-address: 192.168.1.1
  security:
    username: admin
    roles:
      - USER
      - ADMIN
```

## 使用YAML时的注意事项
1. 缩进必须保持一致, 非常重要
2. 冒号后边必须有一个空格
3. 区分大小写

下一节[[YAML/YAML进阶使用|YAML进阶使用]]
