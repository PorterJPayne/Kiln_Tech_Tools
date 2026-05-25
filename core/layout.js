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

// =========================
// TODAY EVENTS
// =========================

async function loadTodayEvents(){

    const ICS_URL =
        "https://calendar.google.com/calendar/ical/porter.p%40kiln.com/public/basic.ics";

    const proxy =
        "https://api.allorigins.win/raw?url=";

    const response =
        await fetch(
            proxy + encodeURIComponent(ICS_URL)
        );

    const text =
        await response.text();

    console.log(text);

}

const textElement =
    document.getElementById(
        "todayEventsText"
    );

if(!textElement) return;

loadTodayEvents();

function updateTodayEvents(){

    const text =
        document.getElementById(
            "todayEventsText"
        );

    if(!text) return;

    if(!todaysEvents.length){

        text.textContent =
            "No events today";

        return;

    }

    const nextEvent =
        todaysEvents[0];

    text.textContent =
        `${todaysEvents.length} Events Today • Next: ${nextEvent.title} @ ${nextEvent.time}`;

}

updateTodayEvents();

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


const todaysEvents = [
  {
    title: "Client Tour",
    time: "1:30 PM"
  },
  {
    title: "Vendor Call",
    time: "3:00 PM"
  }
];

function updateTodayEvents() {
  const text = document.getElementById("todayEventsText");

  if (!todaysEvents.length) {
    text.textContent = "No events today";
    return;
  }

  const nextEvent = todaysEvents[0];

  text.textContent =
    `${todaysEvents.length} Events Today • Next: ${nextEvent.title} @ ${nextEvent.time}`;
}

