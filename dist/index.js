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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return Component; });\n/* harmony import */ var _models_component_option_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/component-option.model */ \"./src/models/component-option.model.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n/**\r\n * @type {Component}\r\n */\n\nvar Component =\n/*#__PURE__*/\nfunction () {\n  /**\r\n   * @constructor\r\n   * @param {ComponentOption} option\r\n   */\n  function Component(option) {\n    var _this = this;\n\n    _classCallCheck(this, Component);\n\n    /**\r\n     * @type {Number}\r\n     */\n    this.row = 0;\n    /**\r\n     * @type {Component[]}\r\n     */\n\n    this.components = [];\n    /**\r\n     * @type {String}\r\n     */\n\n    this.selector = option.selector;\n    /**\r\n     * @type {String}\r\n     */\n\n    this.template = option.template;\n\n    if (option.components) {\n      option.components.forEach(function (component) {\n        return _this.attach(component);\n      });\n    }\n\n    window.document.createElement(option.selector);\n  }\n  /**\r\n   * @param {String} hookName \r\n   * @returns {Boolean}\r\n   */\n\n\n  _createClass(Component, [{\n    key: \"lifeCycle\",\n    value: function lifeCycle(hookName) {\n      var hookValue = null;\n\n      if (this[hookName]) {\n        hookValue = this[hookName]();\n      }\n\n      this.components.forEach(function (component) {\n        if (hookValue === false) {\n          return component.lifeCycle(hookName);\n        }\n\n        hookValue = component.lifeCycle(hookName);\n      });\n      return hookValue;\n    }\n    /**\r\n     * @param {Component|Function} component \r\n     * @returns {Component}\r\n     * \r\n     * @throws {ReferenceError}\r\n     */\n\n  }, {\n    key: \"attach\",\n    value: function attach(component) {\n      if (component instanceof window.Function) {\n        component = new component();\n      }\n\n      var selector = component.selector.split(\"[\")[0];\n\n      if (-1 !== this.components.indexOf(component)) {\n        throw new ReferenceError(\"Can't attach \\\"\".concat(selector, \"\\\": instance already exist\"));\n      }\n\n      var attributeName = \"data-\".concat(this.selector.split(\"[\")[0]);\n      var attribute = \"\".concat(attributeName, \"=\\\"\").concat(this.row, \"\\\"\");\n      var match = new RegExp(\"<\".concat(selector, \"*(.(?!\").concat(attributeName, \"))+><\")).exec(this.template);\n\n      if (match) {\n        var partialTag = match[0].substring(0, match[0].length - 2);\n        this.template = this.template.replace(\"\".concat(partialTag, \">\"), \"\".concat(partialTag, \" \").concat(attribute, \">\"));\n      } else {\n        this.template += \"<\".concat(selector, \" \").concat(attribute, \"></\").concat(selector, \">\");\n      }\n\n      this.components.push(component);\n      this.row++;\n      component.selector = \"\".concat(selector, \"[\").concat(attribute, \"]\");\n\n      if (component.onInit) {\n        component.onInit();\n      }\n\n      return this;\n    }\n    /**\r\n     * @param {Component} component \r\n     * @returns {Component}\r\n     * \r\n     * @throws {ReferenceError}\r\n     */\n\n  }, {\n    key: \"detach\",\n    value: function detach(component) {\n      var index = this.components.indexOf(component);\n      var selectorSplitHook = component.selector.split(\"[\");\n\n      if (-1 === index || 1 === selectorSplitHook.length) {\n        throw new ReferenceError(\"Can't detach \\\"\".concat(component.selector, \"\\\": make sure you attach it before\"));\n      }\n\n      var selectorSplitSpace = selectorSplitHook[selectorSplitHook.length - 2].split(\" \");\n      var selector = selectorSplitSpace[selectorSplitSpace.length - 1];\n      var attributes = \"\".concat(selectorSplitHook[selectorSplitHook.length - 1].replace(\"]\", \"\"));\n      var match = new RegExp(\"<\".concat(selector, \"+(.)+\").concat(attributes, \"+><\")).exec(this.template);\n      this.template = this.template.replace(\"\".concat(match[0], \"/\").concat(selector, \">\"), \"\");\n      this.components.splice(index, 1);\n      this.row--;\n      component.selector = \"\".concat(selector);\n\n      if (component.onDestroy) {\n        component.onDestroy();\n      }\n\n      return this;\n    }\n    /**\r\n     * @returns {Component}\r\n     * \r\n     * @throws {ReferenceError}\r\n     */\n\n  }, {\n    key: \"update\",\n    value: function update() {\n      var _this2 = this;\n\n      var vars = \"\";\n      var element = window.document.querySelector(this.selector);\n\n      if (!element) {\n        throw new ReferenceError(\"Can't find \\\"\".concat(this.selector, \"\\\" selector in the document\"));\n      }\n\n      var properties = window.Object.getOwnPropertyNames(this).slice(4).concat(window.Object.getOwnPropertyNames(this.constructor.prototype).slice(1));\n      properties.forEach(function (varName) {\n        vars += \"var \".concat(varName, \" = this[\\\"\").concat(varName, \"\\\"]\");\n\n        if (_this2[varName] instanceof window.Function) {\n          vars += \".bind(this)\";\n        }\n\n        vars += \";\";\n      });\n      element.innerHTML = eval(vars + '`' + this.template + '`');\n      this.updateEvents(element, properties);\n      this.components.forEach(function (component) {\n        if (-1 === component.selector.indexOf(_this2.selector)) {\n          component.selector = \"\".concat(_this2.selector, \" \").concat(component.selector);\n        }\n\n        component.update();\n      });\n\n      if (this.onUpdate) {\n        this.onUpdate(element);\n      }\n\n      return this;\n    }\n    /**\r\n     * @param {HTMLElement} htmlElement \r\n     * @param {String[]} properties \r\n     * @returns {Component}\r\n     */\n\n  }, {\n    key: \"updateEvents\",\n    value: function updateEvents(htmlElement, properties) {\n      var _this3 = this;\n\n      var match;\n      properties.forEach(function (propertie) {\n        var regExp = new window.RegExp(\"(on[a-zA-Z]{4,16})=\\\"\".concat(propertie, \"\\\\((.*)\\\\)\\\"\"), \"g\");\n\n        while (match = regExp.exec(htmlElement.innerHTML)) {\n          window.document.querySelectorAll(\"\".concat(_this3.selector, \" [\").concat(match[0], \"]\")).forEach(function (child) {\n            return _this3.registerEvent(child, match[1], propertie, match[2].split(\", \"));\n          });\n        }\n      });\n      return this;\n    }\n    /**\r\n     * @param {HTMLElement} htmlElement \r\n     * @param {string} type \r\n     * @param {string} propertie \r\n     * @param {String[]} args \r\n     * @returns {Component}\r\n     */\n\n  }, {\n    key: \"registerEvent\",\n    value: function registerEvent(htmlElement, type, propertie, args) {\n      var _this4 = this;\n\n      htmlElement[type] = function () {\n        var evaluedArguments = [];\n\n        for (var key in args) {\n          evaluedArguments[key] = eval(args[key]);\n        }\n\n        if (undefined !== _this4[propertie].apply(_this4, evaluedArguments)) {\n          _this4.update();\n        }\n      };\n\n      return this;\n    }\n  }]);\n\n  return Component;\n}();\n\n//# sourceURL=webpack:///./src/components/component.js?");

