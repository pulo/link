

## 简介——intro
当我们开发普通网页时，我们可能更习惯于先开发HTML，再在这些HTML的基础上追加各种JS、组件、交互，最后将HTML交给后台去完成开发。但这种开发模式是无法满足富应用级别的网站或模块的，他会带来几个核心问题：

+ 页面臃肿——如果将所有用户可能行为的依赖都存放在页面里，那必然会导致页面庞大。

+ 维护困难——传统页面的HTML由后台输出，后期的维护都得通过后台进行修改。

+ 复杂的页面嵌套关系——一个页面内嵌几十层DIV，这种代码即使是你写的~请问你能马上看懂吗？万一哪个DIV未关闭，排查问题还得大半天~

正因为如此，我们是否可以转变下开发思路，让HTML不再是页面的核心，让JS不再为HTML工作；真正做到由JS驱动，而HTML仅仅是整个JS应用的呈现部分。

LINK框架就是这样一套由JS主导的模块化开发框架，在这里需要做的就是按你的设计思路把模块分割好，再将这些模块如同搭积木一样组装起来。而内容、样式、交互等等都由模块各自维护及管理，结合一些周边功能，轻松就能搭建出一套复杂的应用级网站。通过它，你会发现你的代码比过去更清晰、更优美，更方便维护。LINK，它可以解放您的思想，让你的代码成为一种艺术。




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

## Link.Seed
基类，应用所有的类继承于SEED，它提供了一些核心的方法及功能，而SEED本身基于lofty的Base类，关于Base类所提供的功能，您可以去[这里](http://loftyjs.com/fdevlib/#fui.basicjs.base)

```javascript
var YouClass = Link.Seed.extend({
    singleton:false,/*是否是单例*/
    init:function(_opt){
        this._super(_opt,this,arguments);
    },
    boot:function(){
        this._super(this,arguments);
        this._privateHello();
    },
    _privateHello:function(){//私有方法
        console.log('hello')
    },
    destroy:function(){
        this._super(this,arguments);
    }
})
```
> *关于init和boot的区别及使用：*

> 对象通过工厂创造到完成，由几个过程组成：`检测类是否为单例 --> 创造对象--> 打上工厂id --> [任何可能穿插的流程]--> 启动boot--> 出厂`，如果我在init里需要用到工厂id,在那个阶段必然会出错，因为init时还没完成new的过程，自然还没有工厂id，因此就有了boot的概念。

> 所以我们建议将一些启动阶段要做的事情放在boot里，如创建子对象、绑定事件等，而init里仅放一些配置信息即可。

> *关于私有方法的定义*

> 我们提供一种约定式的方法来限定了私有变量的使用，您只要使用 _privateYouFuncName 来对你的定义进行开头(如_privateFunc,_privateProp)，便可定位私有方法或属性


调用父类的同名方法

#### subscribe
```
object.subscribe(channel,function)
@param channel 所订阅的频道
@param function  回调
```
订阅某个[广播通知](#link-radio)

#### unSubscribe
```
object.unSubscribe(channel)
@param channel 所订阅的频道
```
取消该对象对某个广播通知的订阅

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
