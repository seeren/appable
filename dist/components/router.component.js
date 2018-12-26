"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterComponent = void 0;

var _component = require("./component");

var _router = require("../services/router.service");

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