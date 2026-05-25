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
// CREATE NOTE
// =========================

async function createNote(title){

    const {
        data,
        error
    } = await supabaseClient
        .from("notes")
        .insert([{

            title: title,
            content: "",
            pinned: false,
            updated_at: Date.now()

        }])
        .select()
        .single();

    if(error){

        console.error(
            "Create note error:",
            error
        );

        return null;

    }

    return data;

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

// ========================================
// UPDATE NOTE
// ========================================

async function updateNote({

    id,
    title,
    content

}){

    const { error } =
        await supabaseClient
            .from("notes")
            .update({

                title,
                content

            })
            .eq(
                "id",
                id
            );

    if(error){

        console.error(error);

    }

}