(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/component.js":
/*!*************************************!*\
  !*** ./src/components/component.js ***!
  \*************************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return Component; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/**\r\n * @type {Component}\r\n */\nvar Component =\n/*#__PURE__*/\nfunction () {\n  /**\r\n   * @constructor\r\n   * @param {Object} options\r\n   */\n  function Component(options) {\n    var _this = this;\n\n    _classCallCheck(this, Component);\n\n    this.row = 0;\n    this.components = [];\n    this.selector = options.selector;\n    this.template = options.template;\n\n    if (options.components) {\n      options.components.forEach(function (component) {\n        return _this.attach(component, true);\n      });\n    }\n\n    window.document.createElement(options.selector);\n  }\n  /**\r\n   * @param {string} hook \r\n   * @param {boolean} capture\r\n   */\n\n\n  _createClass(Component, [{\n    key: \"lifeCycle\",\n    value: function lifeCycle(hook, capture) {\n      if (this[hook]) {\n        this[hook]();\n      }\n\n      if (capture) {\n        this.components.forEach(function (component) {\n          return component.lifeCycle(hook, capture);\n        });\n      }\n    }\n    /**\r\n     * @param {Component} component\r\n     * @param {bool} replace\r\n     * @returns {this}\r\n     */\n\n  }, {\n    key: \"attach\",\n    value: function attach(component, replace) {\n      this.detach(component);\n      var attribute = \"data-\".concat(this.selector.split(\"[\")[0], \"=\\\"\").concat(this.row, \"\\\"\");\n      var selector = component.selector.split(\"[\")[0];\n      var endTag = \"</\".concat(selector, \">\");\n      var container = \"<\".concat(selector, \" \").concat(attribute, \">\").concat(endTag);\n      component.selector = \"\".concat(selector, \"[\").concat(attribute, \"]\");\n      this.components.push(component);\n      this.row++;\n\n      if (replace) {\n        this.template = this.template.replace(\"<\".concat(selector, \">\").concat(endTag), container);\n      } else {\n        this.template += container;\n      }\n\n      if (component.onInit) {\n        component.onInit();\n      }\n\n      return this;\n    }\n    /** \r\n     * @param {Component}\r\n     * @returns {this}\r\n     */\n\n  }, {\n    key: \"detach\",\n    value: function detach(component) {\n      var index = this.components.indexOf(component);\n\n      if (index > -1) {\n        var selectorSplit = component.selector.split(\"[\");\n        var selector = selectorSplit[0];\n        var attributes = \" \".concat(selectorSplit[1].replace(\"]\", \"\"));\n        this.lifeCycle(\"onDestroy\", true);\n        this.components.splice(index, 1);\n        this.template = this.template.replace(\"<\".concat(selector + attributes, \"></\").concat(selector, \">\"), \"\");\n        this.row--;\n        component.selector = \"\".concat(selector);\n      }\n\n      return this;\n    }\n    /**\r\n     * @returns {this}\r\n     */\n\n  }, {\n    key: \"update\",\n    value: function update() {\n      var _this2 = this;\n\n      var vars = \"\";\n      var htmlElement = window.document.querySelector(this.selector);\n      var properties = window.Object.getOwnPropertyNames(this).slice(4).concat(window.Object.getOwnPropertyNames(this.constructor.prototype).slice(1));\n      properties.forEach(function (varName) {\n        vars += \"var \".concat(varName, \" = this[\\\"\").concat(varName, \"\\\"]\");\n\n        if (_this2[varName] instanceof window.Function) {\n          vars += \".bind(this)\";\n        }\n\n        vars += \";\";\n      });\n      htmlElement.innerHTML = eval(vars + '`' + this.template + '`');\n      this.updateEvents(htmlElement, properties);\n      this.components.forEach(function (component) {\n        return component.update(component);\n      });\n\n      if (this.onUpdate) {\n        this.onUpdate(htmlElement);\n      }\n\n      return this;\n    }\n    /**\r\n     * @param {HTMLElement} htmlElement \r\n     * @param {Array} properties \r\n     */\n\n  }, {\n    key: \"updateEvents\",\n    value: function updateEvents(htmlElement, properties) {\n      var _this3 = this;\n\n      var match;\n      properties.forEach(function (propertie) {\n        var regExp = new window.RegExp(\"(on[a-zA-Z]{4,16})=\\\"\".concat(propertie, \"\\\\((.*)\\\\)\\\"\"), \"g\");\n\n        while (match = regExp.exec(htmlElement.innerHTML)) {\n          window.document.querySelectorAll(\"\".concat(_this3.selector, \" [\").concat(match[0], \"]\")).forEach(function (child) {\n            return _this3.registerEvent(child, match[1], propertie, match[2].split(\", \"));\n          });\n        }\n      });\n    }\n    /**\r\n     * @param {HTMLElement} htmlElement \r\n     * @param {string} type \r\n     * @param {string} propertie \r\n     * @param {Array} args \r\n     */\n\n  }, {\n    key: \"registerEvent\",\n    value: function registerEvent(htmlElement, type, propertie, args) {\n      var _this4 = this;\n\n      htmlElement[type] = function () {\n        var evaluedArguments = [];\n\n        for (var key in args) {\n          evaluedArguments[key] = eval(args[key]);\n        }\n\n        if (undefined !== _this4[propertie].apply(_this4, evaluedArguments)) {\n          _this4.update();\n        }\n      };\n    }\n  }]);\n\n  return Component;\n}();\n\n//# sourceURL=webpack:///./src/components/component.js?");

/***/ }),

/***/ "./src/components/router.component.js":
/*!********************************************!*\
  !*** ./src/components/router.component.js ***!
  \********************************************/
/*! exports provided: RouterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RouterComponent\", function() { return RouterComponent; });\n/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../src/index */ \"./src/index.js\");\n/* harmony import */ var _services_router_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/router.service */ \"./src/services/router.service.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\n\n\n/**\r\n * @type {Array}\r\n */\n\nvar routes = [];\n/**\r\n * @type {RouterComponent}\r\n */\n\nvar RouterComponent = new (\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(_class, _Component);\n\n  /**\r\n   * @constructor\r\n   */\n  function _class() {\n    var _this;\n\n    _classCallCheck(this, _class);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, {\n      selector: \"router\",\n      template: \"\"\n    }));\n\n    window.onpopstate = function (event) {\n      _this.detach(_this.components[0]);\n\n      if (event.state) {\n        _services_router_service__WEBPACK_IMPORTED_MODULE_1__[\"RouterService\"].put(_assertThisInitialized(_assertThisInitialized(_this)), routes.find(function (route) {\n          return event.state.name === route.name;\n        }), event.state.param);\n      }\n\n      _this.update();\n    };\n\n    return _this;\n  }\n  /**\r\n   * @returns {this}\r\n   */\n\n\n  _createClass(_class, [{\n    key: \"update\",\n    value: function update() {\n      _get(_getPrototypeOf(_class.prototype), \"update\", this).call(this);\n\n      _services_router_service__WEBPACK_IMPORTED_MODULE_1__[\"RouterService\"].notify();\n      return this;\n    }\n    /**\r\n     * @returns {void}\r\n     */\n\n  }, {\n    key: \"back\",\n    value: function back() {\n      window.history.back();\n    }\n    /**\r\n     * @param {string} name \r\n     * @param {Object} param \r\n     */\n\n  }, {\n    key: \"navigate\",\n    value: function navigate(name, param) {\n      var route = routes.find(function (route) {\n        return name === route.name;\n      });\n\n      if (route.component !== this.components[0]) {\n        this.detach(this.components[0]);\n        _services_router_service__WEBPACK_IMPORTED_MODULE_1__[\"RouterService\"].put(this, route, param, true);\n        this.update();\n      }\n    }\n    /**\r\n     * @param {String} name\r\n     * @returns {mixed} \r\n     */\n\n  }, {\n    key: \"get\",\n    value: function get(name) {\n      return _services_router_service__WEBPACK_IMPORTED_MODULE_1__[\"RouterService\"].get().param[name];\n    }\n    /**\r\n     * @param {string} path \r\n     * @param {string} name \r\n     * @param {Function} component \r\n     * @returns {this}\r\n     */\n\n  }, {\n    key: \"add\",\n    value: function add(path, name, component) {\n      routes.push({\n        name: name,\n        path: path,\n        component: component\n      });\n      return this;\n    }\n    /**\r\n     * @param {Component} component \r\n     */\n\n  }, {\n    key: \"run\",\n    value: function run(component) {\n      var param = {};\n      var route = routes.find(function (route) {\n        if (route.path === window.location.pathname) {\n          return true;\n        }\n\n        var explosedPath = window.location.pathname.split(\"/\");\n        var explosedRoute = route.path.split(\"/\");\n\n        if (explosedPath.length !== explosedRoute.length) {\n          return false;\n        }\n\n        for (var key in explosedPath) {\n          if (\":\" === explosedRoute[key][0]) {\n            param[explosedRoute[key].replace(\":\", \"\")] = explosedPath[key];\n          } else if (explosedPath[key] !== explosedRoute[key]) {\n            param = {};\n            return false;\n          }\n        }\n\n        return true;\n      });\n\n      if (route) {\n        _services_router_service__WEBPACK_IMPORTED_MODULE_1__[\"RouterService\"].put(this, route, param);\n      } else if (routes.length) {\n        _services_router_service__WEBPACK_IMPORTED_MODULE_1__[\"RouterService\"].put(this, routes[0]);\n      }\n\n      component.attach(this, true).update();\n    }\n  }]);\n\n  return _class;\n}(_src_index__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]))();\n\n//# sourceURL=webpack:///./src/components/router.component.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Component, RouterComponent, Service, RouterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/component */ \"./src/components/component.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return _components_component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]; });\n\n/* harmony import */ var _components_router_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/router.component */ \"./src/components/router.component.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"RouterComponent\", function() { return _components_router_component__WEBPACK_IMPORTED_MODULE_1__[\"RouterComponent\"]; });\n\n/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/service */ \"./src/services/service.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Service\", function() { return _services_service__WEBPACK_IMPORTED_MODULE_2__[\"Service\"]; });\n\n/* harmony import */ var _services_router_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/router.service */ \"./src/services/router.service.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"RouterService\", function() { return _services_router_service__WEBPACK_IMPORTED_MODULE_3__[\"RouterService\"]; });\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/services/router.service.js":
/*!****************************************!*\
  !*** ./src/services/router.service.js ***!
  \****************************************/
/*! exports provided: RouterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RouterService\", function() { return RouterService; });\n/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ \"./src/services/service.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n/**\r\n * @type {RouterService}\r\n */\n\nvar RouterService = new (\n/*#__PURE__*/\nfunction (_Service) {\n  _inherits(RouterService, _Service);\n\n  /**\r\n   * @constructor\r\n   */\n  function RouterService() {\n    var _this;\n\n    _classCallCheck(this, RouterService);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(RouterService).call(this));\n    _this.state = {};\n    return _this;\n  }\n  /**\r\n   * @returns {Object}\r\n   */\n\n\n  _createClass(RouterService, [{\n    key: \"get\",\n    value: function get() {\n      return this.state;\n    }\n    /**\r\n     * @param {RouterComponent} router\r\n     * @param {Object} route\r\n     * @param {Object} param\r\n     * @param {boolean} push \r\n     */\n\n  }, {\n    key: \"put\",\n    value: function put(router, route, param, push) {\n      var path = route.path;\n      this.state.name = route.name;\n      this.state.param = param || {};\n\n      for (var prop in this.state.param) {\n        path = path.replace(\":\" + prop, this.state.param[prop]);\n      }\n\n      if (route.component instanceof window.Function) {\n        route.component = new route.component();\n      }\n\n      window.history[push ? \"pushState\" : \"replaceState\"](this.state, route.name, path);\n      router.attach(route.component);\n    }\n  }]);\n\n  return RouterService;\n}(_service__WEBPACK_IMPORTED_MODULE_0__[\"Service\"]))();\n\n//# sourceURL=webpack:///./src/services/router.service.js?");

/***/ }),

/***/ "./src/services/service.js":
/*!*********************************!*\
  !*** ./src/services/service.js ***!
  \*********************************/
/*! exports provided: Service */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Service\", function() { return Service; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n * @type {Service}\r\n */\nvar Service =\n/**\r\n * @constructor\r\n */\nfunction Service() {\n  var _this = this;\n\n  _classCallCheck(this, Service);\n\n  /**\r\n   * @type {Array}\r\n   */\n  var callback = [];\n  /**\r\n   * @param {Function} callable\r\n   */\n\n  this.attach = function (callable) {\n    return callback.push(callable);\n  };\n  /**\r\n   * @returns {void}\r\n   */\n\n\n  this.notify = function () {\n    return callback.forEach(function (callable) {\n      return callable(_this);\n    });\n  };\n  /**\r\n   * @param {Function} callable \r\n   */\n\n\n  this.detach = function (callable) {\n    for (var key in callback) {\n      if (callable === callback[key]) {\n        callback.splice(key, 1);\n        break;\n      }\n    }\n  };\n};\n\n//# sourceURL=webpack:///./src/services/service.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ })

/******/ });
});