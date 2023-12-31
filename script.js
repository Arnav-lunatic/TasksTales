const taskContainer = document.querySelector('.taskContainer')
const inputTask = document.querySelector('.inputTask')
const listItUp = document.querySelector('.inputButton')
const emptyMessage = document.querySelector('.emptyMessage')

//Date And Year
const d = new Date()
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.querySelector('.year').innerHTML = `~${d.getFullYear()}~`
document.querySelector('.date').innerHTML = `${(d.getDate()<10) ? '0'+d.getDate() : d.getDate()}-${months[d.getMonth()]}`

//Add Task Button (list it up!)
function addTasks() {
    if (inputTask.value.length === 0) {
        inputTask.placeholder = 'Please enter the task'
        inputTask.classList.add('emptyMessage')
    } else{
        taskContainer.innerHTML += `
        <li>
            <div class="taskSec">
                <img class="star" src="assests/nonstar.png">>> ${inputTask.value}
            </div>
            <span>x</span>
        </li>`
        inputTask.value = ''
        inputTask.placeholder = '....'
        inputTask.classList.remove('emptyMessage')
    }
    saveData()
}

listItUp.addEventListener('click', addTasks)

inputTask.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTasks()
    }
})


//Mark as check and delete
let checked = false
let star = false

taskContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove()
    }
    else if (e.target.tagName === 'DIV') {
        if (!checked) {
            e.target.classList.add('markAsChecked')
            checked = true
        } else {
            e.target.classList.remove('markAsChecked')
            checked = false
        }
    }
    else if (e.target.tagName === 'IMG') {
        if (!star) {
            e.target.src = 'assests/star.png'
            star = true
        }
        else if (star) {
            e.target.src = 'assests/nonstar.png'
            star = false
        }
    }
    saveData()
})

// Save Data
function saveData() {
    localStorage.data = taskContainer.innerHTML
}
if (localStorage.data.length !== 0) {
    taskContainer.innerHTML = localStorage.data
}