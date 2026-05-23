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

            const query =
                input.value.trim();

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

}
// =========================
// INIT
// =========================

loadSidebar();
loadTopbar();

setTimeout(() => {

    initGlobalSearch();

}, 100);

