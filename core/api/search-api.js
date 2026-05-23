// ========================================
// GLOBAL SEARCH
// ========================================

async function globalSearch(query){

    const results = [];

    // =========================
    // NOTES
    // =========================

    const notes =
        await fetchNotes();

    notes.forEach(note => {

        const searchable =
            `
                ${note.title}
                ${note.content}
            `
            .toLowerCase();

        if(
            searchable.includes(
                query.toLowerCase()
            )
        ){

            results.push({

                type:"note",

                title:note.title,

                description:
                    stripHtml(note.content)
                        .slice(0,120),

                url:
                    `/notes.html?id=${note.id}`,

                icon:"📝"

            });

        }

    });

    return results;

}

// ========================================
// HELPERS
// ========================================

function stripHtml(html){

    const div =
        document.createElement("div");

    div.innerHTML = html;

    return div.textContent || "";

}