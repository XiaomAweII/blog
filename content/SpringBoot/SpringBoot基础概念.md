---
title: Spring Boot 基础概念
tags:
  - Spring Boot
  - 基础概念
---

# SpringBoot基础概念

## 什么是 Spring Boot?

SpringBoot 是一个基于 Spring 框架的快速开发工具。它的主要作用是简化 Spring 应用的初始搭建和开发过程。

## SpringBoot主要特性

- 快速构建Spring项目
- 内嵌Tomcat、Jetty或Undertow服务器
- 提供`starter`依赖, 简化构建配置
- 自动配置Spring和第三方库
- 提供生产就绪功能, 如指标, 健康检查和外部配置
- 完全无代码生成和无需XML配置

## SpringBoot核心概念

- 自动配置: SpringBoot会根据项目依赖自动配置Spring应用
- 起步依赖: 简化依赖管理, 无需引入多个依赖, 只需要一个起步依赖
- 命令行界面: SpringBoot提供命令行工具, 可以快速运行和测试SpringBoot应用
- Actuator: 提供在运行时检视应用内部情况的能力

## SpringBoot和传统SpringBoot框架的区别

- 配置简化: Spring Boot 大量使用注解,减少 XML 配置
- 内嵌服务器：不需要外部的 Web 服务器
- 起步依赖：简化依赖管理
- 自动配置：根据classpath自动配置bean

## 快速入门

现在我们来新建一个SpringBoot项目(IDEA左上角File->New Project), 通过启动一个SpringBoot项目来深入理解一下SpringBoot

