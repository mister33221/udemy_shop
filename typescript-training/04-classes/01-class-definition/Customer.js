var Customer = /** @class */ (function () {
    function Customer(theFirst, theLast) {
        this.firstName = theFirst;
        this.lastName = theLast;
    }
    return Customer;
}());
//let's create av instance
// let myCustomer1 = new Customer(); //這樣空白會跳錯誤 因為上面有兩個變數要填
// myCustomer1.firstName = "firstName1";
// myCustomer1.lastName = "lastName1";
// console.log(myCustomer1.firstName);
// console.log(myCustomer1.lastName);
//------------------------
var myCustomer2 = new Customer("firstName2", "lastName2");
console.log(myCustomer2.firstName);
console.log(myCustomer2.lastName);
