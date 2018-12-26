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