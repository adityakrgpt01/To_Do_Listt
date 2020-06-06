const urgentTodoObject = {
    urgentTodoArray: [],
    urgentCompletedArray: [],
    toggleComplete(task) {
        task.completed = !task.completed
        this.setComplete(task)
        this.setTodo(task)
        this.renderTodoTasks()
        this.renderCompleteTasks()
    },
    setComplete(task) {
        const todoVal = this.urgentCompletedArray.findIndex((todo) => {
            if (task.title.includes(todo.title) && task.description.includes(todo.description)) {
                return todo
            } 
        })
        for (let task of urgentTodoObject.urgentCompletedArray) {
            if (!task.completed) {
                urgentTodoObject.urgentTodoArray.push(task)
                urgentTodoObject.urgentCompletedArray.splice(todoVal, 1)
            }
        }
    },
    setTodo(task) {
        const todoVal = this.urgentTodoArray.findIndex((todo) => {
            if (task.title.includes(todo.title) && task.description.includes(todo.description)) {
                return todo
            } 
        })
        for (let task of urgentTodoObject.urgentTodoArray) {
            if (task.completed) {
                urgentTodoObject.urgentCompletedArray.push(task)
                urgentTodoObject.urgentTodoArray.splice(todoVal, 1)
            }
        }
    },
    renderTodoTasks() {
        urgentTodo.innerHTML = ''
        for (let task of urgentTodoObject.urgentTodoArray) {
            const {title, description, dueDate, dueTime} = task
            const newListItem = document.createElement('li')
            newListItem.setAttribute('class', 'todoItem')
            newListItem.innerHTML = `
                <h3 style="text-transform: uppercase" class="todoTitle">${title}</h3>
                <p>${description}</p>
                <p>Due: <span>${dueDate}</span> at <span>${dueTime}</span></p>
                <i class="fa fa-circle-thin"></i>
            `
            urgentTodo.appendChild(newListItem)
            newListItem.addEventListener('click', () => {
                this.toggleComplete(task)
            })
        }
        localStorage.setItem('openUrgentTasks', JSON.stringify(this.urgentTodoArray))
    },
    renderCompleteTasks() {
        urgentComplete.innerHTML = ''
        for (let task of urgentTodoObject.urgentCompletedArray) {
            const {title, description, dueDate, dueTime} = task;
            const newListItem = document.createElement('li');
            newListItem.setAttribute('class', 'todoItem')
            newListItem.innerHTML = `
                <h3 style="text-transform: uppercase" class="todoTitle">${title}</h3>
                <p>${description}</p>
                <p>Due: <span>${dueDate}</span> at <span>${dueTime}</span></p>
                <i class="fa fa-check-circle-o"></i>
            `
            urgentComplete.appendChild(newListItem)
            newListItem.addEventListener('click', () => {
                this.toggleComplete(task)
            })
        }
    },
    sortAZ() {
        this.urgentTodoArray.sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)
        this.renderTodoTasks()
    },
    sortDate() {
        this.urgentTodoArray.sort((a, b) => {
            a = a.dueDate.split('/').reverse().join('');
            b = b.dueDate.split('/').reverse().join('');
            return a > b ? 1 : a < b ? -1 : 0;
        })
        this.renderTodoTasks()
    }
}
const dateElement = document.getElementById('date')
const options = {weekday : "long", month:"short", day:"numeric"}
const today = new Date()

dateElement.innerHTML = today.toLocaleDateString("en-US", options)

