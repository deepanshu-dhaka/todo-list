import "./styles.css";
import { createTodoItem } from "./createTodoItems.js";
import { getFormData } from "./getFormData.js";
import { storeFormData, consoleStoredData, setInitialInboxId, setInitialProjectTable } from "./localStorage.js";
import removeIcon from "./removeIcon.png";


const listOfProjectsOnTodoFormCollection = document.querySelector(".list-of-projects-on-todo-form-collection");
const listOfProjectsDiv = document.querySelector(".list-of-projects");
const formRef = document.querySelector(".todo-item-collection-form");
const formContainer = document.querySelector(".todo-item-form-container");
const mainContent = document.querySelector(".main-content");
const textAreaToEnterTodoItem = document.querySelector(".text-area-to-enter-todo-item");

const todoItemMainDisplay = document.createElement("div");
todoItemMainDisplay.classList.add("todo-item-main-display");
mainContent.insertAdjacentElement("afterbegin", todoItemMainDisplay);

let INBOXID = "";
const inboxOption = document.querySelector(".inbox-option");

INBOXID = setInitialInboxId(INBOXID);
setInitialProjectTable();
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

    if (textAreaToEnterTodoItem.checkValidity() === false) {
        // This is the magic function that displays the validation errors to the user
        textAreaToEnterTodoItem.reportValidity();
        return;
    }


    storeFormData(todoItem, INBOXID);
    formRef.reset();
    todoItemMainDisplay.textContent = "";
    fetchTodoItemsForInboxFromLocalStorage();
})

function fetchTodoItemsForInboxFromLocalStorage(projectId = INBOXID) {
    let inboxTodos = JSON.parse(localStorage.getItem(INBOXID))
    //array of inbox todos [{todoId:{}}, {todoId:{}},...]
    console.log(inboxTodos)

    // element: {todoId:{title: "", dueDate: "",...}}
    inboxTodos.forEach(element => {
        // i => todoId
        // element[i] => {title: "", dueDate: "",...}
        for (const i in element) {
            let title = element[i].title;
            let description = element[i].description;
            let dueDate = element[i].dueDate;
            let priority = element[i].priority;
            let todoId = element[i].ID;
            let projectId = element[i].projectName;

            displayTodoItem(title, description, dueDate, priority, todoId, projectId)
        }
    });
    const removeTodoItemIcons = document.querySelectorAll(".remove-todo-item-icon");
    removeTodoItemIcons.forEach(singleRemoveIcon => {
        singleRemoveIcon.addEventListener("click", deleteTodoItems)
    });

}

fetchTodoItemsForInboxFromLocalStorage();



function displayTodoItem(title, description, dueDate, priority, todoId, projectId) {
    const todoItemContainer = document.createElement("div");
    todoItemContainer.classList.add("todo-item-container");
    todoItemMainDisplay.appendChild(todoItemContainer)

    const todoItemTextDiv = document.createElement("div");
    todoItemTextDiv.classList.add("todo-item-text-div")
    todoItemContainer.appendChild(todoItemTextDiv);



    const checkboxAndTitleDiv = document.createElement("div");
    checkboxAndTitleDiv.classList.add("checkbox-and-title-div");
    todoItemTextDiv.appendChild(checkboxAndTitleDiv);

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
    todoItemTextDiv.appendChild(descriptionDiv);

    const descriptionPara = document.createElement("p");
    descriptionPara.classList.add("description-para");
    descriptionPara.textContent = description;
    descriptionDiv.appendChild(descriptionPara);

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date-div");
    todoItemTextDiv.appendChild(dateDiv);

    const datePara = document.createElement("p");
    datePara.classList.add("date-para");
    datePara.textContent = dueDate;
    dateDiv.appendChild(datePara);

    const todoItemIconDiv = document.createElement("div");
    todoItemIconDiv.classList.add("todo-item-icon-div");
    todoItemContainer.appendChild(todoItemIconDiv);

    const removeIconImg = document.createElement("img");
    removeIconImg.src = removeIcon;
    removeIconImg.classList.add("remove-todo-item-icon")
    removeIconImg.dataset.projectId = projectId;
    removeIconImg.dataset.todoId = todoId;
    removeIconImg.style.height = "20px";
    removeIconImg.style.width = "20px";
    todoItemIconDiv.appendChild(removeIconImg)


}

const inboxAndUtilitySectionDiv = document.querySelector(".inbox-and-utility-section");
inboxAndUtilitySectionDiv.addEventListener("click", () => {
    todoItemMainDisplay.textContent = "";
    fetchTodoItemsForInboxFromLocalStorage();
})

const removeTodoItemIcons = document.querySelectorAll(".remove-todo-item-icon");
removeTodoItemIcons.forEach(singleRemoveIcon => {
    singleRemoveIcon.addEventListener("click", deleteTodoItems)
});

