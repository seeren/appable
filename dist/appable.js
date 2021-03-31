/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/component.ts":
/*!*************************************!*\
  !*** ./src/components/component.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Component\": () => (/* binding */ Component)\n/* harmony export */ });\nvar Component = /** @class */ (function () {\n    /**\n     * @param selector\n     * @param template\n     * @param components\n     */\n    function Component(selector, template, components) {\n        var _this = this;\n        if (template === void 0) { template = ''; }\n        if (components === void 0) { components = []; }\n        this.selector = selector;\n        this.template = template;\n        this.row = 0;\n        this.components = [];\n        this.selector = selector;\n        this.template = template;\n        components.forEach(function (component) { return _this.attach(component); });\n        window.document.createElement(this.selector);\n    }\n    /**\n     * @param type\n     * @returns {ThisType}\n     */\n    Component.prototype.emit = function (type) {\n        var returnValue = null;\n        if (this[type]) {\n            returnValue = this[type]();\n        }\n        this.components.forEach(function (component) { return false === returnValue\n            ? component.emit(type)\n            : returnValue = component.emit(type); });\n        return returnValue;\n    };\n    /**\n     * @param component\n     * @returns {ThisType}\n     *\n     * @throws {ReferenceError} Component already attached\n     */\n    Component.prototype.attach = function (component) {\n        var selector = component.selector.split('[')[0];\n        if (-1 !== this.components.indexOf(component)) {\n            throw new ReferenceError(\"Can't attach \\\"\" + selector + \"\\\": is already attached\");\n        }\n        var attributeName = \"data-\" + this.selector.split(' ').pop().split('[')[0];\n        var attribute = attributeName + \"=\\\"\" + this.row + \"\\\"\";\n        var match = new RegExp(\"<\" + selector + \"*(.(?!\" + attributeName + \"))+><\").exec(this.template);\n        if (match) {\n            var partialTag = match[0].substring(0, match[0].length - 2);\n            this.template = this.template.replace(partialTag + \">\", partialTag + \" \" + attribute + \">\");\n        }\n        else {\n            component.emit('onInit');\n            this.template += \"<\" + selector + \" \" + attribute + \"></\" + selector + \">\";\n        }\n        this.components.push(component);\n        this.row += 1;\n        component.selector = selector + \"[\" + attribute + \"]\";\n        return this;\n    };\n    /**\n     * @param component\n     * @returns {ThisType}\n     *\n     * @throws {ReferenceError} Component not attached\n     */\n    Component.prototype.detach = function (component) {\n        var index = this.components.indexOf(component);\n        var selectorSplitHook = component.selector.split('[');\n        if (-1 === index || 1 === selectorSplitHook.length) {\n            throw new ReferenceError(\"Can't detach \\\"\" + component.selector + \"\\\": is not attached\");\n        }\n        var selectorSplitSpace = selectorSplitHook[selectorSplitHook.length - 2].split(' ');\n        var selector = selectorSplitSpace[selectorSplitSpace.length - 1];\n        var attributes = \"\" + selectorSplitHook[selectorSplitHook.length - 1].replace(']', '');\n        var match = new RegExp(\"<\" + selector + \"+(.)+\" + attributes + \"+><\").exec(this.template);\n        this.template = this.template.replace(match[0] + \"/\" + selector + \">\", '');\n        this.components.splice(index, 1);\n        this.row -= 1;\n        component.emit('onDestroy');\n        component.selector = \"\" + selector;\n        return this;\n    };\n    /**\n     * @returns {ThisType}\n     */\n    Component.prototype.update = function () {\n        var _this = this;\n        var vars = '';\n        var element = window.document.querySelector(this.selector);\n        if (!element) {\n            console.info(\"No update for \\\"\" + this.selector + \"\\\": not found in the document\");\n            return this;\n        }\n        var properties = window.Object.getOwnPropertyNames(this).slice(4).concat(window.Object.getOwnPropertyNames(this.constructor.prototype).slice(1));\n        ['onInit', 'onUpdate', 'onDestroy', 'onBack', 'onPause', 'onResume'].forEach(function (hookName) {\n            var index = properties.indexOf(hookName);\n            if (-1 !== index) {\n                properties.splice(index, 1);\n            }\n        });\n        properties.forEach(function (varName) {\n            vars += \"var \" + varName + \" = this[\\\"\" + varName + \"\\\"]\";\n            if (_this[varName] instanceof window.Function) {\n                vars += '.bind(this)';\n            }\n            vars += ';';\n        });\n        element.innerHTML = eval(vars + \"`\" + this.template + \"`\");\n        this.updateEvents(element, properties);\n        this.components.forEach(function (component) {\n            if (-1 === component.selector.indexOf(_this.selector)) {\n                component.selector = _this.selector + \" \" + component.selector;\n            }\n            component.update();\n        });\n        this.onUpdate && this.onUpdate(element);\n        return this;\n    };\n    /**\n     * @param htmlElement\n     * @param properties\n     * @returns {ThisType}\n     */\n    Component.prototype.updateEvents = function (htmlElement, properties) {\n        var _this = this;\n        var match;\n        properties.forEach(function (propertie) {\n            var regExp = new window.RegExp(\"(on[a-zA-Z]{4,16})=\\\"\" + propertie + \"\\\\((.*)\\\\)\\\"\", 'g');\n            var childEvent = function (child) { return _this.registerEvent(child, match[1], propertie, match[2].split(', ')); };\n            do {\n                match = regExp.exec(htmlElement.innerHTML);\n                if (match) {\n                    window.document.querySelectorAll(_this.selector + \" [\" + match[0] + \"]\").forEach(childEvent);\n                }\n            } while (match);\n        });\n        return this;\n    };\n    /**\n     * @param htmlElement\n     * @param type\n     * @param propertie\n     * @param args\n     * @returns {ThisType}\n     */\n    Component.prototype.registerEvent = function (htmlElement, type, propertie, args) {\n        var _this = this;\n        htmlElement[type] = function () {\n            var _a;\n            var evaluedArguments = [];\n            for (var key in args) {\n                evaluedArguments[key] = eval(args[key]);\n            }\n            if ('undefined' !== typeof (_a = _this)[propertie].apply(_a, evaluedArguments)) {\n                _this.update();\n            }\n        };\n        return this;\n    };\n    return Component;\n}());\n\n\n\n//# sourceURL=webpack://appable/./src/components/component.ts?");

/***/ }),

/***/ "./src/components/router.component.ts":
/*!********************************************!*\
  !*** ./src/components/router.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RouterComponent\": () => (/* binding */ RouterComponent)\n/* harmony export */ });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ \"./src/components/component.ts\");\n/* harmony import */ var _services_route_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/route.service */ \"./src/services/route.service.ts\");\n/* harmony import */ var _services_state_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/state.service */ \"./src/services/state.service.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n\nvar RouterComponent = new /** @class */ (function (_super) {\n    __extends(RouterComponent, _super);\n    function RouterComponent() {\n        var _this = _super.call(this, 'router') || this;\n        _this.includePath = '';\n        var scripts = window.document.getElementsByTagName('script');\n        Object.keys(scripts).some(function (key) {\n            var script = scripts[parseInt(key)];\n            if (script.src && -1 !== script.src.indexOf('dist/appable.js')) {\n                _this.includePath = script.src\n                    .replace('/dist/appable.js', '')\n                    .replace(window.location.origin, '');\n                return true;\n            }\n            return false;\n        });\n        return _this;\n    }\n    /**\n     * @param path\n     * @param name\n     * @param component\n     * @returns {ThisType}\n     */\n    RouterComponent.prototype.add = function (path, name, component) {\n        _services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.post(\"\" + this.includePath + path, name, component);\n        return this;\n    };\n    /**\n     * @param component\n     * @returns {ThisType}\n     */\n    RouterComponent.prototype.run = function (component) {\n        var _this = this;\n        window.addEventListener('popstate', function (event) { return _this.onPopstate(event); });\n        window.document.addEventListener('pause', function () { return _this.emit('onPause'); });\n        window.document.addEventListener('resume', function () { return function () { return _this.emit('onResume'); }; });\n        var param;\n        var routes = _services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.get();\n        try {\n            routes.forEach(function (route) {\n                if (_services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.matchLocation(route)) {\n                    throw route;\n                }\n                try {\n                    param = _services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.getParam(route);\n                }\n                catch (error) { }\n                if (param) {\n                    throw route;\n                }\n            });\n            if (routes.length && !_services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.hasParam(routes[0])) {\n                throw routes[0];\n            }\n        }\n        catch (route) {\n            _services_state_service__WEBPACK_IMPORTED_MODULE_2__.StateService.put(route, param);\n            this.attachRoute(route);\n        }\n        component.attach(this);\n        component.update();\n        return this;\n    };\n    /**\n     * @returns {ThisType}\n     */\n    RouterComponent.prototype.back = function () {\n        window.history.back();\n        return this;\n    };\n    /**\n     * @param name\n     * @param param\n     *\n     * @throws {ReferenceError} Route not found\n     */\n    RouterComponent.prototype.navigate = function (name, param) {\n        try {\n            _services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.get().forEach(function (route) {\n                if (name === route.name) {\n                    throw route;\n                }\n            });\n        }\n        catch (route) {\n            if (0 < this.components.length) {\n                if (this.components[0] === route.component) {\n                    return;\n                }\n                this.detach(this.components[0]);\n            }\n            _services_state_service__WEBPACK_IMPORTED_MODULE_2__.StateService.post(route, param);\n            this.attachRoute(route);\n            this.update();\n            return;\n        }\n        throw new ReferenceError(\"Route \\\"\" + name + \"\\\" not found\");\n    };\n    /**\n     * @param name\n     * @returns {Route | string | number}\n     *\n     * @throws {ReferenceError} Param name not found\n     */\n    RouterComponent.prototype.get = function (name) {\n        if (!name) {\n            return this.route;\n        }\n        var param = _services_state_service__WEBPACK_IMPORTED_MODULE_2__.StateService.get().param[\"\" + name];\n        if (!param) {\n            throw new ReferenceError(\"There is no param \\\"\" + name + \"\\\" in the curent state\");\n        }\n        return param;\n    };\n    /**\n     * @param route\n     * @returns {ThisType}\n     */\n    RouterComponent.prototype.attachRoute = function (route) {\n        if (route.component instanceof window.Function) {\n            var Attachable = route.component;\n            route.component = new Attachable();\n        }\n        this.route = route;\n        return this.attach(route.component);\n    };\n    /**\n     * @param event\n     * @returns {boolean}\n     */\n    RouterComponent.prototype.onPopstate = function (event) {\n        var _this = this;\n        if (false === this.emit('onBack')) {\n            var state_1 = _services_state_service__WEBPACK_IMPORTED_MODULE_2__.StateService.get();\n            _services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.get().some(function (route) {\n                if (route.name === state_1.name) {\n                    _services_state_service__WEBPACK_IMPORTED_MODULE_2__.StateService.post(route, state_1.param);\n                    return true;\n                }\n                return false;\n            });\n            return false;\n        }\n        this.detach(this.components[0]);\n        if (event.state) {\n            _services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.get().some(function (route) {\n                if (event.state.name === route.name) {\n                    _services_state_service__WEBPACK_IMPORTED_MODULE_2__.StateService.put(route, event.state.param);\n                    _this.attachRoute(route);\n                    return true;\n                }\n                return false;\n            });\n        }\n        this.update();\n        return true;\n    };\n    /**\n     * @returns {ThisType}\n     */\n    RouterComponent.prototype.updateEvents = function () {\n        return this;\n    };\n    return RouterComponent;\n}(_component__WEBPACK_IMPORTED_MODULE_0__.Component))();\n\n\n//# sourceURL=webpack://appable/./src/components/router.component.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Component\": () => (/* reexport safe */ _components_component__WEBPACK_IMPORTED_MODULE_0__.Component),\n/* harmony export */   \"RouterComponent\": () => (/* reexport safe */ _components_router_component__WEBPACK_IMPORTED_MODULE_1__.RouterComponent),\n/* harmony export */   \"Route\": () => (/* reexport safe */ _models_route_model__WEBPACK_IMPORTED_MODULE_2__.Route),\n/* harmony export */   \"State\": () => (/* reexport safe */ _models_state_model__WEBPACK_IMPORTED_MODULE_3__.State),\n/* harmony export */   \"RouteService\": () => (/* reexport safe */ _services_route_service__WEBPACK_IMPORTED_MODULE_4__.RouteService),\n/* harmony export */   \"Service\": () => (/* reexport safe */ _services_service__WEBPACK_IMPORTED_MODULE_5__.Service),\n/* harmony export */   \"StateService\": () => (/* reexport safe */ _services_state_service__WEBPACK_IMPORTED_MODULE_6__.StateService)\n/* harmony export */ });\n/* harmony import */ var _components_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/component */ \"./src/components/component.ts\");\n/* harmony import */ var _components_router_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/router.component */ \"./src/components/router.component.ts\");\n/* harmony import */ var _models_route_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/route.model */ \"./src/models/route.model.ts\");\n/* harmony import */ var _models_state_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/state.model */ \"./src/models/state.model.ts\");\n/* harmony import */ var _services_route_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/route.service */ \"./src/services/route.service.ts\");\n/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/service */ \"./src/services/service.ts\");\n/* harmony import */ var _services_state_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/state.service */ \"./src/services/state.service.ts\");\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://appable/./src/index.ts?");

