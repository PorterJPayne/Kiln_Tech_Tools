let inboxTasks = [];

let plannerTasks = [];


// =========================
// INIT
// =========================

init();


async function init(){

    await loadInbox();

    await loadPlanner();

}


// =========================
// LOAD INBOX
// =========================

async function loadInbox(){

    inboxTasks =
        await fetchInboxTasks();

    renderInbox();

}


// =========================
// LOAD PLANNER
// =========================

async function loadPlanner(){

    plannerTasks =
        await fetchTasks();

    renderPlanner();

}


// =========================
// RENDER INBOX
// =========================

function renderInbox(){

    const container =
        document.getElementById(
            "inbox-table"
        );

    container.innerHTML = "";

    document.getElementById(
        "inbox-count"
    ).textContent =
        inboxTasks.length;

    inboxTasks.forEach(task => {

        const row =
            createTaskCard(task);

        container.appendChild(row);

    });

}


// =========================
// RENDER PLANNER
// =========================

function renderPlanner(){

    document
        .querySelectorAll(
            ".planner-dropzone"
        )
        .forEach(zone => {

            zone.innerHTML = "";

        });

    const counts = {

        monday:0,
        tuesday:0,
        wednesday:0,
        thursday:0,
        friday:0

    };

    plannerTasks
        .filter(
            task => task.scheduled_day
        )
        .forEach(task => {

            counts[
                task.scheduled_day
            ]++;

            const zone =
                document.querySelector(
                    `[data-day="${task.scheduled_day}"] .planner-dropzone`
                );

            if(!zone) return;

            const card =
                createTaskCard(task);

            zone.appendChild(card);

        });

    Object.entries(counts)
        .forEach(([day,count]) => {

            const el =
                document.getElementById(
                    `count-${day}`
                );

            if(el){

                el.textContent =
                    count;

            }

        });

}


// =========================
// CREATE TASK CARD
// =========================

function createTaskCard(task){

    const div =
        document.createElement("div");

    div.className =
        "task-row card";

    div.draggable = true;

    div.dataset.id =
        task.id;

    div.innerHTML = `

        <div class="task-card-content">

            <div class="task-title">
                ${task.title}
            </div>

            <div class="task-meta">

                <span class="tag tag-yellow">
                    ${task.priority || "P3"}
                </span>

                <span>
                    ${task.building || "No Building"}
                </span>

            </div>

        </div>

    `;

    div.addEventListener(
        "dragstart",
        e => {

            e.dataTransfer.setData(
                "taskId",
                task.id
            );

        }
    );

    return div;

}


// =========================
// DROPZONES
// =========================

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

                await moveTaskToDay(
                    taskId,
                    day
                );

                await refresh();

            }
        );

    });


// =========================
// REFRESH
// =========================

async function refresh(){

    await loadInbox();

    await loadPlanner();

}