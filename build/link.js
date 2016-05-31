!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="/assets",t(0)}([function(e,t,n){(function(e){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(1),c=t(a),f=n(2),l=t(f),s=function(e){function t(){r(this,t);var e=i(this,Object.getPrototypeOf(t).call(this));return e.VERSION=e.version="1.0.2",e.Seed=c["default"],e}return o(t,e),u(t,[{key:"create",value:function(e,t,n){return 2==arguments.length&&t._id&&(n=t,t={}),l["default"].create(e,t,n)}},{key:"find",value:function(e){var t=[];for(var n in l["default"].objectList)l["default"].objectList[n].hasTag(e)&&t.push(l["default"].objectList[n]);return t}},{key:"getObjectList",value:function(){return l["default"].objectList}},{key:"getObjectRelation",value:function(){var e={};e.root=[];for(var t in l["default"].objectList)0!==l["default"].objectList[t]._id&&void 0===l["default"].objectList[t].parent&&!function(){var n=function r(e,t){var n={id:e._id,tags:e.tags,children:[]};t.push(n),e.children.forEach(function(e){r(e,n.children)})};n(l["default"].objectList[t],e.root)}();return e}},{key:"destroy",value:function(e){l["default"].destroy(e)}}]),t}(c["default"]);e?e.Link||(e.Link=new s):window&&(window.Link||(window.Link=new s))}).call(t,function(){return this}())},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(){function e(){n(this,e),this.tags=[],this.children=[],this.parent=void 0,this.newTag("seed")}return r(e,[{key:"boot",value:function(){}},{key:"newTag",value:function(e){var t=!1;this.tags.find(function(n){n===e&&(t=!0)}),t||this.tags.push(e)}},{key:"hasTag",value:function(e){var t=!1;return this.tags.find(function(n){n===e&&(t=!0)}),t}},{key:"breakLink",value:function(e){var t=this;this.children.forEach(function(n,r){n==e&&(t.children.splice(r,1),n.parent=void 0)}),this.parent==e&&(this.parent=void 0,e.breakLink(this))}},{key:"destroy",value:function(){var e=this;Object.getOwnPropertyNames(this).forEach(function(t){delete e[t]})}}]),e}();t["default"]=i},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(1),f=r(c),l=function(e){function t(){i(this,t);var e=o(this,Object.getPrototypeOf(t).call(this));return e.objectList={},e.objectList.link_obj_0=e,e._id=0,e.idIndex=0,e.newTag("factory"),e}return u(t,e),a(t,[{key:"create",value:function(e,t,n){if(t||(t={}),!e)throw new Error("create undefind Class!");var r=new e(t);return r._id=this.idBuild(),this.objectList["link_obj_"+r._id]=r,n&&(r.parent=n,n.children.push(r)),r.create_time_stamp=(new Date).getTime(),r.boot(),r}},{key:"idBuild",value:function(){return this.idIndex++,this.idIndex}},{key:"destroy",value:function(e){for(;e.children.length>0;)Link.destroy(e.children[e.children.length-1]);e.parent&&e.breakLink(e.parent),delete this.objectList["link_obj_"+e._id],e.destroy()}}]),t}(f["default"]);t["default"]=new l}]);
//# sourceMappingURL=link.js.map