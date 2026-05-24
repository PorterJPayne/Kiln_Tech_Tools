// =========================
// FETCH EMAIL ENTRIES
// =========================

async function fetchEmailEntries(){

    const { data, error } =
        await supabaseClient
            .from("email_entries")
            .select("*")
            .order("created_at", {
                ascending:true
            });

    if(error){

        console.error(
            "Fetch email entries error:",
            error
        );

        return [];

    }

    return data;

}

// =========================
// CREATE EMAIL ENTRY
// =========================

async function createEmailEntry(entry){

    const { error } =
        await supabaseClient
            .from("email_entries")
            .insert(entry);

    if(error){

        console.error(
            "Create email entry error:",
            error
        );

    }

}