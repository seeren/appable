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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Component\": () => (/* binding */ Component)\n/* harmony export */ });\nvar Component = /** @class */ (function () {\r\n    /**\r\n     * @param selector\r\n     * @param template\r\n     * @param components\r\n     */\r\n    function Component(selector, template, components) {\r\n        var _this = this;\r\n        if (template === void 0) { template = ''; }\r\n        if (components === void 0) { components = []; }\r\n        this.selector = selector;\r\n        this.template = template;\r\n        this.row = 0;\r\n        this.components = [];\r\n        this.selector = selector;\r\n        this.template = template;\r\n        components.forEach(function (component) { return _this.attach(component); });\r\n        window.document.createElement(this.selector);\r\n    }\r\n    /**\r\n     * @param component\r\n     * @returns {ThisType}\r\n     *\r\n     * @throws {ReferenceError} Component already attached\r\n     */\r\n    Component.prototype.attach = function (component) {\r\n        console.log(component);\r\n        // console.log(this.components);\r\n        var selector = component.selector.split('[')[0];\r\n        if (-1 !== this.components.indexOf(component)) {\r\n            throw new ReferenceError(\"Can't attach \\\"\" + selector + \"\\\": is already attached\");\r\n        }\r\n        var attributeName = \"data-\" + this.selector.split(' ').pop().split('[')[0];\r\n        var attribute = attributeName + \"=\\\"\" + this.row + \"\\\"\";\r\n        var match = new RegExp(\"<\" + selector + \"*(.(?!\" + attributeName + \"))+><\").exec(this.template);\r\n        if (match) {\r\n            var partialTag = match[0].substring(0, match[0].length - 2);\r\n            this.template = this.template.replace(partialTag + \">\", partialTag + \" \" + attribute + \">\");\r\n        }\r\n        else {\r\n            // console.log(this);\r\n            // console.log(this.components);\r\n            this.onInit && this.onInit();\r\n            // this.components.forEach((component: ComponentInterface) => component.onInit || component.onInit());\r\n            this.template += \"<\" + selector + \" \" + attribute + \"></\" + selector + \">\";\r\n        }\r\n        this.components.push(component);\r\n        this.row += 1;\r\n        component.selector = selector + \"[\" + attribute + \"]\";\r\n        return this;\r\n    };\r\n    /**\r\n     * @param component\r\n     * @returns {ThisType}\r\n     *\r\n     * @throws {ReferenceError} Component not attached\r\n     */\r\n    Component.prototype.detach = function (component) {\r\n        var index = this.components.indexOf(component);\r\n        var selectorSplitHook = component.selector.split('[');\r\n        if (-1 === index || 1 === selectorSplitHook.length) {\r\n            throw new ReferenceError(\"Can't detach \\\"\" + component.selector + \"\\\": is not attached\");\r\n        }\r\n        var selectorSplitSpace = selectorSplitHook[selectorSplitHook.length - 2].split(' ');\r\n        var selector = selectorSplitSpace[selectorSplitSpace.length - 1];\r\n        var attributes = \"\" + selectorSplitHook[selectorSplitHook.length - 1].replace(']', '');\r\n        var match = new RegExp(\"<\" + selector + \"+(.)+\" + attributes + \"+><\").exec(this.template);\r\n        this.onDestroy && this.onDestroy();\r\n        this.components.forEach(function (component) { return component.onDestroy && component.onDestroy(); });\r\n        this.template = this.template.replace(match[0] + \"/\" + selector + \">\", '');\r\n        this.components.splice(index, 1);\r\n        this.row -= 1;\r\n        component.selector = \"\" + selector;\r\n        return this;\r\n    };\r\n    /**\r\n     * @returns {ThisType}\r\n     */\r\n    Component.prototype.update = function () {\r\n        var _this = this;\r\n        var vars = '';\r\n        var element = window.document.querySelector(this.selector);\r\n        if (!element) {\r\n            console.info(\"No update for \\\"\" + this.selector + \"\\\": not found in the document\");\r\n            return this;\r\n        }\r\n        var properties = window.Object.getOwnPropertyNames(this).slice(4).concat(window.Object.getOwnPropertyNames(this.constructor.prototype).slice(1));\r\n        ['onInit', 'onUpdate', 'onDestroy', 'onBack', 'onPause', 'onResume'].forEach(function (hookName) {\r\n            var index = properties.indexOf(hookName);\r\n            if (-1 !== index) {\r\n                properties.splice(index, 1);\r\n            }\r\n        });\r\n        properties.forEach(function (varName) {\r\n            vars += \"var \" + varName + \" = this[\\\"\" + varName + \"\\\"]\";\r\n            if (_this[varName] instanceof window.Function) {\r\n                vars += '.bind(this)';\r\n            }\r\n            vars += ';';\r\n        });\r\n        element.innerHTML = eval(vars + \"`\" + this.template + \"`\");\r\n        this.updateEvents(element, properties);\r\n        this.components.forEach(function (component) {\r\n            if (-1 === component.selector.indexOf(_this.selector)) {\r\n                component.selector = _this.selector + \" \" + component.selector;\r\n            }\r\n            component.update();\r\n        });\r\n        this.onUpdate && this.onUpdate(element);\r\n        return this;\r\n    };\r\n    /**\r\n     * @param htmlElement\r\n     * @param properties\r\n     * @returns {ThisType}\r\n     */\r\n    Component.prototype.updateEvents = function (htmlElement, properties) {\r\n        var _this = this;\r\n        var match;\r\n        properties.forEach(function (propertie) {\r\n            var regExp = new window.RegExp(\"(on[a-zA-Z]{4,16})=\\\"\" + propertie + \"\\\\((.*)\\\\)\\\"\", 'g');\r\n            var childEvent = function (child) { return _this.registerEvent(child, match[1], propertie, match[2].split(', ')); };\r\n            do {\r\n                match = regExp.exec(htmlElement.innerHTML);\r\n                if (match) {\r\n                    window.document.querySelectorAll(_this.selector + \" [\" + match[0] + \"]\").forEach(childEvent);\r\n                }\r\n            } while (match);\r\n        });\r\n        return this;\r\n    };\r\n    /**\r\n     * @param htmlElement\r\n     * @param type\r\n     * @param propertie\r\n     * @param args\r\n     * @returns {ThisType}\r\n     */\r\n    Component.prototype.registerEvent = function (htmlElement, type, propertie, args) {\r\n        var _this = this;\r\n        htmlElement[type] = function () {\r\n            var _a;\r\n            var evaluedArguments = [];\r\n            for (var key in args) {\r\n                evaluedArguments[key] = eval(args[key]);\r\n            }\r\n            if ('undefined' !== typeof (_a = _this)[propertie].apply(_a, evaluedArguments)) {\r\n                _this.update();\r\n            }\r\n        };\r\n        return this;\r\n    };\r\n    return Component;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://appable/./src/components/component.ts?");

