# Mybatis练习

## 首先配置数据库

### 代码部分

**数据库part**

```sql
CREATE TABLE teacher (
    id INT NOT NULL AUTO_INCREMENT COMMENT '教师ID',
    name VARCHAR(50) NOT NULL COMMENT '姓名',
    gender VARCHAR(10) NOT NULL COMMENT '性别',
    age INT NOT NULL COMMENT '年龄',
    subject VARCHAR(100) NOT NULL COMMENT '教学科目',
    phone_number VARCHAR(20) NOT NULL COMMENT '电话号码',
    address VARCHAR(200) NOT NULL COMMENT '家庭地址',
    PRIMARY KEY (id)
);

INSERT INTO teacher (name, gender, age, subject, phone_number, address) VALUES 
('张雪峰', '男', 45, '英语', '13800000001', '北京市海淀区XX街道XX号'),
('王江涛', '男', 40, '英语', '13800000002', '北京市东城区XX街道XX号'),
('徐子越', '男', 38, '数学', '13800000003', '上海市浦东新区XX街道XX号'),
('李宁', '女', 37, '政治', '13800000004', '广州市天河区XX街道XX号'),
('刘晓敏', '女', 42, '历史', '13800000005', '深圳市福田区XX街道XX号'),
('陈浩', '男', 39, '计算机', '13800000006', '武汉市武昌区XX街道XX号'),
('王芳', '女', 36, '数学', '13800000007', '南京市玄武区XX街道XX号'),
('李波', '男', 41, '物理', '13800000008', '重庆市渝中区XX街道XX号'),
('赵丽', '女', 43, '化学', '13800000009', '成都市锦江区XX街道XX号'),
('孙强', '男', 44, '地理', '13800000010', '杭州市西湖区XX街道XX号'),
('杨柳', '女', 39, '英语', '13800000011', '长沙市岳麓区XX街道XX号'),
('周峰', '男', 37, '计算机', '13800000012', '西安市碑林区XX街道XX号'),
('吴刚', '男', 35, '物理', '13800000013', '济南市历下区XX街道XX号'),
('马丽', '女', 40, '化学', '13800000014', '郑州市金水区XX街道XX号'),
('陈健', '男', 42, '历史', '13800000015', '哈尔滨市南岗区XX街道XX号'),
('张燕', '女', 36, '生物', '13800000016', '苏州市姑苏区XX街道XX号'),
('刘强', '男', 38, '地理', '13800000017', '沈阳市和平区XX街道XX号'),
('赵英', '女', 41, '政治', '13800000018', '昆明市五华区XX街道XX号'),
('吴丽', '女', 43, '英语', '13800000019', '福州市鼓楼区XX街道XX号'),
('李强', '男', 45, '数学', '13800000020', '厦门市思明区XX街道XX号'),
('陈伟', '男', 37, '物理', '13800000021', '南宁市青秀区XX街道XX号'),
('周红', '女', 39, '化学', '13800000022', '贵阳市南明区XX街道XX号'),
('王伟', '男', 42, '生物', '13800000023', '合肥市庐阳区XX街道XX号'),
('刘鹏', '男', 44, '历史', '13800000024', '石家庄市长安区XX街道XX号'),
('张婷', '女', 36, '地理', '13800000025', '长春市朝阳区XX街道XX号'),
('李敏', '女', 38, '政治', '13800000026', '南昌市东湖区XX街道XX号'),
('赵健', '男', 40, '英语', '13800000027', '太原市迎泽区XX街道XX号'),
('马强', '男', 41, '数学', '13800000028', '兰州市城关区XX街道XX号'),
('杨静', '女', 43, '化学', '13800000029', '呼和浩特市新城区XX街道XX号'),
('周静', '女', 45, '物理', '13800000030', '乌鲁木齐市天山区XX街道XX号');
```

### 运行结果

![image-20240820192842267](assets/image-20240820192842267-4153322.png)

## 配置maven依赖

