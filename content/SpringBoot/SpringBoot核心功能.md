---
title: Spring Boot 核心功能
tags:
  - Spring Boot
  - 核心功能
---

## SpringBoot自动配置

自动配置能够根据classpath中的jar依赖, 环境变量, 配置文件等来自动配置Spring应用

### 工作原理

上一节说的有亿点多, 我们这里再来简单整理一下

1. SpringBoot在启动时会扫描classpath中的依赖
2. 根据发现的依赖, 自动配置响应的Spring beans
3. 还可以通过自定义配置将其覆盖

### @EnableAutoConfiguration 注解

自动配置, 主要是通过这个`@EnableAutoConfiguration`注解进行实现的, `@EnableAutoConfiguration`是通过`@SpringBootApplication`复合注解引入的. 它告诉SpringBoot根据添加的依赖猜测我们想要如何配置Spring

### 示例

这里我们通过添加MyBatis的配置依赖示范

1. 添加Mybatis依赖
   首先, 在pom.xml添加 MyBatis 的 Spring Boot Starter：

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.0</version>
</dependency>
```

2. 自动配置过程
   当SpringBoot检测到类路径中存在MyBatis相关的类时, 它会自动进行以下配置

- 自动创建并注册`SqlSessionFactory bean`
- 自动创建并注册`SqlSessionTemplate bean`
- 自动扫描和注册 Mapper 接口

3. 数据源配置
   SpringBoot还会尝试自动配置一个数据源, 当然需要在`application.properties`属性配置中提供数据库连接信息

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/<你的数据库>
spring.datasource.username=<你的用户名>
spring.datasource.password=<你的密码>
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

记得把上边的信息换成自己的

4. 使用MyBatis

有了这些自动配置, 就可以直接在代码中使用MyBatis了, 我们可以创建一个Mapper接口:

```java
@Mapper
public interface UserMapper {
    @Select("SELECT * FROM user WHERE id = #{id}")
    User getUserById(Long id);
}
```

前提你得有这个表啊, 随便写点, 最基本的mysql建表一定要掌握, 进阶的优化掌握几个就行

5. 自定义配置

刚才提到可以用自定义配置覆盖, 那么自定义配置应该怎么写呢?

如果需要自定义MyBatis的配置呢, 可以在`application.properties`中添加

```properties
mybatis.configuration.map-underscore-to-camel-case=true
mybatis.type-aliases-package=com.example.domain
```

6. 覆盖自动配置
   如果需要完全控制MyBatis, 可以创建自己的`@Configuration`类

```java
@Configuration
public class MyBatisConfig {
    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(dataSource);
        // 设置 MyBatis 配置
        return factoryBean.getObject();
    }
}
```

题外话, 持久化框架需要

上一节[[SpringBoot/SpringBoot基础概念|SpringBoot基础概念]]
