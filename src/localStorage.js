function storeFormData(todoItem, INBOXID) {

    console.log("projectName:", todoItem.projectName);
    console.log(INBOXID)
    if (todoItem.projectName === INBOXID) {
        let retrieved = JSON.parse(localStorage.getItem(INBOXID));
        retrieved.push({ [todoItem.ID]: todoItem })
        console.log("retrieved", retrieved)
        localStorage.setItem(INBOXID, JSON.stringify(retrieved))

    }
    // localStorage.setItem(todoId, JSON.stringify(todoItem))

}

function consoleStoredData(todoItem) {
    const todoId = String(todoItem.ID);
    console.log("hello", JSON.parse(localStorage.getItem(todoId)));
}

function setInitialInboxId(INBOXID) {
    if (localStorage.getItem("inboxId") === null) {
        const GEN_INBOXID = crypto.randomUUID();
        localStorage.setItem("inboxId", GEN_INBOXID);
        localStorage.setItem(GEN_INBOXID, JSON.stringify([]))

        INBOXID = (localStorage.getItem("inboxId"));


        console.log(INBOXID)
        console.log("inbox id set");
    }
    else {
        INBOXID = (localStorage.getItem("inboxId"));
    }
    return INBOXID;
}

function setInitialProjectTable() {
    if (localStorage.getItem("projectTable") === null) {
        localStorage.setItem("projectTable", JSON.stringify([]));
    }
}

export { storeFormData, consoleStoredData, setInitialInboxId, setInitialProjectTable }