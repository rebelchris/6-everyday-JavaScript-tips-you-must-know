const form = document.getElementById('form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

readLocalStorage();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(existingTodo) {
    let newTodo = todoInput.value;
    if (existingTodo) {
        newTodo = existingTodo.text;
    }
    if (newTodo) {
        const todoLi = document.createElement('li');
        todoLi.innerText = newTodo;
        if (existingTodo && existingTodo.checked) {
            todoLi.classList.add('checked');
        }
        todoLi.addEventListener('click', () => {
            todoLi.classList.toggle('checked');
            updateLocalStorage();
        });
        todoList.appendChild(todoLi);
        todoInput.value = '';
        updateLocalStorage();
    }
}

function readLocalStorage() {
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(todo => {
        addTodo(todo);
    });
}

function updateLocalStorage() {
    let todoLi = document.querySelectorAll('li');
    const todos = [];
    todoLi.forEach(function (todo) {
        todos.push({
            text: todo.innerText,
            checked: todo.classList.contains('checked')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}