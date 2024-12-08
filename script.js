const input = document.querySelector(".input-box");
const button = document.querySelector(".add-button");
const todolist = document.querySelector(".list");

loadTodos();


button.addEventListener("click", addtodo);
todolist.addEventListener("click", deleteEve);

input.addEventListener("keydown", function (event) {
    console.log(event.key);
    if (event.key === "Enter") {
        event.preventDefault();
        addtodo();
    }
});

function addtodo(event) {
    if (input.value != ""){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-container");

    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerText = input.value;
    todoDiv.appendChild(todoItem);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash" style="color: #ffffff; font-size: 1.2rem;"></i>';
    todoDiv.appendChild(deleteButton);

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML = '<i class="fa-solid fa-check" style=" font-size: 1.2rem;" ></i>';
    todoDiv.appendChild(completeButton);

  
    todolist.appendChild(todoDiv);

   
    saveTodos();

    input.value = '';
    }}

function deleteEve(event) {
    const item = event.target;

    if (item.classList[0] === "delete-btn") {
        const delit = item.parentElement;
        delit.remove();
        saveTodos(); 
    }

    if (item.classList[0] === "complete-btn") {
        const todoDiv = item.parentElement;
        todoDiv.classList.toggle("comp");
         if (todoDiv.classList.contains("comp")) {
            item.remove(); 
        }
        saveTodos(); 
    }
}

function saveTodos() {
    const todos = [];
    const todoContainers = document.querySelectorAll(".todo-container");

    todoContainers.forEach(todoDiv => {
        const todoText = todoDiv.querySelector(".todo-item").innerText;
        const isCompleted = todoDiv.classList.contains("comp");
        todos.push({ text: todoText, completed: isCompleted });
    });

    localStorage.setItem("todos", JSON.stringify(todos)); 
}

function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));

    if (savedTodos) {
        savedTodos.forEach(todo => {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo-container");
            if (todo.completed) {
                todoDiv.classList.add("comp"); 
            }

            const todoItem = document.createElement("li");
            todoItem.classList.add("todo-item");
            todoItem.innerText = todo.text;
            todoDiv.appendChild(todoItem);

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-btn");
            deleteButton.innerHTML = '<i class="fa-solid fa-trash" style="color: #ffffff; font-size: 1.2rem;"></i>';
            todoDiv.appendChild(deleteButton);

            if (!todo.completed) {
                const completeButton = document.createElement("button");
                completeButton.classList.add("complete-btn");
                completeButton.innerHTML = '<i class="fa-solid fa-check" style="color: #ffffff; font-size: 1.2rem;"></i>';
                todoDiv.appendChild(completeButton);
            }

            todolist.appendChild(todoDiv);
        });
    }
}
