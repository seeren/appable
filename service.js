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
