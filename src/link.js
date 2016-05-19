'use strict';
var Seed = require('./seed');
var factory = require('./factory');
class ClassLink extends Seed{
    constructor() {
        super();
        this.VERSION = this.version = '2.0.0a';
    }
    create(_class,_opt,_context){
        return factory.create(_class,_opt,_context);
    }
    destroy(_obj){
        factory.destroy(_obj);
    }
}

//创建全局对象
if(global){//说明是node
    global.Link = new ClassLink();
}else if(window){
    window.Link = new ClassLink();
}


var helloWorld = Link.create(Seed);
console.log(helloWorld);
var subHelloWorld1 = Link.create(Seed,{},helloWorld);
var subHelloWorld2 = Link.create(Seed,{},helloWorld);
Link.destroy(helloWorld);
console.log(subHelloWorld1,subHelloWorld2);
module.exports = Link;