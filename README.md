


## 简介——intro

## 使用
### browse
引用build/link.js



### node
`npm install js-link --save`

require('js-link')


# 方法——api 

## Link
提供Link应用的接口服务，如创建、删除、继承等功能。同时也是唯一window下的全局对象。

#### create
```
Link.create(Class,[param],[context])
@param Class 所要实例化的父类
@param param 实例对象的入参
@param context 所实例对象的父对象
```
创建一个对象，所创建的对象会和context对象建立父子关系，单例对象除外

> 对于非LINK的类，也可以通过Link.create创建了，同new Class(param)


#### destroy
```
Link.destroy(obj)
@param obj 所要销毁的对象
```
销毁一个对象

> 请使用Link.destroy(obj)来销毁对象，不要使用obj.destroy()来销毁，否则会导致应用该对象的其他对象关系错误


#### find
```
Link.find(tag)
@param tag 标签名
return array
```
根据tag搜索拥有该tag的对象


#### getObjectList
```
Link.getObjectList()
```
获取当前活动的所有对象列表

### getObjectRelation

获取所有Link对象的关系树

## Link.Seed
基类

```javascript
var YouClass = Link.Seed.extend({
    constrator:function(_opt){
        super(_opt);
    },
    boot:function(){
        super();
        this.hello();
    },
    hello:function(){//私有方法
        console.log('hello')
    },
    destroy:function(){
        super();
    }
})
```
> *关于boot：*

> 对象通过工厂创造到完成，由几个过程组成：`检测类是否为单例 --> 创造对象--> 打上工厂id --> [任何可能穿插的流程]--> 启动boot--> 出厂`，如果我在init里需要用到工厂id,在那个阶段必然会出错，因为init时还没完成new的过程，自然还没有工厂id，因此就有了boot的概念。

> 所以我们建议将一些启动阶段要做的事情放在boot里，如创建子对象、绑定事件等，而init里仅放一些配置信息即可。


#### parent
```
object.parent
```
获取该对象的父对象
> 注意：单例对象不会成为子对象

#### children
```
object.children
```
获取该对象的子对象 返回数组形态
[subObj1,subObj2,subObj3]

### on
```
object.on('event',function(data){
    //do thing
})
```
增加事件响应

### emit
```
object.emit('event'[,param1,param2,...])
```
增加emit事件

#### newTag
```
object.newTag(tag)
@param tag  新打的标签
ex:
object.newTag('aaa');
object.newTag('aaa bbb');
```
为该对象或类打上新的标签，添加多个标签请用空格分割

#### hasTag
```
object.hasTag(tag)
@param tag  标签
```
查看该对象是否含有改标签

#### tags
```
object.tags
```
查看该对象有哪些标签 返回数组

#### _id
```
object._id
```
查看该对象出厂时的唯一id


### history

1.0.4

16-08-24 不再进行babel转换，统一由使用方进行管理，否则babel转换后无法再进行extend等写法