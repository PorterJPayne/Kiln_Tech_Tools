// =========================
// SUPABASE
// =========================
// =========================
// FETCH NOTES
// =========================

async function fetchNotes(){

    const { data, error } =
        await supabaseClient
            .from("notes")
            .select("*")
            .order("updated_at", {
                ascending: false
            });

    if(error){

        console.error(
            "Fetch notes error:",
            error
        );

        return [];

    }

    return data;

}

// =========================
// SAVE NOTE
// =========================

async function saveNote(note){

    const { error } =
        await supabaseClient
            .from("notes")
            .upsert({
                id: note.id,
                title: note.title,
                content: note.content,
                pinned: note.pinned,
                updated_at: note.updatedAt
            });

    if(error){

        console.error(
            "Save note error:",
            error
        );

    }

}

// =========================
// DELETE NOTE
// =========================

async function deleteNoteFromDB(id){

    const { error } =
        await supabaseClient
            .from("notes")
            .delete()
            .eq("id", id);

    if(error){

        console.error(
            "Delete note error:",
            error
        );

    }

}