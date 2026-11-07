function createTodoItem(title, description, dueDate, priority, projectName) {
    const ID = crypto.randomUUID();
    return { title, ID, description, dueDate, priority, projectName }

}

export { createTodoItem };