### pom.xml的maven配置

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.xiaoweii</groupId>
    <artifactId>mybatis</artifactId>
    <packaging>war</packaging>
    <version>1.0-SNAPSHOT</version>
    <name>mybatis Maven Webapp</name>
    <url>http://maven.apache.org</url>
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>3.8.1</version>
            <scope>test</scope>
        </dependency>
        <!--    mybatis框架的依赖-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.9</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.28</version>
        </dependency>
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.34</version>
        </dependency>
        <dependency>
            <groupId>com.github.pagehelper</groupId>
            <artifactId>pagehelper</artifactId>
            <version>6.1.0</version>
        </dependency>

    </dependencies>
    <build>
        <finalName>mybatis</finalName>
    </build>
</project>

```

注:配置完依赖一定要刷新查看依赖是否添加成功

### 运行结果

![image-20240820193334434](assets/image-20240820193334434-4153614.png)

## 全局配置

### 配置四个数据库资源属性

```properties
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/test?serverTimezone=Asia/Shanghai
jdbc.username=root
jdbc.password=20020222
```

### 全局的mybatis-config配置

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTDConfig3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<!--    配置数据库-->
<configuration>

    <!--1. 自定义属性-->
    <properties resource="db.properties"/>
    <!--2. 全局设置-->
    <settings>
        <!--通过lgo4j打印mybatis日志-->
        <setting name="logImpl" value="LOG4J"/>

    </settings>
    <!--3. 别名-->
    <typeAliases>
        <!--        <typeAlias type="com.xiaoweii.domain.User" alias="user"/>-->
        <package name="com.xiaoweii.domain"/>
    </typeAliases>
    <!--4.typeHandlers-->
    <!--    <typeHandlers/>-->
    <!--5.objectFactory-->
    <!--    <objectFactory type=""/>-->
    <!--6.plugins插件-->
    <!--配置pagehelper-->
    <plugins>
        <!--配置分页插件-->
        <plugin interceptor="com.github.pagehelper.PageInterceptor">
            <!--方言 配置是mysql方言-->
            <property name="helperDialect" value="mysql"/>
        </plugin>
    </plugins>


    <!--7.配置数据库环境-->
    <environments default="mybatisTest">
        <!--        数据库连接信息-->
        <environment id="mybatisTest">
            <!--            配置事务管理器:JDBC-->
            <transactionManager type="JDBC"/>
            <!--            数据库连接信息:type=POOLED 采用数据库连接池-->
            <dataSource type="POOLED">
                <!--                数据库连接驱动-->
                <property name="driver" value="${jdbc.driver}"/>
                <!--                url-->
                <property name="url" value="${jdbc.url}"/>
                <!--                用户名-->
                <property name="username" value="${jdbc.username}"/>
                <!--                密码-->
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>

    <!--8.加载映射文件-->
    <mappers>
        <mapper resource="mapper/TeacherMapper.xml"/>
    </mappers>


</configuration>
```

## 定义mybatis工具类

```java
package com.xiaoweii.util;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class MybatisUtil {

    private static SqlSessionFactory sqlSessionFactory;

    static {
        //1. 读取mybatis的核心配置文件
        InputStream is = null;
        try {
            is = Resources.getResourceAsStream("mybatis-config.xml");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        //2.创建sqlSessionFactoryBuilder构造器
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        // 3.构建一个sqlSessionFactory
        sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
    }

    //获取会话的方法
    public static SqlSession getSqlSession() {
        //4.创建一个会话(获取一个数据连接)
        return sqlSessionFactory.openSession();
    }

    //关闭会话的方法
    public static void closeSqlSession(SqlSession sqlSession) {
        //5.关闭会话
        sqlSession.commit();
        sqlSession.close();
    }
}

```



## 实体类

**Teacher**

```java
package com.xiaoweii.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Teacher {
    private Integer id;
    private String name;
    private String sex;//这里故意跟数据库中的gender列保持不一致,用于映射
    private Integer age;
    private String subject;
    private String phoneNumber;//数据库的该字段为phone_number,为了测试驼峰映射
    private String address;

    //不带id的构造器只能自己生成
    public Teacher(String name, String sex, Integer age, String subject, String phoneNumber, String address) {
        this.name = name;
        this.sex = sex;
        this.age = age;
        this.subject = subject;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}

```

**AgeScope**

```java
package com.xiaoweii.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgeScope {
    private int minAge;
    private int maxAge;
}

```



