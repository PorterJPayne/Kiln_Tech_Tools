// =========================
// FETCH TASKS
// =========================

async function fetchTasks(){

    const { data, error } =
        await supabaseClient
            .from("tasks")
            .select("*")
            .eq(
    "archived",
    false
)
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

    const payload = {

        title:
            task.title || "",

        description:
            task.description || "",

        ticket:
            task.ticket || "",

        link:
            task.link || "",

        priority:
            task.priority || "P3",

        building:
            task.building || "",

        scheduled_day:
            task.scheduled_day || null,

        rollover_count:
            task.rollover_count || 0,

        recurring:
            task.recurring || false,

        recurring_type:
            task.recurring_type || null,

        archived:false,

        completed:false

    };

    const { error } =
        await supabaseClient
            .from("tasks")
            .insert(payload);

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
// MOVE TASK TO DAY
// =========================

async function moveTaskToDay(
    id,
    day
){

    return updateTask(
        id,
        {
            scheduled_day:day
        }
    );

}


// =========================
// MOVE TASK TO INBOX
// =========================

async function moveTaskToInbox(id){

    return updateTask(
        id,
        {
            scheduled_day:null
        }
    );

}


// =========================
// FETCH TASKS FOR DAY
// =========================

async function fetchTasksForDay(day){

    const { data, error } =
        await supabaseClient
            .from("tasks")
            .select("*")
            .eq(
                "scheduled_day",
                day
            )
            .eq(
                "completed",
                false
            )
            .order(
                "created_at",
                {
                    ascending:false
                }
            );

    if(error){

        console.error(
            "Fetch day tasks error:",
            error
        );

        return [];

    }

    return data;

}


// =========================
// FETCH INBOX TASKS
// =========================

async function fetchInboxTasks(){

    const { data, error } =
        await supabaseClient
            .from("tasks")
            .select("*")
            .is(
                "scheduled_day",
                null
            )
            .eq(
                "completed",
                false
            )
            .order(
                "created_at",
                {
                    ascending:false
                }
            );

    if(error){

        console.error(
            "Fetch inbox tasks error:",
            error
        );

        return [];

    }

    return data;

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

    const { data: task } =
        await supabaseClient
            .from("tasks")
            .select("*")
            .eq("id", taskId)
            .single();

    if(task?.officernd_id){

        await supabaseClient
            .from("officernd_actions")
            .insert({

                action_type:
                    "resolve",

                ticket_id:
                    task.officernd_id,

                task_id:
                    taskId

            });

    }

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

// =========================
// GET CURRENT DAY
// =========================

function getCurrentDay(){

    const days = [

        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"

    ];

    return days[
        new Date().getDay()
    ];

}


// =========================
// FETCH TODAY TASKS
// =========================

async function fetchTodayTasks(){

    return fetchTasksForDay(
        getCurrentDay()
    );

}

// =========================
// ARCHIVE TASK
// =========================

async function archiveTask(id){

    return updateTask(
        id,
        {
            archived:true
        }
    );

}