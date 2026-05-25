// =========================
// LOAD SIDEBAR
// =========================

async function loadSidebar(){

    const sidebar =
        document.getElementById(
            "sidebar"
        );

    if(!sidebar) return;

    const response =
        await fetch("/core/sidebar.html");

    const html =
        await response.text();

    sidebar.innerHTML = html;

    setActiveNav();

}

// =========================
// LOAD TOPBAR
// =========================

async function loadTopbar(){

    const topbar =
        document.getElementById(
            "topbar"
        );

    if(!topbar) return;

    const response =
        await fetch("/core/topbar.html");

    const html =
        await response.text();

   topbar.innerHTML = html;

loadTodayEvents();

    

 

    const title =
        document.body.dataset.title || "";

    const description =
        document.body.dataset.description || "";

    document.getElementById(
        "topbarTitle"
    ).textContent = title;

    document.getElementById(
        "topbarDescription"
    ).textContent = description;

    const btn =
    document.querySelector(
        '.mobile-menu-btn'
    );

const sidebar =
    document.querySelector(
        '.sidebar'
    );

const overlay =
    document.querySelector(
        '.sidebar-overlay'
    );

if(btn && sidebar){

    btn.addEventListener('click', () => {

        sidebar.classList.toggle('open');

        if(overlay){
            overlay.classList.toggle('open');
        }

    });

    if(overlay){

        overlay.addEventListener('click', () => {

            sidebar.classList.remove('open');

            overlay.classList.remove('open');

        });

    }

}
const closeBtn =
    document.querySelector(
        '.sidebar-close-btn'
    );
    if(closeBtn){

    closeBtn.addEventListener('click', () => {

        sidebar.classList.remove('open');

        if(overlay){
            overlay.classList.remove('open');
        }

    });

}
}


async function loadTodayEvents(){

    const textElement =
        document.getElementById(
            "todayEventsText"
        );

    if(!textElement) return;

    try{

        const {
    data: aliases
} = await supabase
    .from("event_aliases")
    .select("*");

        const response =
            await fetch("/api/calendar");

        if(!response.ok){

            textElement.textContent =
                "Events unavailable";

            return;

        }

        const text =
            await response.text();

        const events =
            text.split("BEGIN:VEVENT")
            .slice(1);

        const todaysEvents = [];

        events.forEach(event => {

            const titleMatch =
                event.match(/SUMMARY:(.*)/);

            const startMatch =
                event.match(/DTSTART.*:(.*)/);

            if(
                !titleMatch ||
                !startMatch
            ) return;

            const googleTitle =
    titleMatch[1].trim();

const start =
    startMatch[1].trim();

const alias =
    aliases?.find(
        a => a.event_id === start
    );

const title =
    alias?.custom_title ||
    googleTitle;

            const year =
                start.substring(0,4);

            const month =
                start.substring(4,6);

            const day =
                start.substring(6,8);

            const hour =
                start.substring(9,11);

            const minute =
                start.substring(11,13);

            const eventDate =
                new Date(
                    `${year}-${month}-${day}T${hour}:${minute}:00Z`
                );

            const now =
                new Date();

            const isToday =
                eventDate.toDateString() ===
                now.toDateString();

            if(isToday){

                todaysEvents.push({
                    title,
                    start,
                    eventDate
                });

            }

        });

        if(!todaysEvents.length){

            textElement.textContent =
                "No events today";

            return;

        }

        todaysEvents.sort((a,b)=>
            a.eventDate - b.eventDate
        );

        const now =
            new Date();

        const upcomingEvents =
            todaysEvents.filter(
                event =>
                    event.eventDate > now
            );

        const nextEvent =
            upcomingEvents[0] ||
            todaysEvents[0];

        const formattedTime =
            nextEvent.eventDate
            .toLocaleTimeString(
                [],
                {
                    hour: "numeric",
                    minute: "2-digit"
                }
            );

        textElement.textContent =
            `${todaysEvents.length} Events Today • Next: ${nextEvent.title} @ ${formattedTime}`;

        const pill =
            document.getElementById(
                "todayEventsPill"
            );

        const dropdown =
            document.getElementById(
                "todayEventsDropdown"
            );

        if(dropdown){

            dropdown.innerHTML =
                todaysEvents.map(event => {

                    const time =
                        event.eventDate
                        .toLocaleTimeString(
                            [],
                            {
                                hour:"numeric",
                                minute:"2-digit"
                            }
                        );

                    return `

                        <div class="today-event-row">

                            <div class="today-event-info">

                                <div class="today-event-time">
                                    ${time}
                                </div>

                                <div class="today-event-title">
                                    ${event.title}
                                </div>

                            </div>

                            <div
                                class="edit-event-btn"
                                data-event-id="${event.start}"
                            >
                                ✏️
                            </div>

                        </div>

                    `;

                }).join("");

        }

        if(pill && dropdown){

            pill.onclick = () => {

                dropdown.classList.toggle(
                    "hidden"
                );

            };

        }


    document
    .querySelectorAll(
        ".edit-event-btn"
    )
    .forEach(button => {

        button.onclick =
            async () => {

                const eventId =
                    button.dataset.eventId;

                const currentTitle =
                    button
                    .closest(
                        ".today-event-row"
                    )
                    .querySelector(
                        ".today-event-title"
                    )
                    .textContent;

                const newTitle =
                    prompt(
                        "Rename event",
                        currentTitle
                    );

                if(!newTitle) return;

                await supabase
                    .from("event_aliases")
                    .upsert({
                        event_id: eventId,
                        custom_title: newTitle
                    });

                loadTodayEvents();

            };

    });

}

    catch(error){

        console.error(error);

        textElement.textContent =
            "Events unavailable";

    }

}
// =========================
// ACTIVE PAGE
// =========================

