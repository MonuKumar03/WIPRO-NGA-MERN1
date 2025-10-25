// here we will have jsvascript code for To Do Application
// With the help of DOM manipulation we will create a To Do Application

// Select DOM elements
const todoInput = document.getElementById("taskInput");
const addButton = document.getElementById("addTaskButton");
const deleteButton = document.getElementById("deleteTaskButton");
const todoList = document.getElementById("taskList");

// Function to add a new task
function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;

  // Toggle 'selected' class when clicked
  li.addEventListener("click", function () {
    li.classList.toggle("selected");
  });

  todoList.appendChild(li);
  todoInput.value = "";
}

// Function to delete only selected tasks
function deleteCompletedTasks() {
  const selectedTasks = todoList.querySelectorAll("li.selected");
  selectedTasks.forEach(task => task.remove());
}

// Add event listeners
addButton.addEventListener("click", addTask);
deleteButton.addEventListener("click", deleteCompletedTasks);

// Add task using Enter key
todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
