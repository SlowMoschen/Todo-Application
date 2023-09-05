//  Logic for opening and closing the Adding Modal
const addModal = document.querySelector('.add-modal'),
addButton = document.querySelector('.add-button'),
addForm = document.querySelector('#addForm'),
closeModalBtn = document.querySelector('.close-btn');


// Eventlisteners
addButton.addEventListener("click", (e) => {
    addClass(addModal, 'show')
})

closeModalBtn.addEventListener("click", () => {
    removeClass(addModal, 'show')
})

addForm.addEventListener("submit", (e) => {
    const input = document.querySelector('#todo-input')
    e.preventDefault()
    addTodo(input.value)
    input.value = ""
    removeClass(addModal, 'show')
})

function addClass(element, className) {
    if( element.lenght > 1 ) {
        element.forEach(item => {
            item.classlist.add(className)
        })
    } else {
        element.classList.add(className)
    }
}

function removeClass(element, className) {
    if( element.lenght > 1 ) {
        element.forEach(item => {
            item.classlist.remove(className)
        })
    } else {
        element.classList.remove(className)
    }
}

// API Fetches
const todoList = document.querySelector('#todo-list')
const API = 'http://localhost:3001/tasks'
let todoArray = [
    {
        todo: 'Tets Todo',
        state: false,
    },
]

async function getAllTodos() {
    try {
        const respone = await fetch(API)
        const data = respone.json()
        console.log(data);
        todoArray = [...todoArray, data]
    } catch (error) {
        console.log(error);
    }
}

async function addTodo(todoValue) {
    
    const todo = {
        todo: todoValue,
        state: false,
        id: todoArray.length + 1
    }
    
    try {
        const respone = await fetch(API, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo)
        })
        
        createTodoElement(todo)
        console.log(respone.json());
        
    } catch (error) {
        console.log(error);
    }
    
}

// Logic to add Todos

function createTodoElement (obj) {
        const liEL = document.createElement('li')
            liEL.id = 'todo';
            liEL.innerHTML = `
            <div class="checkbox-rect2">
                <input type="checkbox" id="checkbox-rect2" name="check">
            </div>
            <div id="todo-text">
                ${obj.todo}
            </div>
            <div id="delete-btn">
                <span class="material-symbols-outlined" id="delete">close</span>
            </div>
            `
            todoList.appendChild(liEL)
    addEventListeners()
    return;
}

function addEventListeners() {
    const inputBoxes = document.querySelectorAll('#checkbox-rect2')
    const deleteBtns = document.querySelectorAll('#delete-btn')

    inputBoxes.forEach(box => {
        box.addEventListener("click", (e) => {
            const target =  e.currentTarget.parentElement.parentElement
            markAsComplete(target)
        })
    })
    
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const target =  e.currentTarget.parentElement
            console.log(target);
            deleteTodo(target)
        })
    })
}

function markAsComplete(todo) {
    const inputBox = todo.querySelector('#checkbox-rect2')
    const todoTextEL = todo.querySelector('#todo-text')
    const todoValue = todoTextEL.textContent

    if(inputBox.checked){
        todoTextEL.innerHTML = `<s>${todoValue}</s>`
    } else {
        todoTextEL.innerHTML = todoValue
    }
}

function deleteTodo(todo) {
    todo.remove()
}

todoArray.forEach(el => {
    createTodoElement(el)
})