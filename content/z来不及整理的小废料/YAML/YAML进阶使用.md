---
title: YAML 进阶使用
tags:
  - YAML
  - 进阶使用
---

## 锚点和引用

YAML允许我们定义一个锚点并在其他地方引用, 方便重复配置

```yaml
defaults: &defaults
  timeout: 30
  retries: 3

development:
  <<: *defaults
  server: dev.example.com

production:
  <<: *defaults
  server: prod.example.com
  timeout: 60
```

## 复杂列表

字面意思就是列表可以包含复杂对象

```yaml
employees:
  - name: John Doe
    position: Developer
    skills:
      - Java
      - Spring
  - name: Jane Smith
    position: Designer
    skills:
      - UI/UX
      - Photoshop
```

## 多文档YAML

在一个YAML文件中可以定义多个文档, 用`---`分隔

```yaml
server:
  port: 8080
---
spring:
  profiles: test
server:
  port: 9090
---
spring:
  profiles: prod
server:
  port: 80
```

## 环境变量和占位符

YAML 支持使用环境变量和 Spring 的属性占位符

```yaml
app:
  name: MyApp
  description: ${APP_DESCRIPTION:Default description}
  config-location: ${user.home}/config
```

## 使用 @ConfigurationProperties 绑定 YAML 配置

```yaml
myapp:
  security:
    enabled: true
    token: abc123
    roles:
      - USER
      - ADMIN
  datasource:
    url: jdbc:mysql://localhost/db
    username: user
    password: pass
```

**对应的Java类**

```java
@ConfigurationProperties(prefix = "myapp")
public class MyAppProperties {
    private Security security = new Security();
    private Datasource datasource = new Datasource();

    // getters and setters

    public static class Security {
        private boolean enabled;
        private String token;
        private List<String> roles = new ArrayList<>();

        // getters and setters
    }

    public static class Datasource {
        private String url;
        private String username;
        private String password;

        // getters and setters
    }
}
```

## 条件配置

YAML可以与SpringBoot的条件注解配合使用

```yaml
myapp:
  feature:
    enabled: true
---
spring:
  profiles: development
myapp:
  feature:
    enabled: false
```

**对应的Java代码**

```java
@Configuration
@ConditionalOnProperty(name = "myapp.feature.enabled", havingValue = "true")
public class FeatureConfig {
    // 配置代码
}
```

## 外部YAML文件

可以使用`@PropertySource`注解加载外部YAML文件, 但是需要自定义一个`PropertySourceFactory`

```java
@Configuration
@PropertySource(value = "classpath:custom.yml", factory = YamlPropertySourceFactory.class)
public class YamlConfig {
    // 配置代码
}
```

## 列表的替代语法

YAML还支持流式语法来表示列表

```YAML
fruits: [apple, banana, orange]
```

## 🌰

下面来看一个栗子, 假设我们有一个电子商务应用, 需要配置数据库, 缓存, 安全设置和一些自定义属性. 这里有一个综合的`application.yml`文件示例

```yaml
# 全局配置
spring:
  application:
    name: ecommerce-app

# 默认配置
defaults: &defaults
  app:
    security:
      jwt-expiration: 3600000
      jwt-secret: ${JWT_SECRET:defaultSecret}

# 开发环境配置
---
spring:
  config:
    activate:
      on-profile: dev
  datasource:
    url: jdbc:mysql://localhost:3306/ecommerce_dev
    username: dev_user
    password: ${DB_PASSWORD}
  cache:
    type: simple

server:
  port: 8080

logging:
  level:
    root: INFO
    com.example.ecommerce: DEBUG

<<: *defaults

app:
  feature-flags:
    new-user-promo: true
  payment-gateway:
    url: https://dev.payment-gateway.com
    api-key: ${PAYMENT_API_KEY}
  product-service:
    cache-ttl: 3600 # 秒
  notification:
    email:
      from: noreply@example.com
      templates:
        - welcome
        - order-confirmation
    sms:
      enabled: false

# 生产环境配置
---
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: jdbc:mysql://${DB_HOST:localhost}:3306/ecommerce_prod
    username: ${DB_USER}
    password: ${DB_PASSWORD}
  cache:
    type: redis
    redis:
      host: ${REDIS_HOST}
      port: 6379

server:
  port: 80

logging:
  level:
    root: WARN
    com.example.ecommerce: INFO

<<: *defaults

app:
  feature-flags:
    new-user-promo: false
  payment-gateway:
    url: https://payment-gateway.com
    api-key: ${PAYMENT_API_KEY}
  product-service:
    cache-ttl: 7200 # 秒
  notification:
    email:
      from: support@example.com
      templates:
        - welcome
        - order-confirmation
        - feedback-request
    sms:
      enabled: true
      provider: twilio
```

