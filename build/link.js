/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	var Seed = __webpack_require__(1);
	var factory = __webpack_require__(2);
	class ClassLink extends Seed {
		constructor() {
			super();
			this.VERSION = this.version = '2.0.0a';
			this.Seed = Seed;
		}
		create(_class, _opt, _context) {
			
			if((arguments.length==2)&&(_opt._id)){
						_context = _opt;
					_opt = {};
			}
			
			return factory.create(_class, _opt, _context);
		}
		find(tag) {
			let selObj = [];
			for (let index in factory.objectList) {
				if (factory.objectList[index].hasTag(tag)) {
					selObj.push(factory.objectList[index]);
				}
			}
			return selObj;
		}
		getObjectList() {
			return factory.objectList;
		}
		

		//获取所有对象的关系，返回一个对象形态
		getObjectRelation(){
			let _relation = {};
			_relation['root'] = [];
			//思路:遍历所有根对象，并且对根对象的children进行遍历，直到无children
			//步骤1：找出根对象
			for(let index in factory.objectList){
				//不是factory & 无parent
				if((factory.objectList[index]._id !== 0) && (factory.objectList[index].parent === undefined)){
					//将跟对象丢进root里
					//步骤2：遍历children
					let check = function(_obj,addTo){
						let _r = {
							id:_obj._id,
							tags:_obj.tags,
							children:[]
						}
						addTo.push(_r);
						_obj.children.forEach(function(elem){
							check(elem, _r.children);
						})
					}
					check(factory.objectList[index], _relation['root']);
				}
			}
			return _relation;
			
		}
		destroy(_obj) {
			factory.destroy(_obj);
		}
	}

	//创建全局对象
	if (global) {//说明是node
		if(!global.Link)global.Link = new ClassLink();
	} else if (window) {
		if(!window.Link)window.Link = new ClassLink();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	class Seed{
	    constructor() {
	        this.tags = [];
	        this.children = [];
	        this.parent = undefined;
	        this.newTag('seed');
	    }
	    boot(){
	        
	    }
	    newTag(tag){
	        let isExist = false;
	        this.tags.find( (item)=>{
	            if(item === tag){
	                isExist = true;
	            }
	        });
	        if(!isExist)this.tags.push(tag);
	    }
	    hasTag(tag){
	        let _has = false;
	        this.tags.find( (item)=>{
	            if(item === tag){
	                _has = true;
	            }
	        });
	        return _has;
	    }
	    /*
	    中断一个父子对象的关系，一旦中断，双向都中断,
	    注意 中断并非销毁，
	    */
	    breakLink(_obj){
	        //先判断子对象
	        this.children.forEach((element, index)=>{
	            if (element == _obj) {
	                this.children.splice(index, 1);
	                element.parent = undefined;
	            }
	        })
	        //再判断父对象
	        //检测该对象是否为父对象，如果是父对象，也可中断
	        if (this.parent == _obj) {
	            this.parent = undefined;
	            _obj.breakLink(this);
	        }
	    }
	    destroy(){
	        Object.getOwnPropertyNames(this).forEach((index)=>{
	            delete this[index];
	        })
	    }
	}
	module.exports = Seed;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';
	 
	var Seed = __webpack_require__(1);

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
	    }
	}
	module.exports = new Factory();

/***/ }
/******/ ]);