/***/ }),

/***/ "./src/components/router.component.js":
/*!********************************************!*\
  !*** ./src/components/router.component.js ***!
  \********************************************/
/*! exports provided: RouterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RouterComponent\", function() { return RouterComponent; });\n/* harmony import */ var _components_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/component */ \"./src/components/component.js\");\n/* harmony import */ var _services_route_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/route.service */ \"./src/services/route.service.js\");\n/* harmony import */ var _services_state_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/state.service */ \"./src/services/state.service.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n/**\r\n * @type {RouterComponent}\r\n */\n\nvar RouterComponent = new (\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(_class, _Component);\n\n  /**\r\n   * @constructor\r\n   */\n  function _class() {\n    var _this;\n\n    _classCallCheck(this, _class);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, {\n      selector: \"router\",\n      template: \"\"\n    }));\n    _this.basPath = \"\";\n    var scripts = window.document.getElementsByTagName(\"script\");\n\n    for (var key in scripts) {\n      if (scripts[key].src && -1 !== scripts[key].src.indexOf(\"dist/index.js\")) {\n        _this.basPath = scripts[key].src.replace(\"/dist/index.js\", \"\").replace(window.location.origin, \"\");\n      }\n    }\n\n    return _this;\n  }\n  /**\r\n   * @param {String} path \r\n   * @param {String} name \r\n   * @param {Component} component \r\n   * @returns {RouterComponent}\r\n   * \r\n   * @throws {ReferenceError}\r\n   */\n\n\n  _createClass(_class, [{\n    key: \"add\",\n    value: function add(path, name, component) {\n      _services_route_service__WEBPACK_IMPORTED_MODULE_1__[\"RouteService\"].post(\"\".concat(this.basPath).concat(path), name, component);\n      return this;\n    }\n    /**\r\n     * @param {Component} component \r\n     */\n\n  }, {\n    key: \"run\",\n    value: function run(component) {\n      var _this2 = this;\n\n      window.addEventListener(\"popstate\", function (event) {\n        return _this2.onPopstate(event);\n      });\n      window.document.addEventListener(\"pause\", function () {\n        return _this2.lifeCycle(\"onPause\");\n      });\n      window.document.addEventListener(\"resume\", function () {\n        return _this2.lifeCycle(\"onResume\");\n      });\n      var param;\n      var routes = _services_route_service__WEBPACK_IMPORTED_MODULE_1__[\"RouteService\"].get();\n\n      try {\n        routes.forEach(function (route) {\n          if (_services_route_service__WEBPACK_IMPORTED_MODULE_1__[\"RouteService\"].matchLocation(route) || (param = _services_route_service__WEBPACK_IMPORTED_MODULE_1__[\"RouteService\"].getParam(route))) {\n            throw route;\n          }\n        });\n\n        if (routes.length && !_services_route_service__WEBPACK_IMPORTED_MODULE_1__[\"RouteService\"].hasParam(routes[0])) {\n          throw routes[0];\n        }\n      } catch (route) {\n        _services_state_service__WEBPACK_IMPORTED_MODULE_2__[\"StateService\"].put(route, param);\n        this.attach(route.component);\n      }\n\n      component.attach(this, true);\n      component.update();\n    }\n    /**\r\n     * @param {string} name \r\n     * @param {Object} param \r\n     * \r\n     * @throws {ReferenceError}\r\n     */\n\n  }, {\n    key: \"navigate\",\n    value: function navigate(name, param) {\n      try {\n        _services_route_service__WEBPACK_IMPORTED_MODULE_1__[\"RouteService\"].get().forEach(function (route) {\n          if (name === route.name) {\n            throw route;\n          }\n        });\n      } catch (route) {\n        if (route.component === this.components[0]) {\n          return;\n        }\n\n        this.detach(this.components[0]);\n        _services_state_service__WEBPACK_IMPORTED_MODULE_2__[\"StateService\"].post(route, param);\n        this.attach(route.component);\n        this.update();\n        return;\n      }\n\n      throw new ReferenceError(\"Route \\\"\".concat(name, \"\\\" not found\"));\n    }\n    /**\r\n     * @param {String} paramName\r\n     * @returns {mixed} \r\n     * \r\n     * @throws {ReferenceError}\r\n     */\n\n  }, {\n    key: \"get\",\n    value: function get(paramName) {\n      var param = _services_state_service__WEBPACK_IMPORTED_MODULE_2__[\"StateService\"].get().param[paramName];\n\n      if (!param) {\n        throw new ReferenceError(\"There is no \\\"\".concat(paramName, \"\\\" param in the curent state\"));\n      }\n\n      return param;\n    }\n    /**\r\n     * @param {PopStateEvent} event \r\n     */\n\n  }, {\n    key: \"onPopstate\",\n    value: function onPopstate(event) {\n      var _this3 = this;\n\n      if (false === this.lifeCycle(\"onBack\")) {\n        var state = _services_state_service__WEBPACK_IMPORTED_MODULE_2__[\"StateService\"].get();\n        return _services_route_service__WEBPACK_IMPORTED_MODULE_1__[\"RouteService\"].get().forEach(function (route) {\n          if (route.name === state.name) {\n            _services_state_service__WEBPACK_IMPORTED_MODULE_2__[\"StateService\"].post(route, state.param);\n          }\n        });\n      }\n\n      this.detach(this.components[0]);\n\n      if (event.state) {\n        _services_route_service__WEBPACK_IMPORTED_MODULE_1__[\"RouteService\"].get().forEach(function (route) {\n          if (event.state.name === route.name) {\n            _services_state_service__WEBPACK_IMPORTED_MODULE_2__[\"StateService\"].put(route, event.state.param);\n\n            _this3.attach(route.component);\n          }\n        });\n      }\n\n      this.update();\n    }\n  }]);\n\n  return _class;\n}(_components_component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]))();\n\n//# sourceURL=webpack:///./src/components/router.component.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Component, RouterComponent, Service, RouteService, StateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/component */ \"./src/components/component.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return _components_component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]; });\n\n/* harmony import */ var _components_router_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/router.component */ \"./src/components/router.component.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"RouterComponent\", function() { return _components_router_component__WEBPACK_IMPORTED_MODULE_1__[\"RouterComponent\"]; });\n\n/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/service */ \"./src/services/service.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Service\", function() { return _services_service__WEBPACK_IMPORTED_MODULE_2__[\"Service\"]; });\n\n/* harmony import */ var _services_route_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/route.service */ \"./src/services/route.service.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"RouteService\", function() { return _services_route_service__WEBPACK_IMPORTED_MODULE_3__[\"RouteService\"]; });\n\n/* harmony import */ var _services_state_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/state.service */ \"./src/services/state.service.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"StateService\", function() { return _services_state_service__WEBPACK_IMPORTED_MODULE_4__[\"StateService\"]; });\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/models/component-option.model.js":
/*!**********************************************!*\
  !*** ./src/models/component-option.model.js ***!
  \**********************************************/
