import { CircketCoach } from "./ChicketCoach";
import { Coach } from "./Coach";
import { GolfCoach } from "./GolfCoach";

let myCricketCoach = new CircketCoach();
let myGolfCoach = new GolfCoach();

//declare an array for coaches .. initially empty
let theCocah: Coach[] = [];
//add the coachess to the array
theCocah.push(myCricketCoach,myGolfCoach);

theCocah.forEach(tempCoach => {
    console.log(tempCoach.getDailyWorkout());
});