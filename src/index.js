import "./styles.css";
import { createTodoItem } from "./createTodoItems.js";
import { getFormData } from "./getFormData.js";
import { storeFormData, consoleStoredData, setInitialInboxId, setInitialProjectTable } from "./localStorage.js";
import removeIcon from "./removeIcon.png";
import editIconSource from "./editIcon.png";

const editTodoItemDialog = document.querySelector("#todo-item-edit-dialog");
const todoItemEditForm = document.querySelector(".todo-item-edit-form")
const todoItemTitleOnEditForm = document.querySelector(".todo-item-title-on-edit-form");
const todoItemDescriptionOnEditForm = document.querySelector(".todo-item-desciption-on-edit-form")
const projectSelectElementOnEditForm = document.querySelector(".project-list-on-edit-form");
const editFormSubmitBtn = document.querySelector(".edit-form-submit-btn");
const dateOnEditForm = document.querySelector(".date-on-edit-form");
const priorityListOnEditForm = document.querySelector(".priority-list-on-edit-form")

const listOfProjectsOnTodoFormCollection = document.querySelector(".list-of-projects-on-todo-form-collection");
const listOfProjectsDiv = document.querySelector(".list-of-projects");
const formRef = document.querySelector(".todo-item-collection-form");
const formContainer = document.querySelector(".todo-item-form-container");
const mainContent = document.querySelector(".main-content");
const textAreaToEnterTodoItem = document.querySelector(".text-area-to-enter-todo-item");
const projectNameAsHeading = document.querySelector(".project-name-as-heading");

const todoItemMainDisplay = document.createElement("div");
todoItemMainDisplay.classList.add("todo-item-main-display");
projectNameAsHeading.insertAdjacentElement("afterend", todoItemMainDisplay);


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
    fetchTodoItemsForInboxFromLocalStorage(projectName);
})

function fetchTodoItemsForInboxFromLocalStorage(projectId) {
    console.log(projectId)

    const retrievedProjectTable = JSON.parse(localStorage.getItem("projectTable"));
    retrievedProjectTable.forEach(eachProjectRef => {
        if (Object.values(eachProjectRef)[0] == projectId) {
            console.log(Object.keys(eachProjectRef))

            projectNameAsHeading.textContent = `${Object.keys(eachProjectRef)}`;


        }
    });


    if (projectId === INBOXID) {
        projectNameAsHeading.textContent = 'Inbox';
        projectNameAsHeading.style.color = "white"
    }
    let inboxTodos = JSON.parse(localStorage.getItem(projectId))
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
    const editTodoItemIcon = document.querySelectorAll(".edit-todo-item-icon")
    editTodoItemIcon.forEach(singelEditIcon => {
        singelEditIcon.addEventListener("click", displayEditTodoItemForm)
    });
    editFormSubmitBtn.addEventListener("click", updateDisplayAfterEditFormSubmission)

}

fetchTodoItemsForInboxFromLocalStorage(INBOXID);



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

    const editIconImg = document.createElement("img");
    editIconImg.src = editIconSource;
    editIconImg.classList.add("edit-todo-item-icon")
    editIconImg.dataset.projectId = projectId;
    editIconImg.dataset.todoId = todoId;
    editIconImg.style.height = "20px";
    editIconImg.style.width = "20px";
    todoItemIconDiv.appendChild(editIconImg)

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
    fetchTodoItemsForInboxFromLocalStorage(INBOXID);
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
                fetchTodoItemsForInboxFromLocalStorage(INBOXID);
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

const createNewProjectDialog = document.querySelector("#create-new-project-dialog")

