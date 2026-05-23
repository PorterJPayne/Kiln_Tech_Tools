// =========================
// LOAD SIDEBAR
// =========================
console.log("LAYOUT LOADED");
async function loadSidebar(){
console.log("LOADING SIDEBAR");
    const sidebar =
        document.getElementById(
            "sidebar"
        );

    if(!sidebar) return;

    const response =
    await fetch("./core/sidebar.html");
console.log(response);
    const html =
        await response.text();

    sidebar.innerHTML = html;
console.log("SIDEBAR INSERTED");
    setActiveNav();

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

// =========================
// INIT
// =========================

loadSidebar();
console.log("navigateTo:", navigateTo);