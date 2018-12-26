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