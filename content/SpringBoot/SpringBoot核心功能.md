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

这有什么用呢? 很多人忘了这两个bean有什么用了.

`SqlSessionFactory`是MyBatis的核心接口, 之前是不是都叫它会话工厂鸭? 从这个类名我们就可已看出它书负责创建SqlSession实例的, 而SqlSession实例又是什么呢? 想想我们为什么要用MyBatis啊? 不就是为了替代原先的JDBC吗? 因为用起来太累了, JDBC就不展开了, 再挖个坑回头填上. **SqlSession是我们执行SQl语句的主要接口**啊! 帮助我们**管理数据库, 负责创建, 管理和关闭数据库连接**, 同时还帮我们**加载MyBatis的配置(包括映射文件, 类型别名)**. 在SpringBoot中, 自动配置会创建一个`SqlSessionFactory`bean, 使其可以被注入到其他组件中使用. 这样, 就不需要我们再手动配置这个复杂的对象了
`SqlSessionTemplate`是MyBatis-Spring的核心, 它其实是SqlSession接口的一个实现, 主要作用包括:

- 线程安全: 它是线程安全的, 可以被多个DAO或映射器所共享
- 管理SqlSession: 它负责创建, 使用和关闭SqlSession
- 异常转换: 将MyBatis的异常转换为Spring的DataAccessException, 使异常处理更加统一
- 事务管理: 它能够参与到Spring的事务管理中
  在传统的Spring+MyBatis配置中, 需要手动配置这些bean:

```xml
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource" />
</bean>

<bean id="sqlSessionTemplate" class="org.mybatis.spring.SqlSessionTemplate">
    <constructor-arg index="0" ref="sqlSessionFactory" />
</bean>
```

但是在SpringBoot中, 这些都是自动完成的, 只需要添加正确的依赖, SpringBoot就会创建和配置这些bean

```java
@Service
public class UserService {
    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public User getUser(int id) {
        return sqlSessionTemplate.selectOne("com.example.mapper.UserMapper.getUser", id);
    }
}
```

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

> 题外话, 持久化框架需要掌握两个, 一个是现在常用的MyBatis, 还有一个是JPA, 再挖个坑, 有时间把这些都写了

5. 自定义配置

刚才提到可以用自定义配置覆盖, 那么自定义配置应该怎么写呢?

如果需要自定义MyBatis的配置呢, 可以在`application.properties`中添加

```properties
mybatis.configuration.map-underscore-to-camel-case=true
mybatis.type-aliases-package=com.example.domain
```

第一个配置是使开启驼峰命名自动映射的功能, 例如数据库列名user_name,Java属性名userName
第二个配置是设置MyBatis的类型别名包路径, 这样MyBatis会自动扫描指定包下的类, 并注册简单类名作为别名
等等...,我们之前使用的所有自定义配置都可以在柘林使用

6. 覆盖自动配置
   如果需要完全控制MyBatis, 可以创建自己的`@Configuration`类(上一节里提到过, 这个注解就是用来标识当前类是Spring的一个配置类)

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

### 查看自动配置报告

想要查看自动配置报告, 可以在启动应用时添加 `--debug`标志来查看自动配置的详细报告

### 排除特定的自动配置

如果不想使用某个特定的自动配置, 我们还可以使用`@EnableAutoConfiguration`的`exclude`属性:

```java
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class MyApplication {
    // ...
}
```

### 条件注解

SpringBoot使用一些列的`@Conditional`注解来决定是否应用某个配置, 例如:

- `@ConditionalOnClass`: 当特定的类在classpath类路径上时
- `@ConditionalOnMissingBean`: 当特定的Bean不存在时
- `@ConditionalOnProperty`: 当特定的属性有待定值时

### 拓展

下面这个东西不做完全掌握, 我自己也不会, 大致知道有这么个东西就行

#### 条件自动化配置

