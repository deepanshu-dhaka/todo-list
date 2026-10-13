import "./styles.css";


function ToDoItem(title, description, dueDate, priority = "p3", projectName = "inbox") {
    const ID = crypto.randomUUID();
    return { title, ID, description, dueDate, priority, projectName };
}

const todoItemsInsideInboxProject = {};
const listOfAllProjectsExceptInbox = { "project1": [] };

function createProject(newProjectName) {
    for (const projectName in listOfAllProjectsExceptInbox) {
        if (newProjectName === projectName) {
            console.log("Project Name Already Exists!")
        }
        else {
            listOfAllProjectsExceptInbox[newProjectName] = [];
        }
    }
}

function createToDoItem(title, description, dueDate, priority, projectName) {
    console.log(title, description, dueDate, priority, projectName)
    const todoItem = ToDoItem(title, description, dueDate, priority, projectName);

    if (priority == false) {
        todoItem.priority = "p3"
    }

    if (todoItem.projectName === "inbox") {
        todoItemsInsideInboxProject[todoItem.ID] = todoItem;
    }

    for (const projectName in listOfAllProjectsExceptInbox) {
        if (todoItem.projectName === projectName) {
            listOfAllProjectsExceptInbox[projectName].push(todoItem);
        }
    }
}

function returnInbox(todoItemsInsideInboxProject) {
    return todoItemsInsideInboxProject;
}

function returnListOfAllProjectsExceptInbox(listOfAllProjectsExceptInbox) {
    return listOfAllProjectsExceptInbox;
}

function setUpPriority(newPriority, todoItem) {
    todoItem.priority = newPriority;

}

function setToDoItemAsComplete(todoItem) {
    todoItem.checklist = true;
}

function setToDoItemAsNotComplete(todoItem) {
    todoItem.checklist = false;
}


const formRef = document.querySelector(".todo-item-collection-form");
const formContainer = document.querySelector(".todo-item-container");

function getFormData(formRef) {
    const formData = new FormData(formRef);
    let arrOfValues = []
    for (const [key, value] of formData) {
        console.log(`${key}: ${value}`);
        arrOfValues.push(value)
    }
    if (arrOfValues.length === 4) {
        arrOfValues.splice(1, 0, "");
    }
    console.log(arrOfValues)
    return arrOfValues;
}

const submitBtn = document.querySelector(".submitBtn")
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const arrOfFormValues = getFormData(formRef);
    const title = arrOfFormValues[0];
    const description = arrOfFormValues[1];
    const projectName = arrOfFormValues[2];
    const todoItemDueDate = arrOfFormValues[3];
    const priority = arrOfFormValues[4];

    createToDoItem(title, description, todoItemDueDate, priority, projectName);

    console.log(todoItemsInsideInboxProject);
    console.log(listOfAllProjectsExceptInbox);
})

let isDescriptionFieldAlreadyOnTheScreen = false;
const textAreaToEnterTodoItem = document.querySelector(".text-area-to-enter-todo-item");
const descriptionBtn = document.querySelector(".description-btn");
descriptionBtn.addEventListener("click", (event) => {
    if (isDescriptionFieldAlreadyOnTheScreen == true) {
        console.log("hello")
        return;
    }
    const description = document.createElement("input");
    description.name = "description"
    description.type = "text";
    description.placeholder = "Description"
    description.classList.add("description");
    formContainer.style.height = "7.7rem";
    textAreaToEnterTodoItem.insertAdjacentElement("afterend", description);
    description.focus({ focusVisible: true });
    isDescriptionFieldAlreadyOnTheScreen = true;
})

// if (!isDescriptionFieldAlreadyOnTheScreen) {

// }