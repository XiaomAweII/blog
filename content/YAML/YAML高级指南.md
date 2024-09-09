---
title: YAML 高级指南
tags:
  - YAML
  - 高级指南
---

> 这一部分的内容我自己都不太会, 随便看看, 把基础语法还有进阶中的锚点掌握就好了, 我这里再挖个坑, 回头有时间, 把这一章补全一下

## 配置属性验证

配置属性验证可以帮助我们确保应用程序启动时配置值的正确性. SpringBoot支持使用JSR-303 (Bean Validation) 注解来验证 @ConfigurationProperties 类(我不道啊)

首先, 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

然后, 在`@ConfigurationProperties`类上添加`@Validated`注解, 并在属性上使用验证注解

```java
import javax.validation.constraints.*;

@Configuration
@ConfigurationProperties(prefix = "app")
@Validated
public class AppConfig {

    @NotNull
    @Size(min = 1, max = 100)
    private String name;

    @Min(0)
    @Max(65535)
    private int port;

    @Email
    private String adminEmail;

    // getters and setters
}
```

如果验证失败，应用程序将无法启动，并显示详细的错误信息。

## 配置元数据

创建配置元数据可以提供更好的 IDE 支持，如自动完成和文档。创建一个文件 src/main/resources/META-INF/additional-spring-configuration-metadata.json：

```json
{
  "properties": [
    {
      "name": "app.name",
      "type": "java.lang.String",
      "description": "Application name."
    },
    {
      "name": "app.port",
      "type": "java.lang.Integer",
      "description": "Server port."
    },
    {
      "name": "app.admin-email",
      "type": "java.lang.String",
      "description": "Administrator email address."
    }
  ]
}
```

> json大家不会忘了吧, 那我再再挖个坑, 回头再看一遍json

## 配置属性加密

对于敏感信息, 可以使用Jasypt进行加密.(这个我也不知道, 我就知道个MD5, 回头加密看一下)
首先, 添加依赖

```xml
<dependency>
    <groupId>com.github.ulisesbocchio</groupId>
    <artifactId>jasypt-spring-boot-starter</artifactId>
    <version>3.0.3</version>
</dependency>
```

然后, 在配置文件中使用加密的值

```yaml
app:
  secret: ENC(encrypted_value_here)
```

在启动应用时提供加密密钥

```bash
java -jar your-app.jar --jasypt.encryptor.password=your_secret_key
```

## 动态配置更新

对于动态配置更新，可以使用 Spring Cloud Config。首先，设置一个 Config Server, 然后添加依赖:

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
```

接着在配置类上添加`@RefreshScope`注解

```java
@Configuration
@ConfigurationProperties(prefix = "app")
@RefreshScope
public class AppConfig {
    // ...
}
```

现在, 当配置更改时, 可以调用/actuator/refresh断电来更新配置

## 配置文件管理最佳搭配

- 使用版本控制系统管理配置文件
- 使用环境变量处理敏感信息

```yaml
app:
  database:
    password: ${DB_PASSWORD}
```

- 为不同环境维护不同的配置文件
  - application-dev.yml
  - application-prod.yml

## 配置的单元测试

```java
@SpringBootTest
@TestPropertySource(properties = {
    "app.name=TestApp",
    "app.port=8080",
    "app.admin-email=admin@example.com"
})
public class AppConfigTest {

    @Autowired
    private AppConfig appConfig;

    @Test
    public void testConfigProperties() {
        assertEquals("TestApp", appConfig.getName());
        assertEquals(8080, appConfig.getPort());
        assertEquals("admin@example.com", appConfig.getAdminEmail());
    }
}
```

上一节[[YAML/YAML进阶使用|YAML进阶使用]]