/***/ }),

/***/ "./src/components/router.component.ts":
/*!********************************************!*\
  !*** ./src/components/router.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RouterComponent\": () => (/* binding */ RouterComponent)\n/* harmony export */ });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ \"./src/components/component.ts\");\n/* harmony import */ var _services_route_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/route.service */ \"./src/services/route.service.ts\");\n/* harmony import */ var _services_state_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/state.service */ \"./src/services/state.service.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\n\r\n\r\nvar RouterComponent = new /** @class */ (function (_super) {\r\n    __extends(RouterComponent, _super);\r\n    function RouterComponent() {\r\n        var _this = _super.call(this, 'router') || this;\r\n        _this.includePath = '';\r\n        var scripts = window.document.getElementsByTagName('script');\r\n        Object.keys(scripts).some(function (key) {\r\n            var script = scripts[parseInt(key)];\r\n            if (script.src && -1 !== script.src.indexOf('dist/appable.js')) {\r\n                _this.includePath = script.src\r\n                    .replace('/dist/appable.js', '')\r\n                    .replace(window.location.origin, '');\r\n                return true;\r\n            }\r\n            return false;\r\n        });\r\n        return _this;\r\n    }\r\n    /**\r\n     * @param path\r\n     * @param name\r\n     * @param component\r\n     * @returns {ThisType}\r\n     */\r\n    RouterComponent.prototype.add = function (path, name, component) {\r\n        _services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.post(\"\" + this.includePath + path, name, component);\r\n        return this;\r\n    };\r\n    /**\r\n     * @param component\r\n     * @returns {ThisType}\r\n     */\r\n    RouterComponent.prototype.run = function (component) {\r\n        var _this = this;\r\n        window.addEventListener('popstate', function (event) { return _this.onPopstate(event); });\r\n        window.document.addEventListener('pause', function () {\r\n            component.onPause && component.onPause();\r\n            _this.components.forEach(function (component) { return component.onPause && component.onPause(); });\r\n        });\r\n        window.document.addEventListener('resume', function () {\r\n            component.onResume && component.onResume();\r\n            _this.components.forEach(function (component) { return component.onResume && component.onResume(); });\r\n        });\r\n        var param;\r\n        var routes = _services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.get();\r\n        try {\r\n            routes.forEach(function (route) {\r\n                if (_services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.matchLocation(route)) {\r\n                    throw route;\r\n                }\r\n                try {\r\n                    param = _services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.getParam(route);\r\n                }\r\n                catch (error) { }\r\n                if (param) {\r\n                    throw route;\r\n                }\r\n            });\r\n            if (routes.length && !_services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.hasParam(routes[0])) {\r\n                throw routes[0];\r\n            }\r\n        }\r\n        catch (route) {\r\n            _services_state_service__WEBPACK_IMPORTED_MODULE_2__.StateService.put(route, param);\r\n            this.attachRoute(route);\r\n        }\r\n        component.attach(this);\r\n        component.update();\r\n        return this;\r\n    };\r\n    /**\r\n     * @returns {ThisType}\r\n     */\r\n    RouterComponent.prototype.back = function () {\r\n        window.history.back();\r\n        return this;\r\n    };\r\n    /**\r\n     *\r\n     * @param name\r\n     * @param param\r\n     *\r\n     * @throws {ReferenceError} Route not found\r\n     */\r\n    RouterComponent.prototype.navigate = function (name, param) {\r\n        try {\r\n            _services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.get().forEach(function (route) {\r\n                if (name === route.name) {\r\n                    throw route;\r\n                }\r\n            });\r\n        }\r\n        catch (route) {\r\n            if (0 < this.components.length) {\r\n                if (this.components[0] === route.component) {\r\n                    return;\r\n                }\r\n                this.detach(this.components[0]);\r\n            }\r\n            _services_state_service__WEBPACK_IMPORTED_MODULE_2__.StateService.post(route, param);\r\n            this.attach(route);\r\n            this.update();\r\n            return;\r\n        }\r\n        throw new ReferenceError(\"Route \\\"\" + name + \"\\\" not found\");\r\n    };\r\n    /**\r\n     * @param name\r\n     * @returns {Route | string | number}\r\n     *\r\n     * @throws {ReferenceError} Param name not found\r\n     */\r\n    RouterComponent.prototype.get = function (name) {\r\n        if (!name) {\r\n            return this.route;\r\n        }\r\n        var param = _services_state_service__WEBPACK_IMPORTED_MODULE_2__.StateService.get().param[\"\" + name];\r\n        if (!param) {\r\n            throw new ReferenceError(\"There is no param \\\"\" + name + \"\\\" in the curent state\");\r\n        }\r\n        return param;\r\n    };\r\n    /**\r\n     * @param route\r\n     * @returns {ThisType}\r\n     */\r\n    RouterComponent.prototype.attachRoute = function (route) {\r\n        if (route.component instanceof window.Function) {\r\n            var Attachable = route.component;\r\n            route.component = new Attachable();\r\n        }\r\n        this.route = route;\r\n        return this.attach(route.component);\r\n    };\r\n    /**\r\n     * @param event\r\n     * @returns {boolean}\r\n     */\r\n    RouterComponent.prototype.onPopstate = function (event) {\r\n        var _this = this;\r\n        var navigateBack;\r\n        this.components.forEach(function (component) {\r\n            if (component.onBack && false === component.onBack()) {\r\n                navigateBack = false;\r\n            }\r\n        });\r\n        if (false === navigateBack) {\r\n            var state_1 = _services_state_service__WEBPACK_IMPORTED_MODULE_2__.StateService.get();\r\n            _services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.get().some(function (route) {\r\n                if (route.name === state_1.name) {\r\n                    _services_state_service__WEBPACK_IMPORTED_MODULE_2__.StateService.post(route, state_1.param);\r\n                    return true;\r\n                }\r\n                return false;\r\n            });\r\n            return false;\r\n        }\r\n        this.detach(this.components[0]);\r\n        if (event.state) {\r\n            _services_route_service__WEBPACK_IMPORTED_MODULE_1__.RouteService.get().some(function (route) {\r\n                if (event.state.name === route.name) {\r\n                    _services_state_service__WEBPACK_IMPORTED_MODULE_2__.StateService.put(route, event.state.param);\r\n                    _this.attachRoute(route);\r\n                    return true;\r\n                }\r\n                return false;\r\n            });\r\n        }\r\n        this.update();\r\n        return true;\r\n    };\r\n    /**\r\n     * @returns {ThisType}\r\n     */\r\n    RouterComponent.prototype.updateEvents = function () {\r\n        return this;\r\n    };\r\n    return RouterComponent;\r\n}(_component__WEBPACK_IMPORTED_MODULE_0__.Component))();\r\n\n\n//# sourceURL=webpack://appable/./src/components/router.component.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Component\": () => (/* reexport safe */ _components_component__WEBPACK_IMPORTED_MODULE_0__.Component),\n/* harmony export */   \"RouterComponent\": () => (/* reexport safe */ _components_router_component__WEBPACK_IMPORTED_MODULE_1__.RouterComponent),\n/* harmony export */   \"Route\": () => (/* reexport safe */ _models_route_model__WEBPACK_IMPORTED_MODULE_2__.Route),\n/* harmony export */   \"State\": () => (/* reexport safe */ _models_state_model__WEBPACK_IMPORTED_MODULE_3__.State),\n/* harmony export */   \"RouteService\": () => (/* reexport safe */ _services_route_service__WEBPACK_IMPORTED_MODULE_4__.RouteService),\n/* harmony export */   \"Service\": () => (/* reexport safe */ _services_service__WEBPACK_IMPORTED_MODULE_5__.Service),\n/* harmony export */   \"StateService\": () => (/* reexport safe */ _services_state_service__WEBPACK_IMPORTED_MODULE_6__.StateService)\n/* harmony export */ });\n/* harmony import */ var _components_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/component */ \"./src/components/component.ts\");\n/* harmony import */ var _components_router_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/router.component */ \"./src/components/router.component.ts\");\n/* harmony import */ var _models_route_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/route.model */ \"./src/models/route.model.ts\");\n/* harmony import */ var _models_state_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/state.model */ \"./src/models/state.model.ts\");\n/* harmony import */ var _services_route_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/route.service */ \"./src/services/route.service.ts\");\n/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/service */ \"./src/services/service.ts\");\n/* harmony import */ var _services_state_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/state.service */ \"./src/services/state.service.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://appable/./src/index.ts?");

