document.getElementById("runDemo").addEventListener("click", () => {
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = ""; // Clear previous output

  // ---  let and const ---
  const instituteName = "Global Tech Academy";
  let courseName = "Advanced Full Stack Development";

  const intro = document.createElement("div");
  intro.className = "section";
  intro.innerHTML = `
    <h3> Course Information</h3>
    <p><strong>Institute:</strong> ${instituteName}</p>
    <p><strong>Course:</strong> ${courseName}</p>
  `;
  outputDiv.appendChild(intro);

  // ---  Spread Operator ---
  const coreSubjects = ["HTML", "CSS", "JavaScript"];
  const advancedSubjects = ["React", "Node.js", "MongoDB", "Express"];
  const allSubjects = [...coreSubjects, ...advancedSubjects];

  const subjectsDiv = document.createElement("div");
  subjectsDiv.className = "section";
  subjectsDiv.innerHTML = `
    <h3> Subjects </h3>
    <p><strong>All Subjects:</strong> ${allSubjects.join(", ")}</p>
  `;
  outputDiv.appendChild(subjectsDiv);

  // ---  Arrow Function ---
  const greet = name => `👋 Welcome, ${name}! We're excited to have you onboard.`;

  const greetDiv = document.createElement("div");
  greetDiv.className = "section";
  greetDiv.innerHTML = `
    <h3> Greeting </h3>
    <p>${greet("David Warner")}</p>
  `;
  outputDiv.appendChild(greetDiv);

  // ---  Class and Objects ---
  class Student {
    constructor(name, age, skills) {
      this.name = name;
      this.age = age;
      this.skills = skills;
    }
    display() {
      return `
        <div class="student-card">
          <p><strong>Name:</strong> ${this.name}</p>
          <p><strong>Age:</strong> ${this.age}</p>
          <p><strong>Skills:</strong> ${this.skills.join(", ")}</p>
        </div>
      `;
    }
  }

  // Student objects
  const student1 = new Student("David Warner", 24, ["HTML", "CSS", "JavaScript", "React"]);
  const student2 = new Student("Steve Smith", 25, ["Node.js", "Express", "MongoDB", "JavaScript"]);
  const student3 = new Student("Virat Kohli", 28, ["Node.js", "Java", "MongoDB", "JavaScript"]);
  const student4 = new Student("Rohit Sharma", 30, ["Node.js", "Express", "MongoDB", "JavaScript"]);

  const studentDiv = document.createElement("div");
  studentDiv.className = "section";
  studentDiv.innerHTML = `
    <h3> Student Details </h3>
    ${student1.display()}
    ${student2.display()}
    ${student3.display()}
    ${student4.display()}
  `;
  outputDiv.appendChild(studentDiv);

  // ---  Map Object ---
  const studentGrades = new Map();
  studentGrades.set("David Warner", "A");
  studentGrades.set("Steve Smith", "A+");
  studentGrades.set("Virat Kohli", "A+");
  studentGrades.set("Rohit Sharma", "A+");

  const gradesDiv = document.createElement("div");
  gradesDiv.className = "section";
  gradesDiv.innerHTML = "<h3>🏅 Student Grades </h3>";

  const gradeList = document.createElement("ul");
  for (const [name, grade] of studentGrades) {
    const li = document.createElement("li");
    li.textContent = `${name}: ${grade}`;
    gradeList.appendChild(li);
  }
  gradesDiv.appendChild(gradeList);
  outputDiv.appendChild(gradesDiv);

  // ---  Set Object ---
  const allSkills = new Set([...student1.skills, ...student2.skills]);

  const skillsDiv = document.createElement("div");
  skillsDiv.className = "section";
  skillsDiv.innerHTML = `
    <h3> Unique Skills </h3>
    <p>${[...allSkills].join(", ")}</p>
  `;
  outputDiv.appendChild(skillsDiv);
});
