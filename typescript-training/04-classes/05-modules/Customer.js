"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
var Customer = /** @class */ (function () {
    function Customer(_firstName, _lastName) {
        this._firstName = _firstName;
        this._lastName = _lastName;
    }
    Object.defineProperty(Customer.prototype, "firstName", {
        /**
         * Getter firstName
         * @return {string}
         */
        get: function () {
            return this._firstName;
        },
        /**
         * Setter firstName
         * @param {string} value
         */
        set: function (value) {
            this._firstName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "lastName", {
        /**
         * Getter lastName
         * @return {string}
         */
        get: function () {
            return this._lastName;
        },
        /**
         * Setter lastName
         * @param {string} value
         */
        set: function (value) {
            this._lastName = value;
        },
        enumerable: false,
        configurable: true
    });
    return Customer;
}());
exports.Customer = Customer;
//let's create av instance
// let myCustomer1 = new Customer(); //這樣空白會跳錯誤 因為上面有兩個變數要填
// myCustomer1.firstName = "firstName1";
// myCustomer1.lastName = "lastName1";
// console.log(myCustomer1.firstName);
// console.log(myCustomer1.lastName);
//------------------------
