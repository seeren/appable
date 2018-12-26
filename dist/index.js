"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @type {Component}
 */
var Component =
/*#__PURE__*/
function () {
  /**
   * @constructor
   * @param {Object} options
   */
  function Component(options) {
    var _this = this;

    _classCallCheck(this, Component);

    this.row = 0;
    this.components = [];
    this.selector = options.selector;
    this.template = options.template;

    if (options.components) {
      options.components.forEach(function (component) {
        return _this.attach(component, true);
      });
    }

    window.document.createElement(options.selector);
  }
  /**
   * @param {string} hook 
   */


  _createClass(Component, [{
    key: "lifeCycle",
    value: function lifeCycle(hook) {
      if (this[hook]) {
        this[hook]();
      }

      this.components.forEach(function (component) {
        return component.lifeCycle(hook);
      });
    }
    /**
     * @param {Component} component
     * @param {bool} replace
     * @returns {this}
     */

  }, {
    key: "attach",
    value: function attach(component, replace) {
      this.detach(component);
      var attribute = "data-".concat(this.selector.split("[")[0], "=\"").concat(this.row, "\"");
      var selector = component.selector.split("[")[0];
      var endTag = "</".concat(selector, ">");
      var container = "<".concat(selector, " ").concat(attribute, ">").concat(endTag);
      component.selector = "".concat(selector, "[").concat(attribute, "]");
      this.components.push(component);
      this.row++;

      if (replace) {
        this.template = this.template.replace("<".concat(selector, ">").concat(endTag), container);
      } else {
        this.template += container;
        this.lifeCycle("onInit");
      }

      return this;
    }
    /** 
     * @param {Component}
     * @returns {this}
     */

  }, {
    key: "detach",
    value: function detach(component) {
      var index = this.components.indexOf(component);

      if (index > -1) {
        var selectorSplit = component.selector.split("[");
        var selector = selectorSplit[0];
        var attributes = " ".concat(selectorSplit[1].replace("]", ""));
        this.lifeCycle("onDestroy");
        this.components.splice(index, 1);
        this.template = this.template.replace("<".concat(selector + attributes, "></").concat(selector, ">"), "");
        this.row--;
        component.selector = "".concat(selector);
      }

      return this;
    }
    /**
     * @returns {this}
     */

  }, {
    key: "update",
    value: function update() {
      var _this2 = this;

      var vars = "";
      var htmlElement = window.document.querySelector(this.selector);
      var properties = window.Object.getOwnPropertyNames(this).slice(4).concat(window.Object.getOwnPropertyNames(this.constructor.prototype).slice(1));
      properties.forEach(function (varName) {
        vars += "var ".concat(varName, " = this[\"").concat(varName, "\"]");

        if (_this2[varName] instanceof window.Function) {
          vars += ".bind(this)";
        }

        vars += ";";
      });
      htmlElement.innerHTML = eval(vars + '`' + this.template + '`');
      this.updateEvents(htmlElement, properties);
      this.components.forEach(function (component) {
        return component.update(component);
      });

      if (this.onUpdate) {
        this.onUpdate(htmlElement);
      }

      return this;
    }
    /**
     * @param {HTMLElement} htmlElement 
     * @param {Array} properties 
     */

  }, {
    key: "updateEvents",
    value: function updateEvents(htmlElement, properties) {
      var _this3 = this;

      var match;
      properties.forEach(function (propertie) {
        var regExp = new window.RegExp("(on[a-zA-Z]{4,16})=\"".concat(propertie, "\\((.*)\\)\""), "g");

        while (match = regExp.exec(htmlElement.innerHTML)) {
          window.document.querySelectorAll("".concat(_this3.selector, " [").concat(match[0], "]")).forEach(function (child) {
            return _this3.registerEvent(child, match[1], propertie, match[2].split(", "));
          });
        }
      });
    }
    /**
     * @param {HTMLElement} htmlElement 
     * @param {string} type 
     * @param {string} propertie 
     * @param {Array} args 
     */

  }, {
    key: "registerEvent",
    value: function registerEvent(htmlElement, type, propertie, args) {
      var _this4 = this;

      htmlElement[type] = function () {
        var evaluedArguments = [];

        for (var key in args) {
          evaluedArguments[key] = eval(args[key]);
        }

        if (undefined !== _this4[propertie].apply(_this4, evaluedArguments)) {
          _this4.update();
        }
      };
    }
  }]);

  return Component;
}();

exports.Component = Component;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function get() {
    return _component.default;
  }
});
Object.defineProperty(exports, "RouterComponent", {
  enumerable: true,
  get: function get() {
    return _router.default;
  }
});
Object.defineProperty(exports, "Service", {
  enumerable: true,
  get: function get() {
    return _service.default;
  }
});
Object.defineProperty(exports, "RouterService", {
  enumerable: true,
  get: function get() {
    return _router2.default;
  }
});

