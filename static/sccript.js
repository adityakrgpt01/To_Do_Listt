
const getOpenWorkTasks = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const retrieveOpenWorkTasks = localStorage.getItem('openUrgentTasks')
            const openTasks = JSON.parse(retrieveOpenWorkTasks)
            if (openTasks.length > 0) {
                return res(openTasks)
            }
            return rej()
        }, 50)
    })
}
getOpenWorkTasks().then((tasks) => {
    for (let task of tasks) {
        urgentTodoObject.urgentTodoArray.push(task)
    }
    urgentTodoObject.renderTodoTasks()
}).catch(() => {
    console.log('No tasks stored')
})

class Todo {
    constructor(title, description, dueDate, dueTime, completed = false) {
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.dueTime = dueTime,
        this.completed = completed
    }
}

class Urgent extends Todo {
    constructor(title, description, dueDate, dueTime, sortAZ, sortDate, priority = 'Urgent', completed = false) {
        super(title, description, dueDate, dueTime, completed)
        this.priority = priority
        this.sortAZ = sortAZ
        this.sortDate = sortDate

        this.sortAZ.addEventListener('change', ({target}) => {
            if (target.checked) {
                urgentTodoObject.sortAZ()
                urgentSortDate.checked = false
            }
        })
        
        this.sortDate.addEventListener('change', ({target}) => {
            if (target.checked) {
                urgentTodoObject.sortDate()
                urgentSortAZ.checked = false;
            }
        })
    }
}





const addUrgent = document.getElementById('addUrgentForm')
const urgentTitle = document.getElementById('urgentTitle')
const urgentDesc = document.getElementById('urgentDesc')
const urgentDate = document.getElementById('urgentDate')
const urgentTime = document.getElementById('urgentTime')
const urgentTodo = document.getElementById('urgentTodo')
const urgentComplete = document.getElementById('urgentCompleted')
const urgentSortAZ = document.getElementById('urgentSortAZ')
const urgentSortDate = document.getElementById('urgentSortDate')

addUrgent.addEventListener('submit', (e) => {
    if (!urgentTitle.value || !urgentDesc.value) {
        if (!urgentTitle.value && urgentDesc.value) {
            alert('Please provide a Title')
        } else {
            alert('Please provide more detail')
        }
        e.preventDefault()
        return
    }
    const newUrgent = new Urgent(urgentTitle.value, urgentDesc.value, urgentDate.value, urgentTime.value, urgentSortAZ, urgentSortDate)
    urgentTodoObject.urgentTodoArray.push(newUrgent)
    urgentTodoObject.renderTodoTasks()
    resetInputs()
    e.preventDefault()
})


resetInputs = () => {
    urgentTitle.value = ''
    urgentDesc.value = ''
    urgentDate.value = ''
    urgentTitle.value = ''
}


const searchBox = document.getElementById('searchBox')

searchBox.addEventListener('keyup', (e) => {
    let todoBlocks = document.querySelectorAll('.todoTitle')
    todoBlocks = Array.from(todoBlocks)
    if (e.target.value !== '') {
        todoBlocks.filter((block) => {
            if (!block.innerHTML.toUpperCase().includes(e.target.value.toUpperCase())) {
                block.parentElement.classList.add('match')
            } else {
                block.parentElement.style.boxShadow = '0px 0px 20px 10px #33ff33'
            }
        })
    } else {
        todoBlocks.forEach((block) => {
            block.parentElement.classList.remove('match')
            block.parentElement.style.boxShadow = 'none'
        })
    }
})
