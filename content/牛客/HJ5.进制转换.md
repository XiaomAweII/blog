---
title: 进制转换
tags: 
- 输入处理
- 刷题记录
---

## 题目

![20240920162103](https://xiaoweii.oss-cn-beijing.aliyuncs.com/img/20240920162103.png)

## 解题思路

```java
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
// 注意类名必须为 Main, 不要有任何 package xxx 信息
public class Main {
    private final static int BASE = 16;
    private static Map<Character, Integer> map = new HashMap<>();


    public static void main(String[] args) {
        map.put('0', 0);
        map.put('1', 1);
        map.put('2', 2);
        map.put('3', 3);
        map.put('4', 4);
        map.put('5', 5);
        map.put('6', 6);
        map.put('7', 7);
        map.put('8', 8);
        map.put('9', 9);
        map.put('A', 10);
        map.put('B', 11);
        map.put('C', 12);
        map.put('D', 13);
        map.put('E', 14);
        map.put('F', 15);
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine().substring(2);
        char[] chars = str.toCharArray();
        int result = 0;
        for (int i = 0; i < chars.length; i++) {
            result = result * BASE + map.get(chars[i]);
        }
        System.out.println(result);
    }
}
```
