import "./styles.css";
import { createTodoItem } from "./createTodoItems.js";
import { getFormData } from "./getFormData.js";
import { storeFormData, consoleStoredData, setInitialInboxId } from "./localStorage.js";

const formRef = document.querySelector(".todo-item-collection-form");
const formContainer = document.querySelector(".todo-item-form-container");
const mainContent = document.querySelector(".main-content");

const todoItemMainDisplay = document.createElement("div");
todoItemMainDisplay.classList.add("todo-item-main-display");
mainContent.insertAdjacentElement("afterbegin", todoItemMainDisplay);

let INBOXID = "";
const inboxOption = document.querySelector(".inbox-option");

INBOXID = setInitialInboxId(INBOXID);

console.log(INBOXID)
inboxOption.setAttribute("value", INBOXID);

const textAreaToEnterTodoItem = document.querySelector(".text-area-to-enter-todo-item");

const submitBtn = document.querySelector(".submitBtn")
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const arrOfFormValues = getFormData(formRef);
    const title = arrOfFormValues[0];
    const description = arrOfFormValues[1];
    const projectName = arrOfFormValues[2];
    const todoItemDueDate = arrOfFormValues[3];
    const priority = arrOfFormValues[4];

    const todoItem = createTodoItem(title, description, todoItemDueDate, priority, projectName);

    if (textAreaToEnterTodoItem.checkValidity() === false) {
        // This is the magic function that displays the validation errors to the user
        textAreaToEnterTodoItem.reportValidity();
        return;
    }


    storeFormData(todoItem, INBOXID);
    formRef.reset();
    todoItemMainDisplay.textContent = "";
    fetchTodoItemsFromLocalStorage();
})


function displayTodoItem(title, description, dueDate, priority, todoId) {
    const todoItemContainer = document.createElement("div");
    todoItemContainer.classList.add("todo-item-container");
    todoItemMainDisplay.appendChild(todoItemContainer)

    const checkboxAndTitleDiv = document.createElement("div");
    checkboxAndTitleDiv.classList.add("checkbox-and-title-div");
    todoItemContainer.appendChild(checkboxAndTitleDiv);

    const checkboxForTodo = document.createElement("input");
    checkboxForTodo.type = "checkbox";
    checkboxForTodo.id = "something";
    checkboxForTodo.name = todoId;
    checkboxForTodo.value = "something";
    checkboxForTodo.classList.add("checkbox-for-todo");
    checkboxAndTitleDiv.appendChild(checkboxForTodo);

    const labelForCheckboxForTodo = document.createElement("p");
    // labelForCheckboxForTodo.htmlFor = todoId;
    labelForCheckboxForTodo.textContent = title;
    checkboxAndTitleDiv.append(labelForCheckboxForTodo);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description-div");
    todoItemContainer.appendChild(descriptionDiv);

    const descriptionPara = document.createElement("p");
    descriptionPara.classList.add("description-para");
    descriptionPara.textContent = description;
    descriptionDiv.appendChild(descriptionPara);

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date-div");
    todoItemContainer.appendChild(dateDiv);

    const datePara = document.createElement("p");
    datePara.classList.add("date-para");
    datePara.textContent = dueDate;
    dateDiv.appendChild(datePara)
}


function fetchTodoItemsFromLocalStorage(projectId = INBOXID) {
    let inboxTodos = JSON.parse(localStorage.getItem(INBOXID))
    //array of inbox todos [{todoId:{}}, {todoId:{}},...]
    console.log(inboxTodos)

    // element: {todoId:{title: "", dueDate: "",...}}
    inboxTodos.forEach(element => {
        // i => todoId
        // element[i] => {title: "", dueDate: "",...}
        for (const i in element) {
            console.log("element", element[i]);
            let title = element[i].title;
            let description = element[i].description;
            let dueDate = element[i].dueDate;
            let priority = element[i].priority;
            let todoId = element[i].ID;
            console.log(dueDate, title)

            displayTodoItem(title, description, dueDate, priority, todoId)
        }
    });

}

fetchTodoItemsFromLocalStorage();



let isDescriptionFieldAlreadyOnTheScreen = false;
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

const addProjectIcon = document.querySelector(".add-project-icon");

const dialog = document.querySelector("#create-new-project-dialog")

addProjectIcon.addEventListener("click", function () {
    console.log("clicked");
    dialog.showModal();

})

const createNewProjectForm = document.querySelector(".create-new-project-form")

const createNewProjectSubmitBtn = document.querySelector(".create-new-project-submit-btn");
createNewProjectSubmitBtn.addEventListener("click", function () {
    const formData = new FormData(createNewProjectForm);
    let arrOfValues = []
    for (const [key, value] of formData) {
        console.log(`${key}: ${value}`);
        arrOfValues.push(value)
    }
    createNewProjectForm.reset();
})