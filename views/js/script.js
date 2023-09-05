const addModal = document.querySelector('.add-modal'),
addButton = document.querySelector('.add-button'),
addForm = document.querySelector('#addForm'),
closeModalBtn = document.querySelector('.close-btn'),
input = document.querySelector('#todo-input');

// Eventlisteners

//  Logic for opening and closing the Adding Modal
addButton.addEventListener("click", (e) => {
    addClass(addModal, 'show')
    input.focus()
    
})

closeModalBtn.addEventListener("click", () => {
    removeClass(addModal, 'show')
})

// Form that adds a Todo to the list and DB
addForm.addEventListener("submit", (e) => {
    e.preventDefault()
    addTodo(input.value)
    input.value = ""
    removeClass(addModal, 'show')
})

// Loads existing Todos 
window.addEventListener("load", async () => {
    getAllTodos().then(data => {
        todoArray = data
        console.log(todoArray);
        todoArray.forEach(obj => {
            createTodoElement(obj)
        })
    })  
})

// All API Fetches
const todoList = document.querySelector('#todo-list')
// Base URL for API Fetches
const API = '/tasks'
// Variable for setting the Saved Todos
let todoArray

// GET - gets all Todos on the DB
async function getAllTodos() {
    try {
        const respone = await fetch(API)
        const data = respone.json()
        return data
    } catch (error) {
        console.log(error);
    }
}

// POST - add a Todo to the DB
async function addTodo(todoValue) {
    
    const todo = {
        todo: todoValue,
        state: false
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

// PATCH - change and save the state of the Todo
async function markAsComplete(todo) {
    const inputBox = todo.querySelector('#checkbox-rect2')
    const todoTextEL = todo.querySelector('#todo-text')
    const todoValue = todoTextEL.textContent

    if(inputBox.checked){
        try {
            const response = await fetch(API + `/${todo.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    state: true
                })
            })
            todoTextEL.innerHTML = `<s>${todoValue}</s>`
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            const response = await fetch(API + `/${todo.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    state: false
                })
            })
            todoTextEL.innerHTML = todoValue
        } catch (error) {
            console.log(error);
        }
    }
}

// DELETE - deletes the Todo from the List and DB
async function deleteTodo(todo) {
    try {
        const respone = await fetch(API + `/${todo.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo)
        })
        console.log(respone);
        todo.remove()
    } catch (error) {
        console.log(error);
    }
}

// Function for creating Todo-Elements
function createTodoElement (obj) {
    const isComplete = obj.state === true ? `<s>${obj.todo}</s>` : `${obj.todo}`
    const setInputState = obj.state === true ? 'checked' : ''

    const liEL = document.createElement('li')
        liEL.className = 'todo';
        liEL.id = obj._id
        liEL.innerHTML = `
        <div class="checkbox-rect2">
            <input type="checkbox" id="checkbox-rect2" name="check" ${setInputState}>
        </div>
        <div id="todo-text">
            ${isComplete}
        </div>
        <div id="delete-btn">
            <span class="material-symbols-outlined" id="delete">close</span>
        </div>
        `
        todoList.appendChild(liEL)
    addEventListeners()
    return;
}

// Helper Functions

// Function for adding a Class to one or more Element
function addClass(element, className) {
    if( element.lenght > 1 ) {
        element.forEach(item => {
            item.classlist.add(className)
        })
    } else {
        element.classList.add(className)
    }
}

// Function for removing a Class to one or more Element
function removeClass(element, className) {
    if( element.lenght > 1 ) {
        element.forEach(item => {
            item.classlist.remove(className)
        })
    } else {
        element.classList.remove(className)
    }
}

// Function adds Eventlisteners dynamically to the Delete-Button and Complete-Button
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
            deleteTodo(target)
        })
    })
}