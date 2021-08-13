let sports: string[] = ["1","2","3","4","5"];

console.log("loop 1 -");
for (let i = 0; i < sports.length; i++) {
    console.log( sports[i]);    
}

console.log("loop 2 -");
sports.forEach(element => {
    console.log(element);
});

console.log("loop 3 -");
for(let sport of sports){

    if (sport == "3") {
        console.log(sport + "fuck it!")
    } else {
        console.log(sport);
    }

}