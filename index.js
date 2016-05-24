
require('./src/link');
var util = require('util');
 
//1、建立三层关系
/*
  a1:{
    a11:{
      a111,
      a112
    }
    a12:{
      a121,
      a122
    }
  }
*/
var a1 = Link.create(Link.Seed)
a1.name='a1';
  var a11 = Link.create(Link.Seed,{},a1);
  a11.name='a11';
    var a111 = Link.create(Link.Seed,{},a11);
    a111.name='a111';
    var a112 = Link.create(Link.Seed,{},a11);
    a112.name='a112';
  var a12 = Link.create(Link.Seed,{},a1);
  a12.name='a12';
    var a121 = Link.create(Link.Seed,{},a12);
    a121.name='a121';
    var a122 = Link.create(Link.Seed,{},a12);
    a122.name='a122';

//打印关系表

  var rel = Link.getObjectRelation();
  console.log(rel);
    
    
  Link.destroy(a11);

//2、测试断掉A2,然后看A1和A111的关系

console.info(util.inspect(a1,true,null), util.inspect(a111,true,null));

//查找某个节点
var list=Link.find('factory');
console.log(list);
