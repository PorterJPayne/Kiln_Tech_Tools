let allTasks = [];


// =========================
// INIT
// =========================

init();



async function init(){

    await loadTasks();

    setupDropzones();

}


// =========================
// LOAD TASKS
// =========================

async function loadTasks(){

    allTasks =
        await fetchTasks();

    renderInbox();

    renderPlanner();

}


// =========================
// INBOX
// =========================

function renderInbox(){

    const container =
        document.getElementById(
            "inboxTable"
        );

    container.innerHTML = "";

    const inboxTasks =
        allTasks.filter(
            task =>
                !task.completed &&
                !task.scheduled_day
        );

    inboxTasks.forEach(task => {

        container.appendChild(
            createTaskCard(task)
        );

    });

}


// =========================
// PLANNER
// =========================

function renderPlanner(){

    document
    .querySelectorAll(
        ".planner-column .planner-dropzone"
    )
        .forEach(zone => {

            zone.innerHTML = "";

        });

    const counts = {};

    allTasks
        .filter(
            task =>
                !task.completed &&
                task.scheduled_day
        )
        .forEach(task => {

            const day =
                task.scheduled_day;

            counts[day] =
                (counts[day] || 0) + 1;

            const zone =
                document.querySelector(
                    `[data-day="${day}"] .planner-dropzone`
                );

            if(!zone) return;

            zone.appendChild(
                createTaskCard(task)
            );

        });

    [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday"
    ].forEach(day => {

        const el =
            document.getElementById(
                `count-${day}`
            );

        if(el){

            el.textContent =
                counts[day] || 0;

        }

    });

}


// =========================
// TASK CARD
// =========================

function createTaskCard(task){

    const card =
        document.createElement("div");

    card.className =
        "task-card";

    card.draggable = true;

    card.dataset.id =
        task.id;

    card.innerHTML = `

        <div class="task-title">
            ${task.title}
        </div>

        <div class="task-meta">

            ${task.priority || "P3"}

            •

            ${task.building || "No Building"}

        </div>

    `;

    card.addEventListener(
        "dragstart",
        e => {

            e.dataTransfer.setData(
                "taskId",
                task.id
            );

        }
    );

    return card;

}


// =========================
// DROPZONES
// =========================

function setupDropzones(){

    document
        .querySelectorAll(
            ".planner-dropzone"
        )
        .forEach(zone => {

            zone.addEventListener(
                "dragover",
                e => {

                    e.preventDefault();

                    zone.classList.add(
                        "drag-over"
                    );

                }
            );

            zone.addEventListener(
                "dragleave",
                () => {

                    zone.classList.remove(
                        "drag-over"
                    );

                }
            );

            zone.addEventListener(
                "drop",
                async e => {

                    e.preventDefault();

                    zone.classList.remove(
                        "drag-over"
                    );

                    const taskId =
                        e.dataTransfer.getData(
                            "taskId"
                        );

                    const day =
    zone.parentElement.dataset.day;

if(day){

    await moveTaskToDay(
        taskId,
        day
    );

}

else{

    await moveTaskToInbox(
        taskId
    );

}

                    await loadTasks();

                }
            );

        });

}

