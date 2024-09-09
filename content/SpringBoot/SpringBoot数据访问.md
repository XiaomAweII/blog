---
title: Spring Boot 数据访问
tags:
  - Spring Boot
  - 数据访问
---

## SpringBoot整合MyBatis

步骤:

1. 添加依赖
   在pom.xml中添加以下依赖:

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.0</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```

2. 配置数据源
   在 application.properties 中配置数据库连接：

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

mybatis.type-aliases-package=com.example.domain
mybatis.mapper-locations=classpath:mapper/*.xml
```

3. 创建实体类

```java
public class User {
    private Long id;
    private String name;
    // getters and setters
}
```

4. 创建 Mapper 接口

```java
@Mapper
public interface UserMapper {
    @Select("SELECT * FROM users WHERE id = #{id}")
    User getUserById(Long id);

    @Insert("INSERT INTO users(name) VALUES(#{name})")
    int insertUser(User user);
}
```

5. 使用Mapper

```java
@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    public User getUser(Long id) {
        return userMapper.getUserById(id);
    }

    public void addUser(User user) {
        userMapper.insertUser(user);
    }
}
```

## SpringBoot整合Redis

步骤:

1. 添加依赖
   在 pom.xml 中添加：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

2. 配置Redis连接
   在 application.properties 中：

```properties
spring.redis.host=localhost
spring.redis.port=6379
```

3. 创建Redis配置类(可选)

```java
@Configuration
public class RedisConfig {
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new Jackson2JsonRedisSerializer<>(Object.class));
        return template;
    }
}
```

4. 使用 RedisTemplate

```java
@Service
public class UserService {
    @Autowired
    private RedisTemplate<String, User> redisTemplate;

    public void saveUser(User user) {
        redisTemplate.opsForValue().set("user:" + user.getId(), user);
    }

    public User getUser(Long id) {
        return redisTemplate.opsForValue().get("user:" + id);
    }
}
```

上一节[[SpringBoot/SpringBoot数据访问|SpringBoot数据访问]]
