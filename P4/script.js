// Revealing Module Pattern for structured code
const DataModule = (function () {
  const POSTS_API = "https://jsonplaceholder.typicode.com/posts";
  const TODOS_API = "https://jsonplaceholder.typicode.com/todos";

  // Fetch data helper
  async function fetchData(url) {
    try {
      const response = await fetch(url);

      // Handle bad response
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Validate if array
      if (!Array.isArray(data)) {
        throw new Error("Unexpected data format received.");
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Expose methods
  return {
    getPosts: () => fetchData(POSTS_API),
    getTodos: () => fetchData(TODOS_API),
  };
})();

const UIModule = (function () {
  const postsContainer = document.getElementById("posts");
  const todosContainer = document.getElementById("todos");
  const postsError = document.getElementById("postsError");
  const todosError = document.getElementById("todosError");

  // Render posts
  function displayPosts(posts) {
    postsContainer.innerHTML = "";
    posts.slice(0, 10).forEach((post) => {
      const div = document.createElement("div");
      div.classList.add("post");
      div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `;
      postsContainer.appendChild(div);
    });
  }

  // Render todos
  function displayTodos(todos) {
    todosContainer.innerHTML = "";
    todos.slice(0, 10).forEach((todo) => {
      const div = document.createElement("div");
      div.classList.add("todo");
      if (todo.completed) div.classList.add("completed");
      div.textContent = todo.title;
      todosContainer.appendChild(div);
    });
  }

  // Display error
  function showError(type, message) {
    if (type === "posts") postsError.textContent = message;
    else if (type === "todos") todosError.textContent = message;
  }

  return {
    displayPosts,
    displayTodos,
    showError,
  };
})();

const AppController = (function (DataCtrl, UICtrl) {
  async function init() {
    try {
      const posts = await DataCtrl.getPosts();
      UICtrl.displayPosts(posts);
    } catch (err) {
      UICtrl.showError("posts", "❌ Failed to load posts. Please try again later.");
    }

    try {
      const todos = await DataCtrl.getTodos();
      UICtrl.displayTodos(todos);
    } catch (err) {
      UICtrl.showError("todos", "❌ Failed to load todos. Please try again later.");
    }
  }

  // Initialize app
  return {
    init,
  };
})(DataModule, UIModule);

// Run the app
AppController.init();
