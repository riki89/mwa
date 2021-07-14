let x = 5;
console.log(x);

let myName:string;
myName = "Jack";

console.log(myName);

let something:any;
something = 5;
something = "test";

let otherthing:unknown;

let grades = [2.3, 3.5];

let myArray = [2.5, "Jack"];
let myOtherArray: (string | boolean)[];

enum Color {
    REG, GREEN = 100, BLUE
};
let myColor:Color = Color.BLUE;
console.log("My color is ", myColor);

let course : string | number;
let courses: (string|number)[];

interface Course {
    title: string;
    capacity: number;
}
class CourseClass {
    title: string;
    capacity: number;
    constructor(title:string, capacity:number){
        this.title = title;
        this.capacity = capacity;
    }
}

class OnCampusCourse extends CourseClass implements Course{
    // title: string;
    // capacity: number;
    static university:string = "MIU";
    private instructor: string;

    constructor(title:string, capacity:number, instructor:string){
        super(title, capacity);
        this.instructor = instructor;
    }
}

let cs572: CourseClass = new OnCampusCourse("MWA", 25, "Najeeb");
// console.log(cs572);
console.log(cs572);

