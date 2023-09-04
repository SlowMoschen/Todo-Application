//  Logic for opening and closing the Adding Modal
const addModal = document.querySelector('.add-modal'),
addButton = document.querySelector('.add-button'),
addForm = document.querySelector('#addForm'),
closeModalBtn = document.querySelector('.close-btn');

addButton.addEventListener("click", (e) => {
    addClass(addModal, 'show')
})

closeModalBtn.addEventListener("click", () => {
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