/*! exports provided: ComponentOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ComponentOption\", function() { return ComponentOption; });\n/* harmony import */ var _components_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/component */ \"./src/components/component.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n\n/**\r\n * @type {ComponentOption}\r\n */\n\nvar ComponentOption =\n/**\r\n * @constructor\r\n * \r\n * @param {String} selector \r\n * @param {String} template \r\n * @param {Component[]} components \r\n */\nfunction ComponentOption(selector, template, components) {\n  _classCallCheck(this, ComponentOption);\n\n  /**\r\n   * @type {String}\r\n   */\n  this.selector = selector;\n  /**\r\n   * @type {String}\r\n   */\n\n  this.template = template;\n  /**\r\n   * @type {Component[]}\r\n   */\n\n  this.components = components;\n};\n\n//# sourceURL=webpack:///./src/models/component-option.model.js?");

/***/ }),

/***/ "./src/models/history-state.model.js":
/*!*******************************************!*\
  !*** ./src/models/history-state.model.js ***!
  \*******************************************/
/*! exports provided: HistoryState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HistoryState\", function() { return HistoryState; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n * @type {HistoryState}\r\n */\nvar HistoryState =\n/**\r\n * @constructor\r\n * \r\n * @param {String} path \r\n * @param {Object} name \r\n */\nfunction HistoryState(name, param) {\n  _classCallCheck(this, HistoryState);\n\n  /**\r\n   * @param {String} path \r\n   */\n  this.name = name;\n  /**\r\n   * @param {Object} path \r\n   */\n\n  this.param = param || {};\n};\n\n//# sourceURL=webpack:///./src/models/history-state.model.js?");

