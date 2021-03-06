// Fetch existing todos from localStorage
const getSavedTodo = function () {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

// Save todos to localStorage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = function (todos, filters) {

    let filterTodo = todos.filter(todo => {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    filterTodo = filterTodo.filter(function (todo) {
        return !filters.hideCompleted || !todo.completed
    })

    const incompleteTodo = todos.filter(todo => {
        return !todo.completed
    })

    document.querySelector('#todo').innerHTML = ''
    document.querySelector('#todo').appendChild(generateSummaryDOM(incompleteTodo))

    filterTodo.forEach(todo => {
        document.querySelector('#todo').appendChild(generateTodoDOM(todo))
    });
}

//removeing an todo
const removeTode = function (id) {
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === id
    })
    if (todoIndex >= 0) {
        todos.splice(todoIndex, 1)
    }
}

//toggle completed todo
const toggleTodo = function (id) {
    const todo = todos.find(function (todo) {
        return todo.id === id
    })

    if (todo !== undefined) {
        todo.completed = !todo.completed
    }
}


// Get the DOM elements for an individual note
const generateTodoDOM = function (todo) {
    const todoDiv = document.createElement('div')
    const checkbox = document.createElement('input')
    const span = document.createElement('span')
    const button = document.createElement('button')

    //Set checkbox attribute and add to the div
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    todoDiv.appendChild(checkbox)
    checkbox.addEventListener('change', function () {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    //set span content and append to the div
    span.textContent = todo.text
    todoDiv.appendChild(span)

    //set button content 
    button.textContent = 'x'
    todoDiv.appendChild(button)
    button.addEventListener('click', function (id) {
        removeTode(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    return todoDiv
}

// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodo) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodo.length} left`
    return summary
}

// ID generation function
const uuid = function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}