var _component = _interopRequireDefault(require("./component"));

var _router = _interopRequireDefault(require("./router.component"));

var _service = _interopRequireDefault(require("./service"));

var _router2 = _interopRequireDefault(require("./router.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterComponent = void 0;

var _component = require("./component");

var _router = require("./router.service");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * @type {Array}
 */
var routes = [];
/**
 * @type {Router}
 */

var RouterComponent = new (
/*#__PURE__*/
function (_Component) {
  _inherits(_class, _Component);

  /**
   * @constructor
   */
  function _class() {
    var _this;

    _classCallCheck(this, _class);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, {
      selector: "router",
      template: ""
    }));
    window.onpopstate = _this.onpopstate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }
  /**
   * @param {Event} e 
   */


  _createClass(_class, [{
    key: "onpopstate",
    value: function onpopstate(e) {
      this.detach(this.components[0]);

      if (e.state) {
        _router.RouterService.put(this, routes.find(function (route) {
          return e.state.name === route.name;
        }), e.state.param);
      }

      this.update();
    }
    /**
     * @returns {void}
     */

  }, {
    key: "back",
    value: function back() {
      window.history.back();
    }
    /**
     * @param {string} name 
     * @param {Object} param 
     */

  }, {
    key: "navigate",
    value: function navigate(name, param) {
      var route = routes.find(function (route) {
        return name === route.name;
      });

      if (route.component !== this.components[0]) {
        this.detach(this.components[0]);

        _router.RouterService.put(this, route, param, true);

        this.update();
      }
    }
    /**
     * @param {String} name
     * @returns {mixed} 
     */

  }, {
    key: "get",
    value: function get(name) {
      return _router.RouterService.get().param[name];
    }
    /**
     * @param {string} path 
     * @param {string} name 
     * @param {Function} component 
     * @returns {this}
     */

  }, {
    key: "add",
    value: function add(path, name, component) {
      routes.push({
        name: name,
        path: path,
        component: component
      });
      return this;
    }
    /**
     * @param {Component} component 
     */

  }, {
    key: "run",
    value: function run(component) {
      var param = {};
      var route = routes.find(function (route) {
        if (route.path === window.location.pathname) {
          return true;
        }

        var explosedPath = window.location.pathname.split("/");
        var explosedRoute = route.path.split("/");

        if (explosedPath.length !== explosedRoute.length) {
          return false;
        }

        for (var key in explosedPath) {
          if (":" === explosedRoute[key][0]) {
            param[explosedRoute[key].replace(":", "")] = explosedPath[key];
          } else if (explosedPath[key] !== explosedRoute[key]) {
            param = {};
            return false;
          }
        }

        return true;
      });

      if (route) {
        _router.RouterService.put(this, route, param);
      } else if (routes.length) {
        _router.RouterService.put(this, routes[0]);
      }

      component.attach(this, true).update();
    }
  }]);

  return _class;
}(_component.Component))();
exports.RouterComponent = RouterComponent;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterService = void 0;

var _service = require("./service");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RouterService = new (
/*#__PURE__*/
function (_Service) {
  _inherits(RouterService, _Service);

  /**
   * @constructor
   */
  function RouterService() {
    var _this;

    _classCallCheck(this, RouterService);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RouterService).call(this));
    _this.state = {};
    return _this;
  }
  /**
   * @returns {Object}
   */


  _createClass(RouterService, [{
    key: "get",
    value: function get() {
      return this.state;
    }
    /**
     * @param {RouterComponent} router
     * @param {Object} route
     * @param {Object} param
     * @param {boolean} push 
     */

  }, {
    key: "put",
    value: function put(router, route, param, push) {
      var path = route.path;
      this.state.name = route.name;
      this.state.param = param || {};

      for (var prop in this.state.param) {
        path = path.replace(":" + prop, this.state.param[prop]);
      }

      if (route.component instanceof window.Function) {
        route.component = new route.component();
      }

      window.history[push ? "pushState" : "replaceState"](this.state, route.name, path);
      router.attach(route.component);
      this.notify();
    }
  }]);

  return RouterService;
}(_service.Service))();
exports.RouterService = RouterService;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Service = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @type {Service}
 */
var Service =
/**
 * @constructor
 */
function Service() {
  var _this = this;

  _classCallCheck(this, Service);

  /**
   * @type {Array}
   */
  var callback = [];
  /**
   * @param {Function} callable
   */

  this.attach = function (callable) {
    return callback.push(callable);
  };
  /**
   * @returns {void}
   */


  this.notify = function () {
    return callback.forEach(function (callable) {
      return callable(_this);
    });
  };
  /**
   * @param {Function} callable 
   */


  this.detach = function (callable) {
    for (var key in callback) {
      if (callable === callback[key]) {
        callback.splice(key, 1);
        break;
      }
    }
  };
};

exports.Service = Service;