/***/ }),

/***/ "./src/models/route.model.js":
/*!***********************************!*\
  !*** ./src/models/route.model.js ***!
  \***********************************/
/*! exports provided: Route */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Route\", function() { return Route; });\n/* harmony import */ var _components_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/component */ \"./src/components/component.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n\n/**\r\n * @type {Route}\r\n */\n\nvar Route =\n/**\r\n * @constructor\r\n * \r\n * @param {String} path \r\n * @param {String} name \r\n * @param {Component} component \r\n */\nfunction Route(path, name, component) {\n  _classCallCheck(this, Route);\n\n  /**\r\n   * @param {String} path \r\n   */\n  this.name = name;\n  /**\r\n   * @param {String} path \r\n   */\n\n  this.path = path;\n  /**\r\n   * @param {Component} path \r\n   */\n\n  this.component = component;\n};\n\n//# sourceURL=webpack:///./src/models/route.model.js?");

/***/ }),

/***/ "./src/services/route.service.js":
/*!***************************************!*\
  !*** ./src/services/route.service.js ***!
  \***************************************/
/*! exports provided: RouteService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RouteService\", function() { return RouteService; });\n/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ \"./src/services/service.js\");\n/* harmony import */ var _models_route_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/route.model */ \"./src/models/route.model.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n/**\r\n * @type {RouteService}\r\n */\n\nvar RouteService = new (\n/*#__PURE__*/\nfunction (_Service) {\n  _inherits(RouteService, _Service);\n\n  /**\r\n   * @constructor\r\n   */\n  function RouteService() {\n    var _this;\n\n    _classCallCheck(this, RouteService);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(RouteService).call(this));\n    /**\r\n     * @type {Route[]}\r\n     */\n\n    _this.routes = [];\n    return _this;\n  }\n  /**\r\n   * @returns {Route[]}\r\n   */\n\n\n  _createClass(RouteService, [{\n    key: \"get\",\n    value: function get() {\n      return this.routes;\n    }\n    /**\r\n     * @param {String} path \r\n     * @param {String} name \r\n     * @param {Component} component \r\n     * \r\n     * @throws {ReferenceError}\r\n     */\n\n  }, {\n    key: \"post\",\n    value: function post(path, name, component) {\n      this.routes.forEach(function (route) {\n        if (path === route.path) {\n          throw new ReferenceError(\"Can't add route: path \\\"\".concat(path, \"\\\" already exists\"));\n        }\n\n        if (name === route.name) {\n          throw new ReferenceError(\"Can't add route: name \\\"\".concat(name, \"\\\" already exists\"));\n        }\n      });\n      this.routes.push(new _models_route_model__WEBPACK_IMPORTED_MODULE_1__[\"Route\"](path, name, component));\n    }\n    /**\r\n     * @param {Route} route \r\n     * @returns {Boolean}\r\n     */\n\n  }, {\n    key: \"hasParam\",\n    value: function hasParam(route) {\n      return -1 !== route.path.indexOf(\":\");\n    }\n    /**\r\n     * @param {Route} route\r\n     * @returns {Object|void}\r\n     */\n\n  }, {\n    key: \"getParam\",\n    value: function getParam(route) {\n      var param = {};\n      var explosedPath = window.location.pathname.split(\"/\");\n      var explosedRoute = route.path.split(\"/\");\n\n      if (explosedPath.length !== explosedRoute.length) {\n        return;\n      }\n\n      for (var key in explosedPath) {\n        if (\":\" === explosedRoute[key][0]) {\n          param[explosedRoute[key].replace(\":\", \"\")] = explosedPath[key];\n        } else if (explosedPath[key] !== explosedRoute[key]) {\n          return;\n        }\n      }\n\n      for (var _key in param) {\n        if (\":\".concat(_key) === param[_key]) {\n          return;\n        }\n      }\n\n      return param;\n    }\n    /**\r\n     * @param {Route} route \r\n     * @returns {Boolean}\r\n     */\n\n  }, {\n    key: \"matchLocation\",\n    value: function matchLocation(route) {\n      return !this.hasParam(route) && route.path === window.location.pathname;\n    }\n  }]);\n\n  return RouteService;\n}(_service__WEBPACK_IMPORTED_MODULE_0__[\"Service\"]))();\n\n//# sourceURL=webpack:///./src/services/route.service.js?");