/***/ }),

/***/ "./src/models/route.model.ts":
/*!***********************************!*\
  !*** ./src/models/route.model.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Route\": () => (/* binding */ Route)\n/* harmony export */ });\nvar Route = /** @class */ (function () {\r\n    /**\r\n     * @param path\r\n     * @param name\r\n     * @param component\r\n     */\r\n    function Route(path, name, component) {\r\n        this.path = path;\r\n        this.name = name;\r\n        this.component = component;\r\n    }\r\n    return Route;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://appable/./src/models/route.model.ts?");

/***/ }),

/***/ "./src/models/state.model.ts":
/*!***********************************!*\
  !*** ./src/models/state.model.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"State\": () => (/* binding */ State)\n/* harmony export */ });\nvar State = /** @class */ (function () {\r\n    function State() {\r\n    }\r\n    return State;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://appable/./src/models/state.model.ts?");

/***/ }),

/***/ "./src/services/route.service.ts":
/*!***************************************!*\
  !*** ./src/services/route.service.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RouteService\": () => (/* binding */ RouteService)\n/* harmony export */ });\n/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ \"./src/services/service.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar RouteService = new /** @class */ (function (_super) {\r\n    __extends(RouteService, _super);\r\n    function RouteService() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.routes = [];\r\n        return _this;\r\n    }\r\n    /**\r\n     * @returns {Route[]}\r\n     */\r\n    RouteService.prototype.get = function () {\r\n        return this.routes;\r\n    };\r\n    /**\r\n     * @param path\r\n     * @param name\r\n     * @param component\r\n     *\r\n     * @throws {ReferenceError} Route already added\r\n     */\r\n    RouteService.prototype.post = function (path, name, component) {\r\n        this.routes.forEach(function (route) {\r\n            if (path === route.path) {\r\n                throw new ReferenceError(\"Can't add route: path \\\"\" + path + \"\\\" already exists\");\r\n            }\r\n            if (name === route.name) {\r\n                throw new ReferenceError(\"Can't add route: name \\\"\" + name + \"\\\" already exists\");\r\n            }\r\n        });\r\n        this.routes.push({ path: path, name: name, component: component });\r\n    };\r\n    /**\r\n     * @param route\r\n     * @returns {boolean}\r\n     */\r\n    RouteService.prototype.matchLocation = function (route) {\r\n        return !this.hasParam(route) && route.path === window.location.pathname;\r\n    };\r\n    /**\r\n     * @param {Route} route\r\n     * @returns {Boolean}\r\n     */\r\n    RouteService.prototype.hasParam = function (route) {\r\n        return -1 !== route.path.indexOf(':');\r\n    };\r\n    /**\r\n     * @param route\r\n     * @returns { { [key: string]: string | number } }\r\n     *\r\n     * @throws {Error} Location and route do not match\r\n     * @throws {Error} Route slug is not populated\r\n     */\r\n    RouteService.prototype.getParam = function (route) {\r\n        var param = {};\r\n        var explosedPath = window.location.pathname.split('/');\r\n        var explosedRoute = route.path.split('/');\r\n        if (explosedPath.length !== explosedRoute.length) {\r\n            throw new Error('Location path length is different to route path length');\r\n        }\r\n        Object.keys(explosedPath).forEach(function (key) {\r\n            var routePart = explosedRoute[key];\r\n            var pathPart = explosedPath[key];\r\n            if (':' === routePart[0]) {\r\n                param[routePart.replace(':', '')] = pathPart;\r\n            }\r\n            else if (pathPart !== routePart) {\r\n                throw new Error(\"Route part \\\"\" + routePart + \"\\\" not found\");\r\n            }\r\n        });\r\n        Object.keys(param).forEach(function (key) {\r\n            if (\":\" + key === param[key]) {\r\n                throw new Error(\"Route slug \\\"\" + key + \"\\\" is not populated\");\r\n            }\r\n        });\r\n        return param;\r\n    };\r\n    return RouteService;\r\n}(_service__WEBPACK_IMPORTED_MODULE_0__.Service))();\r\n\n\n//# sourceURL=webpack://appable/./src/services/route.service.ts?");