/***/ }),

/***/ "./src/models/route.model.ts":
/*!***********************************!*\
  !*** ./src/models/route.model.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Route\": () => (/* binding */ Route)\n/* harmony export */ });\nvar Route = /** @class */ (function () {\n    /**\n     * @param path\n     * @param name\n     * @param component\n     */\n    function Route(path, name, component) {\n        this.path = path;\n        this.name = name;\n        this.component = component;\n    }\n    return Route;\n}());\n\n\n\n//# sourceURL=webpack://appable/./src/models/route.model.ts?");

/***/ }),

/***/ "./src/models/state.model.ts":
/*!***********************************!*\
  !*** ./src/models/state.model.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"State\": () => (/* binding */ State)\n/* harmony export */ });\nvar State = /** @class */ (function () {\n    function State() {\n    }\n    return State;\n}());\n\n\n\n//# sourceURL=webpack://appable/./src/models/state.model.ts?");

/***/ }),

/***/ "./src/services/route.service.ts":
/*!***************************************!*\
  !*** ./src/services/route.service.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RouteService\": () => (/* binding */ RouteService)\n/* harmony export */ });\n/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ \"./src/services/service.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar RouteService = new /** @class */ (function (_super) {\n    __extends(RouteService, _super);\n    function RouteService() {\n        var _this = _super !== null && _super.apply(this, arguments) || this;\n        _this.routes = [];\n        return _this;\n    }\n    /**\n     * @returns {Route[]}\n     */\n    RouteService.prototype.get = function () {\n        return this.routes;\n    };\n    /**\n     * @param path\n     * @param name\n     * @param component\n     *\n     * @throws {ReferenceError} Route already added\n     */\n    RouteService.prototype.post = function (path, name, component) {\n        this.routes.forEach(function (route) {\n            if (path === route.path) {\n                throw new ReferenceError(\"Can't add route: path \\\"\" + path + \"\\\" already exists\");\n            }\n            if (name === route.name) {\n                throw new ReferenceError(\"Can't add route: name \\\"\" + name + \"\\\" already exists\");\n            }\n        });\n        this.routes.push({ path: path, name: name, component: component });\n    };\n    /**\n     * @param route\n     * @returns {boolean}\n     */\n    RouteService.prototype.matchLocation = function (route) {\n        return !this.hasParam(route) && route.path === window.location.pathname;\n    };\n    /**\n     * @param {Route} route\n     * @returns {Boolean}\n     */\n    RouteService.prototype.hasParam = function (route) {\n        return -1 !== route.path.indexOf(':');\n    };\n    /**\n     * @param route\n     * @returns { { [key: string]: string | number } }\n     *\n     * @throws {Error} Location and route do not match\n     * @throws {Error} Route slug is not populated\n     */\n    RouteService.prototype.getParam = function (route) {\n        var param = {};\n        var explosedPath = window.location.pathname.split('/');\n        var explosedRoute = route.path.split('/');\n        if (explosedPath.length !== explosedRoute.length) {\n            throw new Error('Location path length is different to route path length');\n        }\n        Object.keys(explosedPath).forEach(function (key) {\n            var routePart = explosedRoute[key];\n            var pathPart = explosedPath[key];\n            if (':' === routePart[0]) {\n                param[routePart.replace(':', '')] = pathPart;\n            }\n            else if (pathPart !== routePart) {\n                throw new Error(\"Route part \\\"\" + routePart + \"\\\" not found\");\n            }\n        });\n        Object.keys(param).forEach(function (key) {\n            if (\":\" + key === param[key]) {\n                throw new Error(\"Route slug \\\"\" + key + \"\\\" is not populated\");\n            }\n        });\n        return param;\n    };\n    return RouteService;\n}(_service__WEBPACK_IMPORTED_MODULE_0__.Service))();\n\n\n//# sourceURL=webpack://appable/./src/services/route.service.ts?");

