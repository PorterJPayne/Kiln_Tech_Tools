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