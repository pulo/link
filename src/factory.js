
'use strict';
 
var Seed = require('./seed');

class Factory extends Seed{
    constructor(){
        super();
        this.objectList = {};
        this.objectList['link_obj_0'] = this;
        this._id = 0;
        this.idIndex = 0;//0转让给工厂自身
        this.newTag('factory');
    }
    create(_class, _classParam, _context){

        if(!_classParam)_classParam = {};

        if(!_class){
            throw new Error('create undefind Class!');
        }else{
            //创建一个实例
            var  _o = new _class(_classParam);
            _o['_id'] = this.idBuild();
            this.objectList['link_obj_' + _o._id] = _o;
            if(_context){
                //告知父节点
                _o.parent=_context;
                //为父节点增加节点
                _context.children.push(_o);
            }
        }
        _o.boot();
        return _o;
    }
    idBuild(){
        this.idIndex++;
        return this.idIndex;
    }
    destroy(_obj){
        
        //步骤1、遍历child，进行销毁
        while (_obj.children.length > 0) {
            Link.destroy(_obj.children[_obj.children.length - 1]);
        }
        // _obj.children.forEach(function(item){
        //     Link.destroy(item);
        // });
        //步骤2、将自己从父元素的children删除
        if (_obj.parent) {
            _obj.breakLink(_obj.parent);
        }
        
        //步骤3、从factory.objectList里删除
        delete this.objectList['link_obj_' + _obj._id];
        
        _obj.destroy();
        global.xxx=this.objectList;
    }
}
module.exports = new Factory();