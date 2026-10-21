const formRef = document.querySelector(".todo-item-collection-form");
const formContainer = document.querySelector(".todo-item-container");

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

const submitBtn = document.querySelector(".submitBtn")
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const arrOfFormValues = getFormData(formRef);
    const title = arrOfFormValues[0];
    const description = arrOfFormValues[1];
    const projectName = arrOfFormValues[2];
    const todoItemDueDate = arrOfFormValues[3];
    const priority = arrOfFormValues[4];

    createTodoItem(title, description, todoItemDueDate, priority, projectName);
})