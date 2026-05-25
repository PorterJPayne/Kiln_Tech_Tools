// =========================
// FETCH TASKS
// =========================

async function fetchTasks(){

    const { data, error } =
        await supabaseClient
            .from("tasks")
            .select("*")
            .order("created_at", {
                ascending:false
            });

    if(error){

        console.error(
            "Fetch tasks error:",
            error
        );

        return [];

    }

    return data;

}

// =========================
// CREATE TASK
// =========================

async function createTask(task){

    const { error } =
        await supabaseClient
            .from("tasks")
            .insert(task);

    if(error){

        console.error(
            "Create task error:",
            error
        );

    }

}

// =========================
// UPDATE TASK
// =========================

async function updateTask(id, updates){

    const { error } =
        await supabaseClient
            .from("tasks")
            .update(updates)
            .eq("id", id);

    if(error){

        console.error(
            "Update task error:",
            error
        );

    }

}


// =========================
// DELETE EMAIL ENTRY
// =========================

async function deleteEmailEntry(id){

    const { error } =
        await supabaseClient
            .from("email_entries")
            .delete()
            .eq("id", id);

    if(error){

        console.error(
            "Delete email entry error:",
            error
        );

    }

}


// ========================================
// COMPLETE TASK
// ========================================

async function completeTask({

    taskId,
    notes

}){

    const { error } =
        await supabaseClient
            .from("tasks")
            .update({

                completed:true,

                completed_at:
                    new Date()
                        .toISOString(),

                completion_notes:
                    notes

            })
            .eq(
                "id",
                taskId
            );

    if(error){

        console.error(
            "Complete task error:",
            error
        );

    }

}