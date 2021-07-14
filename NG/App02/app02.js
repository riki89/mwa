var x = 5;
console.log(x);
var myName;
myName = "Jack";
console.log(myName);
var something;
something = 5;
something = "test";
var otherthing;
var grades = [2.3, 3.5];
var myArray = [2.5, "Jack"];
var myOtherArray;
var Color;
(function (Color) {
    Color[Color["REG"] = 0] = "REG";
    Color[Color["GREEN"] = 100] = "GREEN";
    Color[Color["BLUE"] = 101] = "BLUE";
})(Color || (Color = {}));
;
var myColor = Color.BLUE;
console.log("My color is ", myColor);
var course;
var courses;
var OnCampusCourse = /** @class */ (function () {
    function OnCampusCourse(title, capacity, instructor) {
        this.title = title;
        this.capacity = capacity;
        this.instructor = instructor;
        //this is mandatory here
    }
    OnCampusCourse.university = "MIU";
    return OnCampusCourse;
}());
var cs572 = new OnCampusCourse("MWA", 25, "Najeeb");
// console.log(cs572);
console.log(cs572.title);
