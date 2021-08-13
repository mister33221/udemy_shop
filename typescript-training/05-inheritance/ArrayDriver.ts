import { Shape } from "./Shape";
import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";

console.log("Driver")

let myShape = new Shape(10,15);


let myCircle = new Circle(5,10,20);


let myRectangle = new Rectangle(1,0,3,7);


//declare an array of shapes ... initially empty
let theShapeA: Shape[] = [];
let theShapeB: Shape[] = [];
//add the sjapes to  the array 這個陣列裡面就只能放shape 如果放不同型別就會錯誤
theShapeA.push(myShape,myCircle,myRectangle);

theShapeB.push(myShape);
theShapeB.push(myCircle);
theShapeB.push(myRectangle);

theShapeA.forEach(tempShape => {
    console.log("A" + tempShape.getInfo());
    
});

theShapeB.forEach(tempShape => {
    console.log("B" + tempShape.getInfo());
});
