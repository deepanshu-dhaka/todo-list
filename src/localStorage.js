function storeFormData(todoItem) {
    const todoId = String(todoItem.ID);
    localStorage.setItem(todoId, JSON.stringify(todoItem))

}

function consoleStoredData(todoItem) {
    const todoId = String(todoItem.ID);
    console.log("hello", JSON.parse(localStorage.getItem(todoId)));
}

export { storeFormData, consoleStoredData }