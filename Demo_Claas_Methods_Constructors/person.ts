export class Person {
   public  name: string;
    protected age: number;   
    readonly institute : string;
    private id : number;
    static counter: number = 0;

    constructor(name: string, age: number, institute: string) {
        this.name = name;
        this.age = age;
        this.institute = institute;
        this.id = ++Person.counter;
    }

    // we are defining constructor to initialize the properties of the class
    public greet(): string {
        return `Hello, my name is ${this.name}, I am ${this.age} years old and I study at ${this.institute}. My ID is ${this.id}.`;
    }
    // protected method to get age and it can be accessed in derived classes
    protected getAge(): number {
        return this.age;
    }

    // method to show private id within the class
    public showId(): number {
        return this.id;
    }
}

// closing the class definition

// now we will create a student class which will inherit the person class
export class Student extends Person {
    private skills: string[]

    constructor(name: string, age: number, institute: string, skills: string[]) {
        super(name, age, institute);
        this.skills = skills;
    }

    public getStudentDetails(): string {
        return `${this.greet()} I have skills in: ${this.skills.join(", ")}. My age is ${this.getAge()}.`;
    }   

    //Method to add a new skill to the skills array
    public addSkill(skill: string): void {  
        this.skills.push(skill);
    }

    //  a method to display protected age from the base class
    public display(): void {
        console.log(`My age is: ${this.getAge()} years and my skills are: ${this.skills.join(", ")}`);
}
}

// closing the student class definition