/***/ }),

/***/ "./src/services/service.ts":
/*!*********************************!*\
  !*** ./src/services/service.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Service\": () => (/* binding */ Service)\n/* harmony export */ });\nvar Service = /** @class */ (function () {\r\n    function Service() {\r\n        this.callables = [];\r\n    }\r\n    /**\r\n     * @param callable\r\n     * @returns {ThisType}\r\n     */\r\n    Service.prototype.attach = function (callable) {\r\n        this.callables.push(callable);\r\n        return this;\r\n    };\r\n    /**\r\n     * @param callable\r\n     * @returns {ThisType}\r\n     */\r\n    Service.prototype.detach = function (callable) {\r\n        var index = this.callables.indexOf(callable);\r\n        if (-1 !== index) {\r\n            this.callables.splice(index, 1);\r\n        }\r\n        return this;\r\n    };\r\n    /**\r\n     * @returns {ThisType}\r\n     */\r\n    Service.prototype.notify = function () {\r\n        var _this = this;\r\n        this.callables.forEach(function (callable) { return callable(_this); });\r\n        return this;\r\n    };\r\n    return Service;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://appable/./src/services/service.ts?");

/***/ }),

/***/ "./src/services/state.service.ts":
/*!***************************************!*\
  !*** ./src/services/state.service.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StateService\": () => (/* binding */ StateService)\n/* harmony export */ });\n/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ \"./src/services/service.ts\");\n/* harmony import */ var _models_state_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/state.model */ \"./src/models/state.model.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\n\r\nvar StateService = new /** @class */ (function (_super) {\r\n    __extends(StateService, _super);\r\n    function StateService() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.state = new _models_state_model__WEBPACK_IMPORTED_MODULE_1__.State();\r\n        return _this;\r\n    }\r\n    /**\r\n     * @returns {State}\r\n     */\r\n    StateService.prototype.get = function () {\r\n        return this.state;\r\n    };\r\n    /**\r\n     * @param route\r\n     * @param param\r\n     * @returns {boolean}\r\n     */\r\n    StateService.prototype.post = function (route, param) {\r\n        return this.history(route, param);\r\n    };\r\n    /**\r\n     * @param route\r\n     * @param param\r\n     * @returns {boolean}\r\n     */\r\n    StateService.prototype.put = function (route, param) {\r\n        return this.history(route, param, true);\r\n    };\r\n    /**\r\n     * @param route\r\n     * @param param\r\n     * @param replace\r\n     * @returns {boolean}\r\n     *\r\n     * @throws {Error} Route slug do not match State param\r\n     */\r\n    StateService.prototype.history = function (route, param, replace) {\r\n        var _this = this;\r\n        if (param === void 0) { param = {}; }\r\n        if (replace === void 0) { replace = false; }\r\n        route.path.split('/').forEach(function (key) {\r\n            if (':' === key[0] && 'undefined' === typeof param[key.substring(1)]) {\r\n                throw new Error(\"Slug \\\"\" + key + \"\\\" is missing in param\");\r\n            }\r\n        });\r\n        Object.keys(param).forEach(function (key) {\r\n            if (-1 === route.path.indexOf(\":\" + key)) {\r\n                throw new Error(\"Param \\\"\" + key + \"\\\" is missing in \\\"\" + route.path + \"\\\"\");\r\n            }\r\n        });\r\n        var path = route.path;\r\n        this.state.name = route.name;\r\n        this.state.param = param;\r\n        Object.keys(this.state.param).forEach(function (key) { return path = path.replace(\":\" + key, \"\" + _this.state.param[key]); });\r\n        if (replace) {\r\n            window.history.replaceState(this.state, route.name, path);\r\n            this.notify();\r\n            return false;\r\n        }\r\n        window.history.pushState(this.state, route.name, path);\r\n        this.notify();\r\n        return true;\r\n    };\r\n    return StateService;\r\n}(_service__WEBPACK_IMPORTED_MODULE_0__.Service))();\r\n\n\n//# sourceURL=webpack://appable/./src/services/state.service.ts?");

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