// =========================
// SUPABASE
// =========================

const SUPABASE_URL =
    "https://otwlqqhiiinltxdydcev.supabase.co";

const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90d2xxcWhpaWlubHR4ZHlkY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0OTYzMDcsImV4cCI6MjA5NTA3MjMwN30.HoUbXld83LQBiatA9P3zt8ffwgMzqZApwdj88gzjgRw";



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