addProjectIcon.addEventListener("click", function () {
    console.log("clicked");
    createNewProjectDialog.showModal();

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

    projectSelectElementOnEditForm.textContent = "";
    addProjectListOptionsOnEditForm();

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
    // const targetProjectIdTodosArray = JSON.parse(localStorage.getItem(targetProjectId));
    // todoItemMainDisplay.textContent = "";
    // targetProjectIdTodosArray.forEach(element => {
    //     for (const i in element) {
    //         let title = element[i].title;
    //         let description = element[i].description;
    //         let dueDate = element[i].dueDate;
    //         let priority = element[i].priority;
    //         let todoId = element[i].ID;
    //         let projectId = element[i].projectName;

    //         displayTodoItem(title, description, dueDate, priority, todoId, projectId)
    //     }
    // });
    // const removeTodoItemIcons = document.querySelectorAll(".remove-todo-item-icon");
    // removeTodoItemIcons.forEach(singleRemoveIcon => {
    //     singleRemoveIcon.addEventListener("click", deleteTodoItems)
    // });

    // const editTodoItemIcon = document.querySelectorAll(".edit-todo-item-icon")
    // editTodoItemIcon.forEach(singelEditIcon => {
    //     singelEditIcon.addEventListener("click", displayEditTodoItemForm)
    // });
    fetchTodoItemsForInboxFromLocalStorage(targetProjectId);
}

function fetchTodoItemsFromProjectOnSidebarBasedOnClick(event) {

    const targetProjectId = event.target.dataset.projectId;
    // const targetProjectIdTodosArray = JSON.parse(localStorage.getItem(targetProjectId));
    // console.log(targetProjectIdTodosArray)
    // todoItemMainDisplay.textContent = "";
    // targetProjectIdTodosArray.forEach(element => {
    //     for (const i in element) {
    //         let title = element[i].title;
    //         let description = element[i].description;
    //         let dueDate = element[i].dueDate;
    //         let priority = element[i].priority;
    //         let todoId = element[i].ID;
    //         let projectId = element[i].projectName;

    //         displayTodoItem(title, description, dueDate, priority, todoId, projectId)
    //     }
    // });
    // const removeTodoItemIcons = document.querySelectorAll(".remove-todo-item-icon");
    // removeTodoItemIcons.forEach(singleRemoveIcon => {
    //     singleRemoveIcon.addEventListener("click", deleteTodoItems)
    // });

    // const editTodoItemIcon = document.querySelectorAll(".edit-todo-item-icon")
    // editTodoItemIcon.forEach(singelEditIcon => {
    //     singelEditIcon.addEventListener("click", displayEditTodoItemForm)
    // });


    // console.log("I have been clicked!!", event.target.dataset.projectId)
    todoItemMainDisplay.textContent = "";
    fetchTodoItemsForInboxFromLocalStorage(targetProjectId)
}
addEventListenerOnProjectListsOnSidebar();


const editTodoItemIcon = document.querySelectorAll(".edit-todo-item-icon")
editTodoItemIcon.forEach(singelEditIcon => {
    singelEditIcon.addEventListener("click", displayEditTodoItemForm)
});

function displayEditTodoItemForm(event) {
    console.log("edit icon clicked")
    displayTodoItemInfoOnEditForm(event);
    editTodoItemDialog.showModal();
    editFormSubmitBtn.dataset.projectId = event.target.dataset.projectId;
    editFormSubmitBtn.dataset.todoId = event.target.dataset.todoId;
}


function addProjectListOptionsOnEditForm() {
    let retrievedProjectTableArray = JSON.parse(localStorage.getItem("projectTable"));
    let retrievedInboxId = (localStorage.getItem("inboxId"))

    const optionP = document.createElement("option");
    optionP.textContent = "Inbox";
    optionP.value = retrievedInboxId;
    projectSelectElementOnEditForm.appendChild(optionP)


    retrievedProjectTableArray.forEach(element => {
        let projectName = Object.keys(element)[0]
        let projectId = element[projectName]
        const optionP = document.createElement("option");
        optionP.textContent = projectName;
        optionP.dataset.projectId = projectId;
        optionP.value = projectId;
        projectSelectElementOnEditForm.appendChild(optionP)
    })
}
addProjectListOptionsOnEditForm();


function displayTodoItemInfoOnEditForm(event) {
    let targetProject = JSON.parse(localStorage.getItem(event.target.dataset.projectId));
    // console.log(targetProject);

    // console.log(event.target.dataset.todoId);
    targetProject.forEach(element => {
        if (event.target.dataset.todoId === Object.keys(element)[0]) {
            // console.log(element[event.target.dataset.todoId])
            let targetTodoItem = element[event.target.dataset.todoId];
            console.log(listOfProjectsOnTodoFormCollection)
            todoItemTitleOnEditForm.value = `${targetTodoItem.title}`
            todoItemDescriptionOnEditForm.value = `${targetTodoItem.description}`
            dateOnEditForm.value = `${targetTodoItem.dueDate}`
            priorityListOnEditForm.value = `${targetTodoItem.priority}`



            // making project list option default which is project value of todoitem
            const options = document.querySelectorAll(".project-list-on-edit-form option")
            options.forEach(option => {
                if (option.value == event.target.dataset.projectId) {
                    // console.log(option);
                    option.selected = "selected";
                }
            });


        }
    });
}


editFormSubmitBtn.addEventListener("click", updateDisplayAfterEditFormSubmission)

function updateDisplayAfterEditFormSubmission(event) {
    const formData = new FormData(todoItemEditForm);
    let arrOfFormValues = []
    for (const [key, value] of formData) {
        console.log(`${key}: ${value}`);
        arrOfFormValues.push(value)
    }
    const title = arrOfFormValues[0];
    const description = arrOfFormValues[1];
    const projectName = arrOfFormValues[2];
    const dueDate = arrOfFormValues[3];
    const priority = arrOfFormValues[4];

    console.log(event.target.dataset.projectId)
    let targetProject = JSON.parse(localStorage.getItem(event.target.dataset.projectId));
    // console.log("heee", targetProject)
    targetProject.forEach(todoItem => {
        if (event.target.dataset.todoId === Object.keys(todoItem)[0]) {
            console.log(Object.values(todoItem)[0].title)
            Object.values(todoItem)[0].title = title;
            Object.values(todoItem)[0].description = description;
            Object.values(todoItem)[0].projectName = projectName;
            Object.values(todoItem)[0].dueDate = dueDate;
            Object.values(todoItem)[0].priority = priority;
        }
        console.log(todoItem)
    });
    console.log(targetProject);
    localStorage.setItem(event.target.dataset.projectId, JSON.stringify(targetProject))

    todoItemMainDisplay.textContent = "";
    fetchTodoItemsForInboxFromLocalStorage(event.target.dataset.projectId);
}