import "./styles.css";
import { createTodoItem } from "./createTodoItems.js";
import { getFormData } from "./getFormData.js";
import { storeFormData, consoleStoredData, setInitialInboxId } from "./localStorage.js";


const formRef = document.querySelector(".todo-item-collection-form");
const formContainer = document.querySelector(".todo-item-form-container");
const mainContent = document.querySelector(".main-content");

let INBOXID = "";
const inboxOption = document.querySelector(".inbox-option");

INBOXID = setInitialInboxId(INBOXID);

console.log(INBOXID)
inboxOption.setAttribute("value", INBOXID);


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

    //storage work
    storeFormData(todoItem, INBOXID);
    // consoleStoredData(todoItem);


})
displayTodoItem();

function displayTodoItem() {
    const todoDisplayMainDiv = document.createElement("div");
    todoDisplayMainDiv.classList.add("todo-display-main-div");
    mainContent.insertAdjacentElement("afterbegin", todoDisplayMainDiv);

    const checkboxAndTitleDiv = document.createElement("div");
    checkboxAndTitleDiv.classList.add("checkbox-and-title-div");
    todoDisplayMainDiv.appendChild(checkboxAndTitleDiv);

    const checkboxForTodo = document.createElement("input");
    checkboxForTodo.type = "checkbox";
    checkboxForTodo.id = "something";
    checkboxForTodo.name = "something";
    checkboxForTodo.value = "something";
    checkboxForTodo.classList.add("checkbox-for-todo");
    checkboxAndTitleDiv.appendChild(checkboxForTodo);

    const labelForCheckboxForTodo = document.createElement("label");
    labelForCheckboxForTodo.htmlFor = "something";
    labelForCheckboxForTodo.textContent = "Hello World!";
    checkboxAndTitleDiv.append(labelForCheckboxForTodo);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description-div");
    todoDisplayMainDiv.appendChild(descriptionDiv);

    const descriptionPara = document.createElement("p");
    descriptionPara.classList.add("description-para");
    descriptionPara.textContent = "Some description";
    descriptionDiv.appendChild(descriptionPara);

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date-div");
    todoDisplayMainDiv.appendChild(dateDiv);

    const datePara = document.createElement("p");
    datePara.classList.add("date-para");
    datePara.textContent = "Tuesday";
    dateDiv.appendChild(datePara)
}

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
})