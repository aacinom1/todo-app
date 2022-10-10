const taskInput = document.querySelector(".task-container input")
const filterTask = document.querySelectorAll(".filters span")
const deleteAllTask = document.querySelector(".clearTask")
const taskBox = document.querySelector(".taskBox")
const addNewTask = document.getElementById("newTask")

let editId = false
let isEditTask = false
todos = JSON.parse(localStorage.getItem("todo-list"))

filterTask.forEach((btn) => {
	btn.addEventListener("click", () => {
		document.querySelector("span.active").classList.remove("active")
		btn.classList.add("active")
		showTodo(btn.id)
	})
})

const showTodo = (filter) => {
	let newLi = ""
	if (todos) {
		todos.forEach((todo, id) => {
			let completed = todo.status === "completed" ? "checked" : ""
			if (filter === todo.status || filter === "all") {
				newLi += `<li class = "task">
					<label for="${id}">
						<input onclick = "updateStatus(this)" type="checkbox" id="${id}">
						<p class="${completed}">${todo.name}</p>
					</label>									
					<div class="settings">
						<span onclick="editTask(${id}, '${todo.name}')"><i class="fa-solid fa-pen-to-square"></i> </span>
						<span onclick="deleteTask(${id}, '${filter}')"><i class="fa-solid fa-trash"></i></span>
					</div>`
			}
		})
	}
	taskBox.innerHTML = newLi || `<span>Empty Task List!</span>`
	let checkTask = taskBox.querySelectorAll(".task")
	!checkTask.length
		? deleteAllTask.classList.remove("active")
		: deleteAllTask.classList.add("active")
	taskBox.offsetHeight >= "30rem"
		? taskBox.classList.add("overflow")
		: taskBox.classList.remove("overflow")
}

showTodo("all")

const updateStatus = (selectedTask) => {
	let taskName = selectedTask.parentElement.lastElementChild
	if (selectedTask.checked) {
		taskName.classList.add("checked")
		todos[selectedTask.id].status = "completed"
	} else {
		taskName.classList.remove("checked")
		todos[selectedTask.id].status = "pending"
	}
	localStorage.setItem("todo-list", JSON.stringify(todos))
}

const editTask = (taskID, textName) => {
	editId = taskID
	isEditTask = true
	taskInput.value = textName
	taskInput.focus()
	taskInput.classList.add("active")
}

const deleteTask = (deleteId, filter) => {
	isEditTask = false
	todos.splice(deleteId, 1)
	localStorage.setItem("todo-list", JSON.stringify(todos))
	showTodo(filter)
}

deleteAllTask.addEventListener("click", () => {
	isEditTask = false
	todos.splice(0, todos.length)
	localStorage.setItem("todo-list", JSON.stringify(todos))
	showTodo()
})

addNewTask.addEventListener("click", () => {
	let userInput = taskInput.value.trim()
	if (userInput) {
		if (!isEditTask) {
			todos = !todos ? [] : todos
			let taskDetails = { name: userInput, status: "pending" }
			todos.push(taskDetails)
		} else {
			isEditTask = false
			todos[editId].name = userInput
		}

		taskInput.value = ""
		localStorage.setItem("todo-list", JSON.stringify(todos))
		showTodo(document.querySelector("span.active").id)
	}
})
taskInput.addEventListener("keypress", (e) => {
	let userInput = taskInput.value.trim()
	if (e.key === "Enter" && userInput) {
		if (!isEditTask) {
			todos = !todos ? [] : todos
			let taskDetails = { name: userInput, status: "pending" }
			todos.push(taskDetails)
		} else {
			isEditTask = false
			todos[editId].name = userInput
		}

		taskInput.value = ""
		localStorage.setItem("todo-list", JSON.stringify(todos))
		showTodo(document.querySelector("span.active").id)
	}
})
