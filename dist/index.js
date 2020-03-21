!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var o in n)("object"==typeof exports?exports:t)[o]=n[o]}}(window,function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return Component});var _models_component_option_model__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1);function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}var Component=function(){function Component(t){var e=this;_classCallCheck(this,Component),this.row=0,this.components=[],this.selector=t.selector,this.template=t.template,t.components&&t.components.forEach(function(t){return e.attach(t)}),window.document.createElement(t.selector)}return _createClass(Component,[{key:"lifeCycle",value:function(t){var e=null;return this[t]&&(e=this[t]()),this.components.forEach(function(n){if(!1===e)return n.lifeCycle(t);e=n.lifeCycle(t)}),e}},{key:"attach",value:function(t){t instanceof window.Function&&(t=new t);var e=t.selector.split("[")[0];if(-1!==this.components.indexOf(t))throw new ReferenceError("Can't attach \"".concat(e,'": instance already exist'));var n="data-".concat(this.selector.split("[")[0]),o="".concat(n,'="').concat(this.row,'"'),r=new RegExp("<".concat(e,"*(.(?!").concat(n,"))+><")).exec(this.template);if(r){var i=r[0].substring(0,r[0].length-2);this.template=this.template.replace("".concat(i,">"),"".concat(i," ").concat(o,">"))}else this.template+="<".concat(e," ").concat(o,"></").concat(e,">");return this.components.push(t),this.row++,t.selector="".concat(e,"[").concat(o,"]"),t.onInit&&t.onInit(),this}},{key:"detach",value:function(t){var e=this.components.indexOf(t),n=t.selector.split("[");if(-1===e||1===n.length)throw new ReferenceError("Can't detach \"".concat(t.selector,'": make sure you attach it before'));var o=n[n.length-2].split(" "),r=o[o.length-1],i="".concat(n[n.length-1].replace("]","")),a=new RegExp("<".concat(r,"+(.)+").concat(i,"+><")).exec(this.template);return this.template=this.template.replace("".concat(a[0],"/").concat(r,">"),""),this.components.splice(e,1),this.row--,t.selector="".concat(r),t.onDestroy&&t.onDestroy(),this}},{key:"update",value:function update(){var _this2=this,vars="",element=window.document.querySelector(this.selector);if(!element)throw new ReferenceError("Can't find \"".concat(this.selector,'" selector in the document'));var properties=window.Object.getOwnPropertyNames(this).slice(4).concat(window.Object.getOwnPropertyNames(this.constructor.prototype).slice(1));return properties.forEach(function(t){vars+="var ".concat(t,' = this["').concat(t,'"]'),_this2[t]instanceof window.Function&&(vars+=".bind(this)"),vars+=";"}),element.innerHTML=eval(vars+"`"+this.template+"`"),this.updateEvents(element,properties),this.components.forEach(function(t){-1===t.selector.indexOf(_this2.selector)&&(t.selector="".concat(_this2.selector," ").concat(t.selector)),t.update()}),this.onUpdate&&this.onUpdate(element),this}},{key:"updateEvents",value:function(t,e){var n,o=this;return e.forEach(function(e){for(var r=new window.RegExp('(on[a-zA-Z]{4,16})="'.concat(e,'\\((.*)\\)"'),"g");n=r.exec(t.innerHTML);)window.document.querySelectorAll("".concat(o.selector," [").concat(n[0],"]")).forEach(function(t){return o.registerEvent(t,n[1],e,n[2].split(", "))})}),this}},{key:"registerEvent",value:function registerEvent(htmlElement,type,propertie,args){var _this4=this;return htmlElement[type]=function(){var evaluedArguments=[];for(var key in args)evaluedArguments[key]=eval(args[key]);void 0!==_this4[propertie].apply(_this4,evaluedArguments)&&_this4.update()},this}}]),Component}()},function(t,e,n){"use strict";n(0)},function(t,e,n){"use strict";n.r(e);var o=n(0);var r=function t(){var e=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var n=[];this.attach=function(t){return n.push(t),e},this.detach=function(t){var o=n.indexOf(t);return-1!==o&&n.splice(o,1),e},this.notify=function(){return n.forEach(function(t){return t(e)}),e}};var i=function t(e,n,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.name=n,this.path=e,this.component=o};function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function u(t,e){return!e||"object"!==a(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var l=new(function(t){function e(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=u(this,s(e).call(this))).routes=[],t}var n,o,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(e,r),n=e,(o=[{key:"get",value:function(){return this.routes}},{key:"post",value:function(t,e,n){this.routes.forEach(function(n){if(t===n.path)throw new ReferenceError("Can't add route: path \"".concat(t,'" already exists'));if(e===n.name)throw new ReferenceError("Can't add route: name \"".concat(e,'" already exists'))}),this.routes.push(new i(t,e,n))}},{key:"hasParam",value:function(t){return-1!==t.path.indexOf(":")}},{key:"getParam",value:function(t){var e={},n=window.location.pathname.split("/"),o=t.path.split("/");if(n.length===o.length){for(var r in n)if(":"===o[r][0])e[o[r].replace(":","")]=n[r];else if(n[r]!==o[r])return;for(var i in e)if(":".concat(i)===e[i])return;return e}}},{key:"matchLocation",value:function(t){return!this.hasParam(t)&&t.path===window.location.pathname}}])&&c(n.prototype,o),a&&c(n,a),e}());var p=function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.name=e,this.param=n||{}};function h(t){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function y(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function m(t,e){return!e||"object"!==h(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function d(t){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function v(t,e){return(v=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var w=new(function(t){function e(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=m(this,d(e).call(this))).state=new p,t}var n,o,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e)}(e,r),n=e,(o=[{key:"get",value:function(){return this.state}},{key:"post",value:function(t,e){this.history(t,e)}},{key:"put",value:function(t,e){this.history(t,e,!0)}},{key:"history",value:function(t,e,n){var o=t.path;for(var r in this.state.name=t.name,this.state.param=e||{},this.state.param)o=o.replace(":".concat(r),this.state.param[r]);if(n)return window.history.replaceState(this.state,t.name,o);window.history.pushState(this.state,t.name,o)}}])&&y(n.prototype,o),i&&y(n,i),e}());function b(t){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function g(t,e){return!e||"object"!==b(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function E(t){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function O(t,e){return(O=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var P=new(function(t){function e(){var t;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=g(this,E(e).call(this,{selector:"router",template:""}))).basPath="";var n=window.document.getElementsByTagName("script");for(var o in n)n[o].src&&-1!==n[o].src.indexOf("dist/index.js")&&(t.basPath=n[o].src.replace("/dist/index.js","").replace(window.location.origin,""));return t}var n,r,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&O(t,e)}(e,o["a"]),n=e,(r=[{key:"add",value:function(t,e,n){return l.post("".concat(this.basPath).concat(t),e,n),this}},{key:"run",value:function(t){var e,n=this;window.addEventListener("popstate",function(t){return n.onPopstate(t)}),window.document.addEventListener("pause",function(){return n.lifeCycle("onPause")}),window.document.addEventListener("resume",function(){return n.lifeCycle("onResume")});var o=l.get();try{if(o.forEach(function(t){if(l.matchLocation(t)||(e=l.getParam(t)))throw t}),o.length&&!l.hasParam(o[0]))throw o[0]}catch(t){w.put(t,e),this.attach(t.component)}t.attach(this,!0),t.update()}},{key:"navigate",value:function(t,e){try{l.get().forEach(function(e){if(t===e.name)throw e})}catch(t){if(t.component===this.components[0])return;return this.detach(this.components[0]),w.post(t,e),this.attach(t.component),void this.update()}throw new ReferenceError('Route "'.concat(t,'" not found'))}},{key:"get",value:function(t){if(!t){var e=null;try{l.get().forEach(function(t){if(t.name===w.get().name)throw t})}catch(t){e=t}return e}var n=w.get().param[t];if(!n)throw new ReferenceError('There is no "'.concat(t,'" param in the curent state'));return n}},{key:"onPopstate",value:function(t){var e=this;if(!1===this.lifeCycle("onBack")){var n=w.get();return l.get().forEach(function(t){t.name===n.name&&w.post(t,n.param)})}this.detach(this.components[0]),t.state&&l.get().forEach(function(n){t.state.name===n.name&&(w.put(n,t.state.param),e.attach(n.component))}),this.update()}}])&&_(n.prototype,r),i&&_(n,i),e}());n.d(e,"Component",function(){return o.a}),n.d(e,"RouterComponent",function(){return P}),n.d(e,"Service",function(){return r})}])});