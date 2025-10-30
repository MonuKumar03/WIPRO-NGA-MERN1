export class Person {
    constructor(name, age, institute) {
        this.name = name;
        this.age = age;
        this.institute = institute;
        this.id = ++Person.counter;
    }
    // we are defining constructor to initialize the properties of the class
    greet() {
        return `Hello, my name is ${this.name}, I am ${this.age} years old and I study at ${this.institute}. My ID is ${this.id}.`;
    }
    // protected method to get age and it can be accessed in derived classes
    getAge() {
        return this.age;
    }
    // method to show private id within the class
    showId() {
        return this.id;
    }
}
Person.counter = 0;
// closing the class definition
// now we will create a student class which will inherit the person class
export class Student extends Person {
    constructor(name, age, institute, skills) {
        super(name, age, institute);
        this.skills = skills;
    }
    getStudentDetails() {
        return `${this.greet()} I have skills in: ${this.skills.join(", ")}. My age is ${this.getAge()}.`;
    }
    //Method to add a new skill to the skills array
    addSkill(skill) {
        this.skills.push(skill);
    }
    //  a method to display protected age from the base class
    display() {
        console.log(`My age is: ${this.getAge()} years and my skills are: ${this.skills.join(", ")}`);
    }
}
// closing the student class definition