首先, 新建SpringBoot, 我们以后都使用`Spring Initializr`(https://start.spring.io/) ,但是第一次我们还是通过新建Maven项目手动设置一个和SpringBoot项目

### 创建好新的Maven项目之后, 在`pom.xml`文件中添加依赖

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.6.3</version>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

> p.s:这里启动的是一个SpringBoot2的项目, 我是跟着黑马程序员6小时快速入门学习的SpringBoot的,后来在我大四上写毕业设计的时候使用的是SpringBoot3, 其实本质上没有什么区别, 我使用起来也就是一些yaml语法上的区别,当然也有一些比较大的不同,不过之后会单独拎出来,这里的学习日记都会使用SpringBoot2,因为在我就业的时候大部分都是SpringBoot2,更重要的是SpringBoot3最低支持jdk17,jdk的新特性我也有研究过,后来出到22又有了很多新特性, 这个之后再说, 更重要的是最近传的越来越邪乎, jdk8之后的jdk要收费了, 所以SpringBoot2的项目在现如今还是十分能打的, 我跟着做过两个项目, 一个3的和一个2的, 电脑重装系统之后文件丢失了, 不过记忆还在, 我也会在之后复现, 所以大家不用担心学SpringBoot2就低人一等, 没有迎合市场什么的, 因为不需要我们研究什么底层源码什么的, 当然我也看过, 这是一件十分耗时间的事, 而且收益不大, 我看到现在也没有把SpringBoot源码过一遍, 更重要的是关注业务逻辑如何实现, 不过我之前看别人整理过, 我回头搬运过来, Spring的底层我之前跟着视频看了一遍, 回头也写上, 所以无论是SpringBoot2还是3, 希望大家不要看到这是2就扭头走了, 坚持, 我也会坚持更新下去, 虽然现在看我技术博客的人寥寥无几, 大家一起进步交流

这里的依赖父工程pom和spring-boot-starter-web, 便是起步依赖的概念, 相比之前的Spring配置再回顾下:
spring当中的Maven依赖需要明确列出所有的依赖, 首先springframework的核心包少不了, 其次web项目spring-web依赖少不了, 如果是mvc架构还需要引入spring-webmvc的依赖,更别说你还需要日志,数据库驱动等等依赖全部需要写, 写完之后还需要去你的web.xml当中配置, 还需要再配置组件扫描, 视图扫描, 完事了编写业务代码, 最后还需要自己打包成war文件, 并部署到外部的web服务器中,相当麻烦, 这里仅仅列一下spring当中的maven依赖部分

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>5.3.3</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.3.3</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-web</artifactId>
        <version>5.3.3</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.3</version>
    </dependency>
    <!-- 其他依赖，如日志、数据库驱动等 -->
</dependencies>
```

可谓是相当麻烦, 我们可以直观的感受到起步依赖带给我们的便利

### 创建引导类(又叫主应用类)

可以理解为SpringBoot项目启动的地方

创建一个HelloSpringBootApplication.java:

```java
@SpringBootApplication
public class HelloSpringBootApplication {
    public static void main(String[] args) {
        SpringApplication.run(HelloSpringBootApplication.class, args);
    }
}
```

从这里便可以启动我们以后的SpringBoot项目了,需要关注的又两个地方
`@SpringBootApplication`注解
这个注解时SpringBoot当中的符合注解, 它组合了以下三个注解:

- `@Configuration`
  - 这个注解在ssm当中也使用过, **表明当前的这个类是一个配置类, 允许在类中使用`@Bean`注解定义SpringBean**
- `@EnableAutoConfiguration`

  - 这是SpringBoot当中的一个注解, **表示启动SpringBoot的自配置机制**, 我们之前也是用过类似的操作, 比如ssm当中使用半注解半xml或者纯注解方式的时候类似, 同时会**根据项目的依赖和类路径自动配置Spring应用**
    举个🌰:
    如果项目当中`spring-webmvc`出现在类路径当中, 它会自动配置一个`DispatcherServlet`, 这又是什么意思呢? 其实非常简单, 因为我们是使用的SpringBoot的起步依赖, 我们依赖的是一个固件化的很多依赖, 这些依赖版本都是SpringBoot帮我们配置好的, 我们仅仅是引入了父工程和使用快速依赖, 至于它里边还有什么在我们未运行的时候我们不一定知道, 当编译启动后, 会生成class编译文件, 这个是方便计算机去执行的, 因为计算机只能执行机器语言, 而这个class就是我们刚才所说的类路径, 如果这个里边包含`spring-webmvc`, 也就是你可能没写, 但是SpringBoot依赖了这个依赖, 那么它也会自动配置`DispatcherServlet`, 就不需要我们自己去配置了, 之前配过, 比如
    ```xml
    <servlet>
       <servlet-name>dispatcher</servlet-name>
       <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
       <init-param>
           <param-name>contextConfigLocation</param-name>
           <param-value>/WEB-INF/spring-mvc.xml</param-value>
       </init-param>
       <load-on-startup>1</load-on-startup>
    </servlet>
    ```

   <servlet-mapping>
       <servlet-name>dispatcher</servlet-name>
       <url-pattern>/</url-pattern>
   </servlet-mapping>
    ```
    这个`DispatcherServlet`我们肯定用过, 比如它帮我们接收所有的http请求, 同时将请求分发给适当的Controller类(控制器类)中的处理器(方法)

- `@ComponentScan`
  - 组件扫描的注解, **自动扫描当前包以及子包内的所有Spring组件**, 有什么用呢组件扫描? 组件扫描会将查找其下的`@Component`,`@Service`,`@Repository`,`@Controller`等注解, 将它们注册为Spring Bean, 那么注册为Spring Bean又有什么用呢? 这就设计到Spring的核心之一IOC控制反转了, 简而言之就是不需要我们手动去创建对象了, Spring会帮我们创建, 再不理解就需要去重新学习Spring了,-.-,
    那么使用`@SpringBootApplication`注解, 一下子就可以替代这三个注解, 简化配置

第二个需要关注的地方:

`SpringApplication.run()`方法

上边是示例当中

```java
SpringApplication.run(HelloSpringBootApplication.class, args);
```

这行代码时启动SpringBoot项目关键
作为程序员我们按着ctrl不松手点进去自行查看好吧, 因为套了好几层, 不在这里演示了(主要是我的存储桶还没搞好,不贴图的话无关代码太多)
但是简单说一下它干了哪些事情, 你们点进去顺着看一遍就会知道的

1. 创建Spring应用的上下文, 设置默认的配置, 启动Spring容器
2. 执行自动配置, 根据类路径中的依赖自动配置Spring应用
3. 启动嵌入式Web服务器(当然如果是Web应用的话, 主要看你的依赖当中有没有`spring-boot-starter-web`依赖), 他会自动一个嵌入式的Web服务器(默认是Tomcat, 我看还有Jetty?不知道,回头查查)
4. 执行命令行参数, 处理传入的命令行参数, 也就是上边的第二个参数`args`(可写可不写)
5. 运行应用, 启动Spring应用
6. 返回`ConfigurableApplicationContext`, 也就是配置好的Spring应用上下文

现在是不是更能体验到SpringBoot的方便, 就一个run方法把我们自己原先繁琐重复的操作全部完成了, 很神奇吧Orz

### 创建一个Controller类

创建一个简单的Controller:HelloController.java

```java
@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "你好,Spring Boot!";
    }
}
```

`@RestController`这个没有忘吧, 配置可能忘了, 但是这个很常用的, 表名当前类是一个控制器, 并且会将每个方法的返回值写进http响体中
`@GetMapping("/hello")`这个注解会帮我们把http中的get请求映射到特定处理方法,我们还可以在其中传值呢,例如:

```java
@GetMapping("/greet")
public String greet(@RequestParam(value = "name", defaultValue = "World") String name) {
    return String.format("你好, %s!", name);
}
```

现在再次访问的时候,在地址后边拼接的话, 如http://localhost:8080/greet?name=zhangsan,应该会看到"你好,zhangsan"的消息

### 运行应用

观察下控制台啊, 现在我们什么都没有, 就写了我们的业务, 一个引导类, 一个Controller业务,没了, 但是是不是看到了控制台帮我们启动了一个Tomcat, 我们打开浏览器运行, 访问http://localhost:8080/hello , 是不是看到了"你好,SpringBoot!"的消息

上一节[[SpringBoot/index|SpringBoot学习日记]]
下一节[[SpringBoot/SpringBoot核心功能|SpringBoot核心功能]]
