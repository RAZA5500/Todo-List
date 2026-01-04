// Selecting DOM elements
var input = document.getElementById("todo-input");
var addButton = document.getElementById("add-btn");
var todoList = document.getElementById("todo-list");

// Load saved todos from localStorage
var savedTodos = localStorage.getItem("todos");
var todos = savedTodos ? JSON.parse(savedTodos) : [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Create todo DOM node
function createTodoNode(todo, index) {
    var li = document.createElement("li");

    // checkbox
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", function () {
        todo.completed = checkbox.checked;
        span.style.textDecoration = todo.completed ? "line-through" : "none";
        saveTodos();
    });

    // todo text
    var span = document.createElement("span");
    span.textContent = todo.text;
    span.style.margin = "0 5px";
    span.style.textDecoration = todo.completed ? "line-through" : "none";

    // double click to edit
    span.addEventListener("dblclick", function () {
        var newText = prompt("Edit todo:", todo.text);
        if (newText && newText.trim()) {
            todo.text = newText.trim();
            span.textContent = todo.text;
            saveTodos();
        }
    });

    // delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
        todos.splice(index, 1);
        renderTodos();
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
}

// Render todos
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach(function (todo, index) {
        var node = createTodoNode(todo, index);
        console.log(node , todo , todos);
        todoList.appendChild(node);
    });
}

// Add new todo
function addTodo() {
    var text = input.value.trim();
    if (!text) return;

    todos.push({ text: text, completed: false });
    input.value = "";
    renderTodos();
    saveTodos();
}

addButton.addEventListener("click", addTodo);
input.addEventListener('keydown' , function (e) {
    if (e.key == 'Enter') {
        addTodo();
    }
})
renderTodos();
