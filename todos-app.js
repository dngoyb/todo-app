let todos = getSavedTodo()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', e => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', e => {
    e.preventDefault()
    todos.push({
        id: uuid(23),
        text: e.target.elements.name.value,
        completed: false
    })
    saveTodos(todos)
    renderTodos(todos, filters)
    e.target.elements.name.value = ''
})

document.querySelector('#hide-incomplete').addEventListener('change', e =>{
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})

