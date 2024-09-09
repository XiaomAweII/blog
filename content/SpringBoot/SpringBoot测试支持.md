---
title: Spring Boot 测试支持
tags:
  - Spring Boot
  - 测试支持
---

SpringBoot提供了许多工具和注解来简化应用程序的测试过程, 以下是一些SpringBoot测试的主要特性和概念

## @SpringBootTest注解

这是SpringBoot测试中最常用的注解. 它创建一个完整的应用程序上下文, 用于集成测试

```java
@SpringBootTest
class MyApplicationTests {

    @Test
    void contextLoads() {
        // 测试应用程序上下文是否成功加载
    }
}
```

## 测试配置

可以使用`@TestConfiguration`注解来定义仅用于测试的配置

```java
@TestConfiguration
class TestConfig {

    @Bean
    public MyService myService() {
        return new MyService();
    }
}
```

## 模拟Web环境

使用`@WebMvcTest`进行Spring MVC控制器的测试

```java
@WebMvcTest(MyController.class)
class MyControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testEndpoint() throws Exception {
        mockMvc.perform(get("/api/data"))
               .andExpect(status().isOk())
               .andExpect(content().string("expected data"));
    }
}
```

## 数据库测试

使用`@DataJpaTest`进行JPA测试

```java
@DataJpaTest
class MyRepositoryTests {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private MyRepository myRepository;

    @Test
    void testFindByName() {
        MyEntity entity = new MyEntity("test");
        entityManager.persist(entity);

        MyEntity found = myRepository.findByName("test");
        assertThat(found.getName()).isEqualTo("test");
    }
}
```

## 测试属性

使用`@TestPropertySource `来指定测试专用的属性文件

```java
@SpringBootTest
@TestPropertySource(locations = "classpath:test.properties")
class MyConfigurationTests {
    // 测试代码
}
```

## 测试REST客户端

使用 `@RestClientTest` 来测试 REST 客户端：

```java
@RestClientTest(MyRestClient.class)
class MyRestClientTests {

    @Autowired
    private MyRestClient client;

    @Autowired
    private MockRestServiceServer server;

    @Test
    void testGetData() {
        server.expect(requestTo("/api/data"))
               .andRespond(withSuccess("mock data", MediaType.TEXT_PLAIN));

        String data = client.getData();
        assertThat(data).isEqualTo("mock data");
    }
}
```

## 测试Slices

Spring Boot 提供了各种 "slice" 测试注解，如 @JsonTest, @JdbcTest 等，用于测试应用程序的特定部分。
这些特性使得在 Spring Boot 应用程序中编写和运行测试变得更加简单和高效。测试可以覆盖从单元测试到完整的集成测试的各个层面。

## 示例

这个是最常用的, 上边简单了解一下就行了

1. 搭建SpringBoot工程

通常通过Spring Initializr 或者IDE的SpringBoot项目创建向导完成

2. 引入`starter-test`起步依赖

在pom.xml中添加:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

3. 编写测试类
在src/test/java目录下创建测试类

4. 添加测试相关注解
  - `@RunWith(SpringRunner.class)`: 这个注解告诉JUnit运行使用Spring的测试支持
  - `@SpringBootTest(classes = 启动类.class)`: 这个注解创建一个完整的Spring应用程序上下文

5. 编写测试方法
在测试类中编写具体的测试方法
```java
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyApplication.class)
public class MyServiceTest {

    @Autowired
    private MyService myService;

    @Test
    public void testMyMethod() {
        String result = myService.myMethod();
        assertThat(result).isEqualTo("expected result");
    }
}
```

注意:
- 在 Spring Boot 2.2.0 及以上版本中，@RunWith(SpringRunner.class) 可以被 @ExtendWith(SpringExtension.class) 替代，这是 JUnit 5 的新特性
- @SpringBootTest 如果不指定 classes 属性，Spring Boot 会自动搜索主配置类。

上一节[[SpringBoot/SpringBoot核心功能|SpringBoot核心功能]]
下一节[[SpringBoot/SpringBoot数据访问|SpringBoot数据访问]]