/***/ }),

/***/ "./src/services/service.js":
/*!*********************************!*\
  !*** ./src/services/service.js ***!
  \*********************************/
/*! exports provided: Service */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Service\", function() { return Service; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n * @type {Service}\r\n */\nvar Service =\n/**\r\n * @constructor\r\n */\nfunction Service() {\n  var _this = this;\n\n  _classCallCheck(this, Service);\n\n  /**\r\n   * @type {Function[]}\r\n   */\n  var callables = [];\n  /**\r\n   * @param {Function} callable\r\n   * @returns {Service}\r\n   */\n\n  this.attach = function (callable) {\n    callables.push(callable);\n    return _this;\n  };\n  /**\r\n   * @returns {Service}\r\n   */\n\n\n  this.notify = function () {\n    callables.forEach(function (callable) {\n      return callable(_this);\n    });\n    return _this;\n  };\n  /**\r\n   * @param {Function} callable \r\n   * @returns {Service}\r\n   */\n\n\n  this.detach = function (callable) {\n    var index = callables.indexOf(callable);\n\n    if (-1 !== index) {\n      callables.splice(index, 1);\n    }\n\n    return _this;\n  };\n};\n\n//# sourceURL=webpack:///./src/services/service.js?");

/***/ }),

/***/ "./src/services/state.service.js":
/*!***************************************!*\
  !*** ./src/services/state.service.js ***!
  \***************************************/