function deleteTodoItems(event) {
    let targetProject = JSON.parse(localStorage.getItem(event.target.dataset.projectId));
    console.log(targetProject);
    targetProject.forEach(element => {
        if (event.target.dataset.todoId === Object.keys(element)[0]) {
            console.log("true", Object.keys(element)[0])
            console.log(targetProject.indexOf(element))
            let target = targetProject.indexOf(element);
            targetProject.splice(target, 1)
            localStorage.setItem(event.target.dataset.projectId, JSON.stringify(targetProject))
            // fetchTodoItemsForInboxFromLocalStorage();
            todoItemMainDisplay.textContent = "";
            if (event.target.dataset.projectId === INBOXID) {
                fetchTodoItemsForInboxFromLocalStorage();
            }
            else {
                fetchTodoItemsFromProjectOnSidebarAfterDeletion(event)
            }
            // window.location.reload();

        }
    });

}



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
    const currentProjectId = crypto.randomUUID();
    let currentProjectName = ""
    for (const [key, value] of formData) {
        currentProjectName = value;
        console.log(`${currentProjectId}: ${value}`);
    }
    storeProjectNameInLocalStorage(currentProjectId, currentProjectName)
    createNewProjectForm.reset();
    listOfProjectsDiv.textContent = "";
    listOfProjectsOnTodoFormCollection.textContent = "";

    displayListOfProjectsOnSidebar(currentProjectId);
    displayListOfProjectsOnTodoFormCollection(currentProjectId);
    addEventListenerOnProjectListsOnSidebar();

})

function storeProjectNameInLocalStorage(currentProjectId, currentProjectName) {
    // store data in projectTable
    let retrievedProjectTableArray = JSON.parse(localStorage.getItem("projectTable"));

    retrievedProjectTableArray.push({ [currentProjectName]: currentProjectId });
    console.log("empty array", retrievedProjectTableArray)

    localStorage.setItem("projectTable", JSON.stringify(retrievedProjectTableArray));

    // store data as individual projectId and relevants todos
    localStorage.setItem(currentProjectId, JSON.stringify([]));
}


function displayListOfProjectsOnSidebar(currentProjectId) {
    let retrievedProjectTableArray = JSON.parse(localStorage.getItem("projectTable"));

    retrievedProjectTableArray.forEach(element => {
        console.log(element);
        let projectName = Object.keys(element)[0]
        let projectId = element[projectName]
        const buttonP = document.createElement("button");
        buttonP.textContent = `# ${projectName}`;
        buttonP.dataset.projectId = projectId;
        buttonP.classList.add("project-name");
        listOfProjectsDiv.appendChild(buttonP);

    });
}

function displayListOfProjectsOnTodoFormCollection(currentProjectId) {
    let retrievedProjectTableArray = JSON.parse(localStorage.getItem("projectTable"));

    let retrievedInboxId = (localStorage.getItem("inboxId"))
    if (!document.querySelector(".inbox-option")) {
        const optionP = document.createElement("option");
        optionP.textContent = "Inbox";
        optionP.value = retrievedInboxId;
        listOfProjectsOnTodoFormCollection.appendChild(optionP)
    }

    retrievedProjectTableArray.forEach(element => {
        let projectName = Object.keys(element)[0]
        let projectId = element[projectName]
        const optionP = document.createElement("option");
        optionP.textContent = projectName;
        optionP.dataset.projectId = projectId;
        optionP.value = projectId;
        listOfProjectsOnTodoFormCollection.appendChild(optionP)
    })
}
displayListOfProjectsOnTodoFormCollection();
displayListOfProjectsOnSidebar();

function addEventListenerOnProjectListsOnSidebar() {
    const projectListsFromSidebar = document.querySelectorAll("button.project-name");

    projectListsFromSidebar.forEach(project => {
        project.addEventListener("click", fetchTodoItemsFromProjectOnSidebarBasedOnClick)
    })
}

function fetchTodoItemsFromProjectOnSidebarAfterDeletion(event) {
    const targetProjectId = event.target.dataset.projectId;
    const targetProjectIdTodosArray = JSON.parse(localStorage.getItem(targetProjectId));
    todoItemMainDisplay.textContent = "";
    targetProjectIdTodosArray.forEach(element => {
        for (const i in element) {
            let title = element[i].title;
            let description = element[i].description;
            let dueDate = element[i].dueDate;
            let priority = element[i].priority;
            let todoId = element[i].ID;
            let projectId = element[i].projectName;

            displayTodoItem(title, description, dueDate, priority, todoId, projectId)
        }
    });
    const removeTodoItemIcons = document.querySelectorAll(".remove-todo-item-icon");
    removeTodoItemIcons.forEach(singleRemoveIcon => {
        singleRemoveIcon.addEventListener("click", deleteTodoItems)
    });
}

function fetchTodoItemsFromProjectOnSidebarBasedOnClick(event) {

    const targetProjectId = event.target.dataset.projectId;
    const targetProjectIdTodosArray = JSON.parse(localStorage.getItem(targetProjectId));
    console.log(targetProjectIdTodosArray)
    todoItemMainDisplay.textContent = "";
    targetProjectIdTodosArray.forEach(element => {
        for (const i in element) {
            let title = element[i].title;
            let description = element[i].description;
            let dueDate = element[i].dueDate;
            let priority = element[i].priority;
            let todoId = element[i].ID;
            let projectId = element[i].projectName;

            displayTodoItem(title, description, dueDate, priority, todoId, projectId)
        }
    });
    const removeTodoItemIcons = document.querySelectorAll(".remove-todo-item-icon");
    removeTodoItemIcons.forEach(singleRemoveIcon => {
        singleRemoveIcon.addEventListener("click", deleteTodoItems)
    });


    // console.log("I have been clicked!!", event.target.dataset.projectId)
}
addEventListenerOnProjectListsOnSidebar();