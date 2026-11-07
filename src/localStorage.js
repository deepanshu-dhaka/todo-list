function storeFormData(todoItem, INBOXID) {
    const retrievedProjectTable = JSON.parse(localStorage.getItem("projectTable"));

    console.log("projectName:", todoItem.projectName);
    if (todoItem.projectName === INBOXID) {
        let retrieved = JSON.parse(localStorage.getItem(INBOXID));
        retrieved.push({ [todoItem.ID]: todoItem })
        localStorage.setItem(INBOXID, JSON.stringify(retrieved))
        return;

    }
    retrievedProjectTable.forEach(element => {
        if (todoItem.projectName == Object.values(element)[0]) {
            const retrievedProject = JSON.parse(localStorage.getItem(Object.values(element)[0]));
            retrievedProject.push({ [todoItem.ID]: todoItem });
            localStorage.setItem(Object.values(element)[0], JSON.stringify(retrievedProject))
        }
    });

}


function setInitialInboxId(INBOXID) {
    if (localStorage.getItem("inboxId") === null) {
        const GEN_INBOXID = crypto.randomUUID();
        localStorage.setItem("inboxId", GEN_INBOXID);
        localStorage.setItem(GEN_INBOXID, JSON.stringify([]))

        INBOXID = (localStorage.getItem("inboxId"));



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

export { storeFormData, setInitialInboxId, setInitialProjectTable }