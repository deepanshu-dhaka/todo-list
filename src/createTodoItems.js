function createTodoItem(title, description, dueDate, priority, projectName) {
    const ID = crypto.randomUUID();
    console.log(ID, title, description, dueDate, priority, projectName)
    return { title, ID, description, dueDate, priority, projectName }

}

export { createTodoItem };