/*! exports provided: StateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StateService\", function() { return StateService; });\n/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ \"./src/services/service.js\");\n/* harmony import */ var _models_history_state_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/history-state.model */ \"./src/models/history-state.model.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n/**\r\n * @type {StateService}\r\n */\n\nvar StateService = new (\n/*#__PURE__*/\nfunction (_Service) {\n  _inherits(StateService, _Service);\n\n  /**\r\n   * @constructor\r\n   */\n  function StateService() {\n    var _this;\n\n    _classCallCheck(this, StateService);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(StateService).call(this));\n    /**\r\n     * @type {HistoryState}\r\n     */\n\n    _this.state = new _models_history_state_model__WEBPACK_IMPORTED_MODULE_1__[\"HistoryState\"]();\n    return _this;\n  }\n  /**\r\n   * @returns {HistoryState}\r\n   */\n\n\n  _createClass(StateService, [{\n    key: \"get\",\n    value: function get() {\n      return this.state;\n    }\n    /**\r\n     * @param {Route} route\r\n     * @param {Object} param\r\n     */\n\n  }, {\n    key: \"post\",\n    value: function post(route, param) {\n      this.history(route, param);\n    }\n    /**\r\n     * @param {Route} route\r\n     * @param {Object} param\r\n     */\n\n  }, {\n    key: \"put\",\n    value: function put(route, param) {\n      this.history(route, param, true);\n    }\n    /**\r\n     * @param {Route} route \r\n     * @param {Object} param \r\n     * @param {Boolean} replace \r\n     */\n\n  }, {\n    key: \"history\",\n    value: function history(route, param, replace) {\n      var path = route.path;\n      this.state.name = route.name;\n      this.state.param = param || {};\n\n      for (var prop in this.state.param) {\n        path = path.replace(\":\".concat(prop), this.state.param[prop]);\n      }\n\n      if (replace) {\n        return window.history.replaceState(this.state, route.name, path);\n      }\n\n      window.history.pushState(this.state, route.name, path);\n    }\n  }]);\n\n  return StateService;\n}(_service__WEBPACK_IMPORTED_MODULE_0__[\"Service\"]))();\n\n//# sourceURL=webpack:///./src/services/state.service.js?");

/***/ })

/******/ });
});