## 接口

> 昨天练习过基本查询,以及模糊查询,所以基本的查询简单回顾一下,因为类似模糊查询就有n多种写法,主要练习的是**范围查询**,**动态查询**,**多条件查询**以及**分页**

### 定义接口文件

定义接口文件,今天练习的任务有哪些

```java
package com.xiaoweii.mapper;


import com.xiaoweii.domain.Age;
import com.xiaoweii.domain.AgeScope;
import com.xiaoweii.domain.Teacher;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface TeacherMapper {
    //基本增删改查
    int addTeacher(Teacher teacher);//添加老师信息
    int deleteTeacher(int id);//删除老师信息
    int updateTeacher(Teacher teacher);//修改老师信息

    Teacher getTeacherById(int id);//根据id查询老师信息
    List<Teacher> getAllTeachers();//查询所有老师信息

    //模糊查询
    List<Teacher> getTeacherByLastName(String lastName);//根据姓查询老师信息

    //范围查询--根据年龄范围查询老师信息
    List<Teacher> getTeacherByAgeScope1(int min, int max);
    List<Teacher> getTeacherByAgeScope2(AgeScope ageScope);
    List<Teacher> getTeacherByAgeScope3(Map ageScope);
    List<Teacher> getTeacherByAgeScope4(@Param("min") int min, @Param("max") int max);

    //分页方法
    List<Teacher> getTeacherByPage();

    //动态sql
    List<Teacher> getTeacherByConditions(Teacher teacher);//多条件查询
    int updateTeacherByConditions(Teacher teacher);//多条件修改
    int deleteTeacherByConditions(Teacher teacher);//多条件删除
    List<Teacher> getTeacherByConditions2(Teacher teacher);//动态多条件查询

}

```