解析:

1. 多环境配置(这里配置了开发环境和生产环境)
2. 使用了锚点和引用(<<: \*defaults)
3. 环境变量和默认值(如 ${JWT_SECRET:defaultSecret})
4. 复杂的嵌套结构
5. 使用了列表(如 email templates) 6.使用了条件配置(如 feature flags)
6. 外部化敏感信息(如数据库密码和API密钥)

对应的Java配置类可能如下

```java
@Configuration
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private Security security = new Security();
    private FeatureFlags featureFlags = new FeatureFlags();
    private PaymentGateway paymentGateway = new PaymentGateway();
    private ProductService productService = new ProductService();
    private Notification notification = new Notification();

    // getters and setters

    public static class Security {
        private long jwtExpiration;
        private String jwtSecret;
        // getters and setters
    }

    public static class FeatureFlags {
        private boolean newUserPromo;
        // getters and setters
    }

    public static class PaymentGateway {
        private String url;
        private String apiKey;
        // getters and setters
    }

    public static class ProductService {
        private int cacheTtl;
        // getters and setters
    }

    public static class Notification {
        private Email email = new Email();
        private Sms sms = new Sms();
        // getters and setters

        public static class Email {
            private String from;
            private List<String> templates;
            // getters and setters
        }

        public static class Sms {
            private boolean enabled;
            private String provider;
            // getters and setters
        }
    }
}
```

这个例子展示了如何使用 YAML 来管理复杂的应用配置，包括多环境设置、安全配置、特性开关等。它还展示了如何使用 @ConfigurationProperties 来将这些配置绑定到 Java 对象上。

## 在Java当中使用配置

下面我们结合下上面🌰子来演示下如何在代码当中获取这些配置值

### 使用@Value注解

@Value是最简单的方式, 适合获取单个配置值

```java
@RestController
public class PaymentController {

    @Value("${app.payment-gateway.url}")
    private String paymentGatewayUrl;

    @GetMapping("/payment-url")
    public String getPaymentUrl() {
        return "Payment gateway URL: " + paymentGatewayUrl;
    }
}
```

### 使用@ConfigurationProperties

```java
@Configuration
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private Notification notification;

    // getter and setter for notification

    public static class Notification {
        private Email email;
        private Sms sms;

        // getters and setters

        public static class Email {
            private String from;
            private List<String> templates;

            // getters and setters
        }

        public static class Sms {
            private boolean enabled;
            private String provider;

            // getters and setters
        }
    }
}
```

```java
@Service
public class NotificationService {
    private final AppConfig.Notification notificationConfig;

    public NotificationService(AppConfig appConfig) {
        this.notificationConfig = appConfig.getNotification();
    }

    // ... 其他方法 ...
}
```

### 使用Enviroment对象

对于需要动态访问配置的场景

```java
@Service
public class FeatureFlagService {

    private final Environment env;

    public FeatureFlagService(Environment env) {
        this.env = env;
    }

    public boolean isFeatureEnabled(String featureName) {
        return env.getProperty("app.feature-flags." + featureName, Boolean.class, false);
    }
}
```

### 在配置类中使用

```java
@Configuration
@EnableCaching
public class CacheConfig {

    @Value("${app.product-service.cache-ttl}")
    private int cacheTtl;

    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager() {
            @Override
            protected Cache createConcurrentMapCache(String name) {
                return new ConcurrentMapCache(
                    name,
                    CacheBuilder.newBuilder().expireAfterWrite(cacheTtl, TimeUnit.SECONDS).build().asMap(),
                    false);
            }
        };
    }
}
```

### 在条件注解中使用

```java
@Configuration
@ConditionalOnProperty(name = "app.feature-flags.new-user-promo", havingValue = "true")
public class NewUserPromoConfig {

    @Bean
    public PromoService promoService() {
        return new PromoService();
    }
}
```

### 在测试中使用

```java
@SpringBootTest
@ActiveProfiles("dev")
public class PaymentServiceTest {

    @Autowired
    private Environment env;

    @Test
    public void testPaymentGatewayUrl() {
        String expectedUrl = "https://dev.payment-gateway.com";
        String actualUrl = env.getProperty("app.payment-gateway.url");
        assertEquals(expectedUrl, actualUrl);
    }
}
```

上一节[[YAML/YAML基础语法|YAML基础语法]]
下一节[[YAML/YAML高级指南|YAML高级指南]]