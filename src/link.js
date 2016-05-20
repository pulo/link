'use strict';
var Seed = require('./seed');
var factory = require('./factory');
class ClassLink extends Seed {
	constructor() {
		super();
		this.VERSION = this.version = '2.0.0a';
		this.Seed = Seed;
	}
	create(_class, _opt, _context) {
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
	destroy(_obj) {
		factory.destroy(_obj);
	}
}

//创建全局对象
if (global) {//说明是node
	global.Link = new ClassLink();
} else if (window) {
	window.Link = new ClassLink();
}