## 配置映射文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.xiaoweii.mapper.TeacherMapper">
    <!--映射-->
    <resultMap id="teacherMap" type="teacher">
        <id column="id" property="id"/>
        <result column="name" property="name"/>
        <result column="gender" property="sex"/>
        <result column="age" property="age"/>
        <result column="subject" property="subject"/>
        <result column="phone_number" property="phoneNumber"/>
        <result column="address" property="address"/>
    </resultMap>

    <!--sql片段-->
    <sql id="teacher_select">
        select *
        from teacher
    </sql>

    <!--开启获取自增的主键-->
    <insert id="addTeacher" parameterType="teacher" useGeneratedKeys="true" keyProperty="id">
        insert into teacher
        values (null, #{name}, #{sex}, #{age}, #{subject}, #{phoneNumber}, #{address})
    </insert>

    <delete id="deleteTeacher" parameterType="int">
        delete
        from teacher
        where id = #{id}
    </delete>

    <update id="updateTeacher" parameterType="teacher">
        update teacher
        set name         = #{name},
            gender       = #{sex},
            age          = #{age},
            subject      = #{subject},
            phone_number = #{phoneNumber},
            address      = #{address}
        where id = #{id}
    </update>

    <select id="getTeacherById" resultMap="teacherMap" parameterType="int">
        <include refid="teacher_select"/>
        where id = #{id}
    </select>

    <select id="getAllTeachers" resultMap="teacherMap">
        <include refid="teacher_select"/>
    </select>

    <select id="getTeacherByLastName" resultMap="teacherMap" parameterType="string">
        <include refid="teacher_select"/>
        where name like concat(#{name}, '%')
    </select>

    <select id="getTeacherByAgeScope1" resultMap="teacherMap">
        <include refid="teacher_select"/>
        where age between #{param1} and #{param2}
    </select>

    <select id="getTeacherByAgeScope2" resultMap="teacherMap">
        <include refid="teacher_select"/>
        where age between #{minAge} and #{maxAge}
    </select>

    <select id="getTeacherByAgeScope3" resultMap="teacherMap">
        <include refid="teacher_select"/>
        where age between #{agemap1} and #{agemap2}
    </select>

    <select id="getTeacherByAgeScope4" resultMap="teacherMap">
        <include refid="teacher_select"/>
        where age between #{min} and #{max}
    </select>

    <select id="getTeacherByPage" resultMap="teacherMap">
        <include refid="teacher_select"/>
    </select>

    <select id="getTeacherByConditions" resultMap="teacherMap" parameterType="teacher">
        <include refid="teacher_select"/>
        <where>
            <if test="id!=null">id=#{id}</if>
            <if test="name!=null and name!=''">and name=#{name}</if>
            <if test="age!=null">and age=#{age}</if>
            <if test="sex!=null and sex!=''">and gender=#{sex}</if>
            <if test="subject!=null and subject!=''">and subject=#{subject}</if>
            <if test="phoneNumber!=null and phoneNumber!=''">and phone_number=#{phoneNumber}</if>
            <if test="address!=null and address!=''">and address=#{address}</if>
        </where>
    </select>

    <update id="updateTeacherByConditions" parameterType="teacher">
        update teacher
        <set>
            <if test="name!=null and name!=''">name=#{name},</if>
            <if test="sex!=null and sex!=''">gender=#{sex},</if>
            <if test="age!=null">age=#{age},</if>
            <if test="subject!=null and subject!=''">subject=#{subject},</if>
            <if test="phoneNumber!=null and phoneNumber!=''">phone_number=#{phoneNumber},</if>
            <if test="address!=null and address!=''">address=#{address}</if>
        </set>
        where id = #{id}
    </update>

    <delete id="deleteTeacherByConditions" parameterType="list">
        delete from teacher
        where id in
        <foreach collection="ids" item="item" index="index" open="(" separator="," close=")">
            #{item}
        </foreach>
    </delete>

    <select id="getTeacherByConditions2" resultMap="teacherMap" parameterType="teacher">
        <include refid="teacher_select"/>
        <where>
            <choose>
                <when test="id!=null">id=#{id}</when>
                <when test="name!=null and name!=''">name=#{name}</when>
                <when test="age!=null">and age=#{age}</when>
                <when test="sex!=null and sex!=''">gender=#{sex}</when>
                <when test="subject!=null and subject!=''">subject=#{subject}</when>
                <when test="phoneNumber!=null and phoneNumber!=''">phone_number=#{phoneNumber}</when>
                <when test="address!=null and address!=''">address=#{address}</when>
                <otherwise>1=1</otherwise>
            </choose>
        </where>
    </select>


</mapper>
```

## 测试

### 编写单元测试

```java
package com.xiaoweii.mapper;

import com.github.pagehelper.PageHelper;
import com.xiaoweii.domain.AgeScope;
import com.xiaoweii.domain.Teacher;
import com.xiaoweii.util.MybatisUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.*;

public class TeacherMapperTest {
    private static TeacherMapper teacherMapper;
    private static SqlSession sqlSession;

    @BeforeClass
    public static void setUpBeforeClass() throws Exception {
        sqlSession = MybatisUtil.getSqlSession();
        teacherMapper = sqlSession.getMapper(TeacherMapper.class);
    }
    
    @AfterClass
    public static void tearDownAfterClass() throws Exception {
        MybatisUtil.closeSqlSession(sqlSession);
    }

    @Test
    public void TestAddTeacher() {
        Teacher teacher=new Teacher("xiaowei", "帅哥",22,"java全栈","12345678901", "翻斗大街翻斗花园翻斗666栋6楼6606号");
        int row = teacherMapper.addTeacher(teacher);
        System.out.println("受影响行数：" + row);
    }

    @Test
    public void TestDeleteTeacher() {
        int row = teacherMapper.deleteTeacher(1);
        System.out.println("受影响行数：" + row);
    }

    @Test
    public void TestUpdateTeacher() {
        Teacher teacher=new Teacher(1,"xiaowei", "帅哥",22,"java全栈","12345678901", "翻斗大街翻斗花园翻斗666栋6楼6606号");
        int row = teacherMapper.updateTeacher(teacher);
        System.out.println("受影响行数：" + row);
    }

    @Test
    public void TestGetTeacherById() {
        Teacher teacher = teacherMapper.getTeacherById(1);
        System.out.println("查询结果：" + teacher);
    }

    @Test
    public void TestGetAllTeachers() {
        List<Teacher> teachers = teacherMapper.getAllTeachers();
        for (Teacher teacher : teachers) {
            System.out.println(teacher);
        }
    }

    @Test
    public void TestGetTeacherByLastName() {
        List<Teacher> teachers = teacherMapper.getTeacherByLastName("张");
        for (Teacher teacher : teachers) {
            System.out.println(teacher);
        }
    }

    @Test
    public void TestGetTeacherByAgeScope1() {
        List<Teacher> teachers = teacherMapper.getTeacherByAgeScope1(30, 50);
        for (Teacher teacher : teachers) {
            System.out.println(teacher);
        }
    }

    @Test
    public void TestGetTeacherByAgeScope2() {
        AgeScope ageScope = new AgeScope();
        ageScope.setMinAge(45);
        ageScope.setMaxAge(50);
        List<Teacher> teachers = teacherMapper.getTeacherByAgeScope2(ageScope);
        for (Teacher teacher : teachers) {
            System.out.println(teacher);
        }
    }

    @Test
    public void TestGetTeacherByAgeScope3() {
        Map map = new HashMap();
        map.put("agemap1", 40);
        map.put("agemap2", 45);
        List<Teacher> teachers = teacherMapper.getTeacherByAgeScope3(map);
        for (Teacher teacher : teachers) {
            System.out.println(teacher);
        }
    }

    @Test
    public void TestGetTeacherByAgeScope4() {
        List<Teacher> teachers = teacherMapper.getTeacherByAgeScope4(35,40);
        for (Teacher teacher : teachers) {
            System.out.println(teacher);
        }
    }

    @Test
    public void TestGetTeacherByPage() {
        PageHelper.startPage(1, 5);
        List<Teacher> teachers = teacherMapper.getTeacherByPage();
        for (Teacher teacher : teachers) {
            System.out.println(teacher);
        }
    }

    @Test
    public void TestGetTeacherByConditions() {
        Teacher teacher = new Teacher();
        teacher.setSex("女");
        teacher.setSubject("历史");
        List<Teacher> teachers = teacherMapper.getTeacherByConditions(teacher);
        for (Teacher t : teachers) {
            System.out.println(t);
        }

    }

    @Test
    public void TestUpdateTeacherByConditions() {
        Teacher teacher = new Teacher();
        teacher.setId(10);
        teacher.setSex("女");
        teacher.setSubject("历史");
        int row = teacherMapper.updateTeacherByConditions(teacher);
        System.out.println("受影响行数：" + row);
    }

    @Test
    public void TestDeleteTeacherByConditions() {
        List list = new ArrayList();
        list.add(1);
        list.add(2);
        int row = teacherMapper.deleteTeacherByConditions(list);
        System.out.println("受影响行数：" + row);
    }

    @Test
    public void TestGetTeacherByConditions2() {
        Teacher teacher = new Teacher();
        teacher.setSex("女");
        teacher.setSubject("历史");
        List<Teacher> teachers = teacherMapper.getTeacherByConditions2(teacher);
        for (Teacher t : teachers) {
            System.out.println(t);
        }
    }
}
```

### 运行截图

**建议别看**

![image-20240820212338455](assets/image-20240820212338455-4160218.png)

![image-20240820212354760](assets/image-20240820212354760-4160234.png)

![image-20240820212428854](assets/image-20240820212428854-4160268.png)

![image-20240820212439471](assets/image-20240820212439471-4160279.png)

![image-20240820212451997](assets/image-20240820212451997-4160292.png)

![image-20240820212524016](assets/image-20240820212524016-4160324.png)

![image-20240820212534228](assets/image-20240820212534228-4160334.png)

![image-20240820212544853](assets/image-20240820212544853-4160344.png)

![image-20240820212629933](assets/image-20240820212629933-4160390.png)

![image-20240820212639755](assets/image-20240820212639755-4160399.png)

![image-20240820212652642](assets/image-20240820212652642-4160412.png)

![image-20240820212703058](assets/image-20240820212703058-4160423.png)

![image-20240820212712161](assets/image-20240820212712161-4160432.png)

![image-20240820212721990](assets/image-20240820212721990-4160442.png)

![image-20240820213027335](assets/image-20240820213027335-4160627.png)