SpringBoot使用条件注解来决定是否应用某个自动配置, 对于MyBatis, 主要的条件包括:`

```java
@ConditionalOnClass({ SqlSessionFactory.class, SqlSessionFactoryBean.class })
@ConditionalOnSingleCandidate(DataSource.class)
```

这个条件意味着当类路径下存在`SqlSessionFactory.class`和`SqlSessionFactoryBean`类, 并且只有一个`DataSource`bean时, MyBatis的自动配置才会生效

#### 自动配置类

MyBatis的主要自动配置类是`MybatisAutoConfiguration`. 它负责创建以下beans

- `SqlSessionFactory`
- `SqlSessionTemplate`
- `MapperFactoryBean`

#### 属性绑定

SpringBoot允许通过外部配置来自定义MyBatis的行为, 例如:

```xml
mybatis.config-location=classpath:mybatis-config.xml
mybatis.mapper-locations=classpath:mappers/*.xml
mybatis.type-aliases-package=com.example.domain
mybatis.type-handlers-package=com.example.typehandlers
mybatis.configuration.map-underscore-to-camel-case=true
```

这些属性会自动被绑定到MybatisProperties类的实例上

#### 自动扫描Mapper

MyBatis的自动配置会扫描和注册标记了`@Mapper`注解的接口

```java
@Import(AutoConfiguredMapperScannerRegistrar.class)
```

#### 覆盖默认配置

如果需要, 你可以创建自己的`SqlSessionFactory`或`SqlSessionTemplate`bean来覆盖默认的配置:

```java
@Bean
@ConditionalOnMissingBean
public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
    SqlSessionFactoryBean factory = new SqlSessionFactoryBean();
    factory.setDataSource(dataSource);
    // 自定义配置
    return factory.getObject();
}
```

#### 自定义配置顺序

SpringBoot使用`@AutoConfigureAfter`和`@AutoConfigureBefore`注解来控制自动配置类的顺序. 例如, MyBatis的自动配置是在数据源自动配置之后

```java
@AutoConfigureAfter(DataSourceAutoConfiguration.class)
```

#### 失效机制

如果不想使用MyBatis的自动配置, 可以通过以下方式排除

```
@SpringBootApplication(exclude = {MybatisAutoConfiguration.class})
```

#### 配置报告

下面是在启动是添加`--debug`参数来查看详细的自动配置报告, 了解哪些自动配置生效了, 哪些没有生效以及原因

1. 在项目已经打包成jar包之后, 可以在运行命令中直接添加`debug`:

```bash
java -jar your-application.jar --debug
```

换成你自己的项目名

2. 打开"Run/Debug Configurations", 在"Program arguments"字段中添加 --debug

3. 在`application.properties`或`allication.yml`文件中设置:

```properties
debug=true
```

或

```yaml
debug: true
```

...等等方式

## 外部化配置

外部化配置是SpringBoot的另一个核心特性, 它允许我们在不修改代码的情况下, 通过外部源来配置应用程序, 这种方法提高了应用的灵活性和可移植性

### 配置源

SpringBoot允许从多个来源配置应用程序, 主要的配置源包括:

1. 命令行参数
   例如: `java -jar myapp.jar --server.port=8080`
2. Java系统属性
   例如: `java -Dserver.port=8080 -jar myapp.jar`
3. OS环境变量
   例如: `在Linux中 export SERVER_PORT=8080`
4. **应用程序属性文件**
   - application.properties或application.yml
   - 可以放在以下位置(按优先级从高到底): - 当前目录的 /config 子目录 - 当前目录 - classpath 中的 /config 包 - classpath 根目录
     举个🌰:

```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost/test
spring.datasource.username=your_username
spring.datasource.password=your_password
```

记得换成你的

### 配置优先级

Spring Boot定义了一个明确的配置加载顺序，高优先级的配置会覆盖低优先级的配置。主要顺序如下（从高到低）：

1. 命令行参数
2. Java系统属性
3. OS环境变量
4. application.properties文件(按照上面提到的位置优先级)

### @Value注解

可以使用`@Value`注解将配置值注入到Spring管理的bean中

```java
@Component
public class MyBean {
    @Value("${my.property}")
    private String myProperty;

    // ...
}
```

> 这里涉及到了yaml语法, 黑马里面讲了, 我打算单独开一张,方便观看, 毕竟只在application.properties中配置也是可以的, 这样就不必要在这里插入多余内容额

### @ConfigurationProperties

对于很多相关配置的情况, 可以使用`@ConfigurationProperties`注解将他们绑定到一个Java对象上

```java
@Configuration
@ConfigurationProperties(prefix = "my.service")
public class ServiceProperties {
    private String url;
    private String username;
    private String password;

    // getters and setters
    // 也可以用lombok小辣椒
}
```

> 要是觉得小辣椒也需要做一章的话也不是不行, 这是Java基础注释那一部分, 回头整理的时候, 顺手写一下, 挖个坑, 等我去填

对应位置的配置可以是:

```properties
my.service.url=http://example.com
my.service.username=user
my.service.password=secret
```

### Profile特定配置

SpringBoot帮我们提供了快速配置不同环境的配置, 我们在实际开发过程当中, 测试过程当中, 以及产品发布后的环境都是不一样的, 如果每一样都要重头搭建环境将会是极为低效的事情, 于是通过profile配置帮我们实现快速配置不同环境, 通过设置 spring.profiles.active 来激活特定的profile：

```properties
spring.profiles.active=dev
```

## Actuator(执行器)

SpringBoot Actuator为SpringBoot应用提供了生产级别的监控和管理能力. Actuator 可以帮助我们了解应用程序的内部运作, 并在不修改代码的情况下与应用程序进行交互

### 主要特点

1. 健康检查: 提供应用程序各组件的健康状态。
2. 指标首届: 收集应用程序的各种运行时指标。
3. 审计: 跟踪 HTTP 请求和重要的应用程序事件。
4. HTTP跟踪: 提供最近的 HTTP 请求的详细信息。
5. 环境信息: 显示当前的环境属性。
6. 线程转储: 提供应用程序线程的详细信息。
7. 内存转储: 允许进行堆内存转储

要使用Actuator, 首先要添加依赖:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

添加依赖后, Actuator 会自动配置一些端点，如 /actuator/health、/actuator/info 等

举个🌰:

1. 健康检查端点
   访问 http://localhost:8080/actuator/health, 可能会看到类似以下的响应:

```json
{
  "status": "UP"
}
```

这表示当前应用程序正在运行且健康。

2. 应用信息端点
   访问 http://localhost:8080/actuator/info，如果在 application.properties 或 application.yml 中配置了信息，会显示出来

```yaml
info:
  app:
    name: MyApp
    description: My Spring Boot Application
    version: 1.0.0
```

3. 指标端点
   访问 http://localhost:8080/actuator/metrics，会看到可用的指标列表。
   要查看特定指标，例如 HTTP 请求数，可以访问：
   http://localhost:8080/actuator/metrics/http.server.requests

4. 环境端点
   访问http://localhost:8080/actuator/env可以看到应用的环境配置信息。

5. 日志级别端点
   可以通过 POST 请求动态修改日志级别

```
POST http://localhost:8080/actuator/loggers/org.springframework.web
Content-Type: application/json

{
  "configuredLevel": "DEBUG"
}
```

这会将 org.springframework.web 包的日志级别设置为 DEBUG

注意：出于安全考虑，默认情况下只有 /health 和 /info 端点是公开的。要暴露更多端点,需要在配置文件中添加：

```yaml
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

## 嵌入式服务器支持

我们启动了这么多次SpringBoot是不是早就发现了我们从来没有配置过Tomcat呀? 这是因为SpringBoot提供了对嵌入式服务器的支持, 默认情况下, 当我们创建一个SpringBoot Web应用时, 它会包含一个嵌入式的Tomcat服务器, 这意味着, 我们可以将应用程序打包成一个可执行的JAR包, 其中包含了所有必要的依赖, 包括web服务器

### 主要特点

1. 无需部署war文件: 可以直接运行jar文件来启动应用
2. 易于配置: 可以通过application.properties 或 application.yml 文件轻松配置服务器。
3. 灵活切换: 可以轻松切换到其他服务器, 如Jetty或Undertow
   > 回头我会单独写一个服务器篇, 我之前有看过别人介绍Tomcat启动原理, 在其中也介绍了以下Jetty和Undertow, 不是很重要, 先挖个坑, 我怎么天天挖坑

举个🌰:
在application.properties 文件中:

```properties
server.port=8080
server.servlet.context-path=/myapp
```

切换到Jetty:
首先, 排除Tomcat依赖并添加Jetty

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```
这个特性帮我们简化了Spring应用的部署和运行过程, 是SpringBoot的一个重要核心功能

>黑马的连接我放这里【黑马程序员SpringBoot教程，6小时快速入门Java微服务架构Spring Boot】 https://www.bilibili.com/video/BV1Lq4y1J77x/?share_source=copy_web&vd_source=c3f11670c018bfa92ad847e8e0f84309
>然后其中视频还讲了整合JUnit测试,MyBatis还有Redis,那就是两部分一个是测试,一个是数据访问,同时, 我之前被问到好多次都是问到SpringBoot都是自动配置, 起步依赖就问到一次, 所以自动配置单独写一遍吧, 这样不用来回跳转章节看其中的自动配置部分, 起步依赖写到自动配置那一章, 之后就是区别了, 区别我只能从网上找点了, 因为我是纯背了背区别, 再之后就是项目了, 我也是跟着别人做的项目, 自己没有那么大本事, 还是小趴菜一只, github上有源码, 回头跑一遍过一遍, 大佬的知识星球回头发达了再给他们补票吧, 一个课一两千块钱, 学生党的我们不是很能消费的起了, 哦哦, 项目是一个电商一个仿12306, 练习练手的话推荐一个B站up程序员青戈,他的主页有他自己的网站, 上边全是SpringBoot3+Vue3的项目, 简单易学, 基本上两三天起一个两三天起一个, 还能每天白嫖


上一节[[SpringBoot/SpringBoot基础概念|SpringBoot基础概念]]
下一节[[SpringBoot/SpringBoot测试支持|SpringBoot测试支持]]
