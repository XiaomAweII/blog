---
title: 明明的随机数
tags:
  - 快速排序
---

## 题目

![20240920163109](https://xiaoweii.oss-cn-beijing.aliyuncs.com/img/20240920163109.png)
![20240920163132](https://xiaoweii.oss-cn-beijing.aliyuncs.com/img/20240920163132.png)

## 解题思路

第一种方法:感觉写的是错误的,因为并没有涉及到快排

```java
import java.util.*;

// 注意类名必须为 Main, 不要有任何 package xxx 信息
public class Main {
    public static void main(String[] args) {
        //声明输入
        Scanner sc = new Scanner(System.in);
        //先输入随机整数的个数
        int count = sc.nextInt();

        HashSet<Integer> set = new HashSet<>();

        //依次输入
        for (int i = 0; i < count; i++) {
            int val = sc.nextInt();
            set.add(val);
        }


        Object[] objects = set.toArray();
        
        Arrays.sort(objects);
        
        for (Object i : objects) {
            System.out.println(i);
        }
    }
}
```