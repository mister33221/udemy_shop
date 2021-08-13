"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Circle_1 = require("./Circle");
var Rectangle_1 = require("./Rectangle");
console.log("Driver");
var myCircle = new Circle_1.Circle(5, 10, 20);
var myRectangle = new Rectangle_1.Rectangle(1, 0, 3, 7);
//declare an array of shapes ... initially empty
var theShapeA = [];
var theShapeB = [];
//add the sjapes to  the array 這個陣列裡面就只能放shape 如果放不同型別就會錯誤
theShapeA.push(myCircle, myRectangle);
theShapeB.push(myCircle);
theShapeB.push(myRectangle);
theShapeA.forEach(function (tempShape) {
    console.log("A" + tempShape.getInfo());
});
theShapeB.forEach(function (tempShape) {
    console.log("B" + tempShape.getInfo());
    console.log("B" + tempShape.calculateArea());
    console.log();
});