/***/ }),

/***/ "./src/services/service.ts":
/*!*********************************!*\
  !*** ./src/services/service.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Service\": () => (/* binding */ Service)\n/* harmony export */ });\nvar Service = /** @class */ (function () {\n    function Service() {\n        this.callables = [];\n    }\n    /**\n     * @param callable\n     * @returns {ThisType}\n     */\n    Service.prototype.attach = function (callable) {\n        this.callables.push(callable);\n        return this;\n    };\n    /**\n     * @param callable\n     * @returns {ThisType}\n     */\n    Service.prototype.detach = function (callable) {\n        var index = this.callables.indexOf(callable);\n        if (-1 !== index) {\n            this.callables.splice(index, 1);\n        }\n        return this;\n    };\n    /**\n     * @returns {ThisType}\n     */\n    Service.prototype.notify = function () {\n        var _this = this;\n        this.callables.forEach(function (callable) { return callable(_this); });\n        return this;\n    };\n    return Service;\n}());\n\n\n\n//# sourceURL=webpack://appable/./src/services/service.ts?");

/***/ }),

/***/ "./src/services/state.service.ts":
/*!***************************************!*\
  !*** ./src/services/state.service.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StateService\": () => (/* binding */ StateService)\n/* harmony export */ });\n/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ \"./src/services/service.ts\");\n/* harmony import */ var _models_state_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/state.model */ \"./src/models/state.model.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar StateService = new /** @class */ (function (_super) {\n    __extends(StateService, _super);\n    function StateService() {\n        var _this = _super !== null && _super.apply(this, arguments) || this;\n        _this.state = new _models_state_model__WEBPACK_IMPORTED_MODULE_1__.State();\n        return _this;\n    }\n    /**\n     * @returns {State}\n     */\n    StateService.prototype.get = function () {\n        return this.state;\n    };\n    /**\n     * @param route\n     * @param param\n     * @returns {boolean}\n     */\n    StateService.prototype.post = function (route, param) {\n        return this.history(route, param);\n    };\n    /**\n     * @param route\n     * @param param\n     * @returns {boolean}\n     */\n    StateService.prototype.put = function (route, param) {\n        return this.history(route, param, true);\n    };\n    /**\n     * @param route\n     * @param param\n     * @param replace\n     * @returns {boolean}\n     *\n     * @throws {Error} Route slug do not match State param\n     */\n    StateService.prototype.history = function (route, param, replace) {\n        var _this = this;\n        if (param === void 0) { param = {}; }\n        if (replace === void 0) { replace = false; }\n        route.path.split('/').forEach(function (key) {\n            if (':' === key[0] && 'undefined' === typeof param[key.substring(1)]) {\n                throw new Error(\"Slug \\\"\" + key + \"\\\" is missing in param\");\n            }\n        });\n        Object.keys(param).forEach(function (key) {\n            if (-1 === route.path.indexOf(\":\" + key)) {\n                throw new Error(\"Param \\\"\" + key + \"\\\" is missing in \\\"\" + route.path + \"\\\"\");\n            }\n        });\n        var path = route.path;\n        this.state.name = route.name;\n        this.state.param = param;\n        Object.keys(this.state.param).forEach(function (key) { return path = path.replace(\":\" + key, \"\" + _this.state.param[key]); });\n        if (replace) {\n            window.history.replaceState(this.state, route.name, path);\n            this.notify();\n            return false;\n        }\n        window.history.pushState(this.state, route.name, path);\n        this.notify();\n        return true;\n    };\n    return StateService;\n}(_service__WEBPACK_IMPORTED_MODULE_0__.Service))();\n\n\n//# sourceURL=webpack://appable/./src/services/state.service.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});