function setActiveNav(){

    const path =
        window.location.pathname;

    const buttons =
        document.querySelectorAll(
            ".nav-button"
        );

    buttons.forEach(button => {

        const page =
            button.dataset.page;

        if(path.includes(page)){

            button.classList.add(
                "active"
            );

        }

    });

}

// =========================
// NAVIGATION
// =========================

function navigateTo(path){

    window.location.href = path;

}


// ========================================
// SEARCH
// ========================================

async function initGlobalSearch(){
console.log("SEARCH INIT");
    const input =
        document.getElementById(
            "globalSearchInput"
        );

    const resultsBox =
        document.getElementById(
            "globalSearchResults"
        );

    if(!input || !resultsBox) return;

    input.addEventListener(
        "input",
        async () => {
console.log("typing");

const query =
    input.value.trim();

console.log(query);
            if(query.length < 2){

                resultsBox.innerHTML = "";

                return;

            }

            const results =
                await globalSearch(query);

            resultsBox.innerHTML = results
                .map(result => `

                    <a
                        class="search-result"
                        href="${result.url}"
                    >

                        <div>
                            ${result.icon}
                        </div>

                        <div>

                            <div class="search-result-title">
                                ${result.title}
                            </div>

                            <div class="search-result-description">
                                ${result.description}
                            </div>

                        </div>

                    </a>

                `)
                .join("");

        }
    );

    input.addEventListener(
    "keydown",
    e => {

        if(e.key === "Enter"){

            const query =
                input.value.trim();

            if(!query) return;

            window.location.href =
                `/search.html?q=${encodeURIComponent(
                    query
                )}`;

        }

    }
);

}
// =========================
// INIT
// =========================

loadSidebar();

loadTopbar();

setTimeout(() => {

    initGlobalSearch();

}, 300);


// =========================
// GLOBAL TASK MODAL
// =========================



// =========================
// OPEN
// =========================

document.addEventListener(
    "click",
    e => {

        if(
            e.target.id ===
            "globalTaskBtn"
        ){

            const modal =
    document.getElementById(
        "taskModal"
    );

if(modal){

    modal.classList.remove(
        "hidden"
    );

}

        }

    }
);

// =========================
// CLOSE
// =========================

document.addEventListener(
    "click",
    e => {

        if(
            e.target.id ===
            "closeTaskModal"
        ){

           const modal =
    document.getElementById(
        "taskModal"
    );

if(modal){

    modal.classList.add(
        "hidden"
    );

}

        }

    }
);

// =========================
// SAVE TASK
// =========================

document.addEventListener(
    "click",
    async e => {

        if(
            e.target.id ===
            "saveTaskBtn"
        ){

            const task = {

                title:
                    document.getElementById(
                        "taskTitle"
                    ).value,

                description:
                    document.getElementById(
                        "taskDescription"
                    ).value,

                ticket:
                    document.getElementById(
                        "taskTicket"
                    ).value,

                link:
                    document.getElementById(
                        "taskLink"
                    ).value

            };

            await createTask(task);

          const modal =
    document.getElementById(
        "taskModal"
    );

if(modal){

    modal.classList.add(
        "hidden"
    );

}

            // OPTIONAL:
            // refresh queue if dashboard

            // =========================
// OPTIONAL DASHBOARD REFRESH
// =========================

if(
    window.location.pathname
        .includes("dashboard")
){

    if(
        typeof loadTasks ===
        "function"
    ){

        loadTasks();

    }

}
        }

    }
);
