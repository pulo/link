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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Seed = __webpack_require__(1);
	var factory = __webpack_require__(2);

	var ClassLink = function (_Seed) {
		_inherits(ClassLink, _Seed);

		function ClassLink() {
			_classCallCheck(this, ClassLink);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ClassLink).call(this));

			_this.VERSION = _this.version = '1.0.2';
			_this.Seed = Seed;
			return _this;
		}

		_createClass(ClassLink, [{
			key: 'create',
			value: function create(_class, _opt, _context) {

				if (arguments.length == 2 && _opt._id) {
					_context = _opt;
					_opt = {};
				}

				return factory.create(_class, _opt, _context);
			}
		}, {
			key: 'find',
			value: function find(tag) {
				var selObj = [];
				for (var index in factory.objectList) {
					if (factory.objectList[index].hasTag(tag)) {
						selObj.push(factory.objectList[index]);
					}
				}
				return selObj;
			}
		}, {
			key: 'getObjectList',
			value: function getObjectList() {
				return factory.objectList;
			}

			//获取所有对象的关系，返回一个对象形态

		}, {
			key: 'getObjectRelation',
			value: function getObjectRelation() {
				var _relation = {};
				_relation['root'] = [];
				//思路:遍历所有根对象，并且对根对象的children进行遍历，直到无children
				//步骤1：找出根对象
				for (var index in factory.objectList) {
					//不是factory & 无parent
					if (factory.objectList[index]._id !== 0 && factory.objectList[index].parent === undefined) {
						(function () {
							//将跟对象丢进root里
							//步骤2：遍历children
							var check = function check(_obj, addTo) {
								var _r = {
									id: _obj._id,
									tags: _obj.tags,
									children: []
								};
								addTo.push(_r);
								_obj.children.forEach(function (elem) {
									check(elem, _r.children);
								});
							};
							check(factory.objectList[index], _relation['root']);
						})();
					}
				}
				return _relation;
			}
		}, {
			key: 'destroy',
			value: function destroy(_obj) {
				factory.destroy(_obj);
			}
		}]);

		return ClassLink;
	}(Seed);

	//创建全局对象


	if (global) {
		//说明是node
		if (!global.Link) global.Link = new ClassLink();
	} else if (window) {
		if (!window.Link) window.Link = new ClassLink();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Seed = function () {
	    function Seed() {
	        _classCallCheck(this, Seed);

	        this.tags = [];
	        this.children = [];
	        this.parent = undefined;
	        this.newTag('seed');
	    }

	    _createClass(Seed, [{
	        key: 'boot',
	        value: function boot() {}
	    }, {
	        key: 'newTag',
	        value: function newTag(tag) {
	            var isExist = false;
	            this.tags.find(function (item) {
	                if (item === tag) {
	                    isExist = true;
	                }
	            });
	            if (!isExist) this.tags.push(tag);
	        }
	    }, {
	        key: 'hasTag',
	        value: function hasTag(tag) {
	            var _has = false;
	            this.tags.find(function (item) {
	                if (item === tag) {
	                    _has = true;
	                }
	            });
	            return _has;
	        }
	        /*
	        中断一个父子对象的关系，一旦中断，双向都中断,
	        注意 中断并非销毁，
	        */

	    }, {
	        key: 'breakLink',
	        value: function breakLink(_obj) {
	            var _this = this;

	            //先判断子对象
	            this.children.forEach(function (element, index) {
	                if (element == _obj) {
	                    _this.children.splice(index, 1);
	                    element.parent = undefined;
	                }
	            });
	            //再判断父对象
	            //检测该对象是否为父对象，如果是父对象，也可中断
	            if (this.parent == _obj) {
	                this.parent = undefined;
	                _obj.breakLink(this);
	            }
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            var _this2 = this;

	            Object.getOwnPropertyNames(this).forEach(function (index) {
	                delete _this2[index];
	            });
	        }
	    }]);

	    return Seed;
	}();

	module.exports = Seed;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Seed = __webpack_require__(1);

	var Factory = function (_Seed) {
	    _inherits(Factory, _Seed);

	    function Factory() {
	        _classCallCheck(this, Factory);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Factory).call(this));

	        _this.objectList = {};
	        _this.objectList['link_obj_0'] = _this;
	        _this._id = 0;
	        _this.idIndex = 0; //0转让给工厂自身
	        _this.newTag('factory');
	        return _this;
	    }

	    _createClass(Factory, [{
	        key: 'create',
	        value: function create(_class, _classParam, _context) {

	            if (!_classParam) _classParam = {};

	            if (!_class) {
	                throw new Error('create undefind Class!');
	            } else {
	                //创建一个实例
	                var _o = new _class(_classParam);
	                _o['_id'] = this.idBuild();
	                this.objectList['link_obj_' + _o._id] = _o;
	                if (_context) {
	                    //告知父节点
	                    _o.parent = _context;
	                    //为父节点增加节点
	                    _context.children.push(_o);
	                }
	                _o.create_time_stamp = new Date().getTime();
	                _o.boot();
	            }
	            return _o;
	        }
	    }, {
	        key: 'idBuild',
	        value: function idBuild() {
	            this.idIndex++;
	            return this.idIndex;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy(_obj) {

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
	    }]);

	    return Factory;
	}(Seed);

	module.exports = new Factory();

/***/ }
/******/ ]);