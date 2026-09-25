import "./styles.css";
console.log("hello, world!");


function ToDoItem(title, description, dueDate, priority, notes, checklist, projectName = "inbox") {
    const ID = crypto.randomUUID();
    return { title, ID, description, dueDate, priority, notes, checklist, projectName };
}

// console.log(arrOfToDoItems)
let todoItemsInsideInboxProject = {};
let listOfAllProjectsExceptInbox = { "Gym Workout": [] };

// function createProject() {
//     const projectId = crypto.randomUUID();
//     return projectId;
// }

function createToDoItem(title, description, dueDate, priority, notes, checklist, projectName = "inbox") {
    const todoItem = ToDoItem(title, description, dueDate, priority, notes, checklist, projectName);

    if (todoItem.projectName === "inbox") {
        todoItemsInsideInboxProject[todoItem.ID] = todoItem;
    }

    for (const projectName in listOfAllProjectsExceptInbox) {
        if (todoItem.projectName === projectName) {
            listOfAllProjectsExceptInbox[projectName].push(todoItem);
        }
    }
}

createToDoItem("Do 10 pullups", "When you go to the gym, make sure to do 10 pullups", "25-09-2026", "p1", "nothing", "false", "Gym Workout");

console.log("no", todoItemsInsideInboxProject);
console.log(listOfAllProjectsExceptInbox);