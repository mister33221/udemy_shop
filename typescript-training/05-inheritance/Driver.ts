import { Shape } from "./Shape";
import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";

console.log("Driver")

let myShape = new Shape(10,15);
console.log(myShape.getInfo());

let myCircle = new Circle(5,10,20);
console.log(myCircle.getInfo());

let myRectangle = new Rectangle(1,0,3,7);
console.log(myRectangle.getInfo());