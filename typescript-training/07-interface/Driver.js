"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChicketCoach_1 = require("./ChicketCoach");
var GolfCoach_1 = require("./GolfCoach");
var myCricketCoach = new ChicketCoach_1.CircketCoach();
var myGolfCoach = new GolfCoach_1.GolfCoach();
//declare an array for coaches .. initially empty
var theCocah = [];
//add the coachess to the array
theCocah.push(myCricketCoach, myGolfCoach);
theCocah.forEach(function (tempCoach) {
    console.log(tempCoach.getDailyWorkout());
});
