/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	import Seed from './seed';
	import factory from './factory';
	
	class ClassLink extends Seed {
		constructor() {
			super();
			this.VERSION = this.version = '1.0.2';
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
							children:[],
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

/***/ }
/******/ ]);