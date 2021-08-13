"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = void 0;
var Shape = /** @class */ (function () {
    function Shape(_x, _y) {
        this._x = _x;
        this._y = _y;
    }
    Object.defineProperty(Shape.prototype, "x", {
        /**
         * Getter x
         * @return {number}
         */
        get: function () {
            return this._x;
        },
        /**
         * Setter x
         * @param {number} value
         */
        set: function (value) {
            this._x = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "y", {
        /**
         * Getter y
         * @return {number}
         */
        get: function () {
            return this._y;
        },
        /**
         * Setter y
         * @param {number} value
         */
        set: function (value) {
            this._y = value;
        },
        enumerable: false,
        configurable: true
    });
    Shape.prototype.getInfo = function () {
        return "x=" + this._x + ", y=" + this._y;
    };
    return Shape;
}());
exports.Shape = Shape;
