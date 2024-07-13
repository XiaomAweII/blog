---
tags:
  - java
  - extends
---


## 面向对象


xxx


![[继承]]

> [!warnning]
> adkfjadflkj
> > [!todo]- yes 
> > adfih


```mermaid
---
title: Animal example
---
classDiagram
    note "From Duck till Zebra"
    Animal <|-- Duck
    note for Duck "can fly\ncan swim\ncan dive\ncan help in debugging"
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat()
    }
    class Zebra{
        +bool is_wild
        +run()
    }

```


```mermaid
flowchart TD
id[a] --> name[b]
```

<span style="background-color:red">hello world</span>


==jlak==

