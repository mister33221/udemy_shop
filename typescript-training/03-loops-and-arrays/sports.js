var sports = ["1", "2", "3", "4", "5"];
console.log("loop 1 -");
for (var i = 0; i < sports.length; i++) {
    console.log(sports[i]);
}
console.log("loop 2 -");
sports.forEach(function (element) {
    console.log(element);
});
console.log("loop 3 -");
for (var _i = 0, sports_1 = sports; _i < sports_1.length; _i++) {
    var sport = sports_1[_i];
    if (sport == "3") {
        console.log(sport + "fuck it!");
    }
    else {
        console.log(sport);
    }
}
