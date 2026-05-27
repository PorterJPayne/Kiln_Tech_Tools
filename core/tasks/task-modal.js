// =========================
// TASK MODAL INIT
// =========================

initTaskModal();


// =========================
// INIT
// =========================

function initTaskModal(){

    setupTaskModalButtons();

    setupSmartTicketPaste();

}


// =========================
// OPEN MODAL
// =========================

function openTaskModal(){

    const modal =
        document.getElementById(
            "taskModal"
        );

    if(!modal) return;

    modal.classList.remove(
        "hidden"
    );

}


// =========================
// CLOSE MODAL
// =========================

function closeTaskModal(){

    const modal =
        document.getElementById(
            "taskModal"
        );

    if(!modal) return;

    modal.classList.add(
        "hidden"
    );

}


// =========================
// BUTTONS
// =========================

function setupTaskModalButtons(){

    document.addEventListener(
        "click",
        async e => {

            // CLOSE

            if(
                e.target.id ===
                "cancelTaskBtn"
            ){

                closeTaskModal();

            }


            // SAVE

            if(
                e.target.id ===
                "saveTaskBtn"
            ){

                await saveTaskFromModal();

            }

        }
    );

}


// =========================
// SAVE TASK
// =========================

async function saveTaskFromModal(){

    const ticketInput =
        document.getElementById(
            "taskTicket"
        );

    const task = {

        ticket:
            ticketInput.value,

        link:
            ticketInput.dataset.link || "",

        title:
            document.getElementById(
                "taskTitle"
            ).value,

        description:
            document.getElementById(
                "taskDescription"
            ).value,

        priority:
            document.getElementById(
                "taskPriority"
            ).value,

        building:
            document.getElementById(
                "taskBuilding"
            ).value

    };

    await createTask(task);

    closeTaskModal();

    resetTaskModal();

    if(
        typeof loadTasks ===
        "function"
    ){

        await loadTasks();

    }

}


// =========================
// RESET
// =========================

function resetTaskModal(){

    document.getElementById(
        "taskTicket"
    ).value = "";

    document.getElementById(
        "taskTicket"
    ).dataset.link = "";

    document.getElementById(
        "taskTitle"
    ).value = "";

    document.getElementById(
        "taskDescription"
    ).value = "";

    document.getElementById(
        "taskPriority"
    ).value = "P3";

    document.getElementById(
        "taskBuilding"
    ).value = "";

}


// =========================
// SMART TICKET PASTE
// =========================

function setupSmartTicketPaste(){

    document.addEventListener(
        "paste",
        e => {

            const active =
                document.activeElement;

            if(
                !active ||
                active.id !== "taskTicket"
            ){
                return;
            }

            const html =
                e.clipboardData.getData(
                    "text/html"
                );

            if(!html) return;

            const parser =
                new DOMParser();

            const doc =
                parser.parseFromString(
                    html,
                    "text/html"
                );

            const anchor =
                doc.querySelector("a");

            if(!anchor) return;

            e.preventDefault();

            active.value =
                anchor.textContent.trim();

            active.dataset.link =
                anchor.href;

        }
    );

}