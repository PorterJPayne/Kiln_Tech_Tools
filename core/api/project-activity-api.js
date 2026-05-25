// ========================================
// FETCH ACTIVITY
// ========================================

async function fetchProjectActivity(
    projectId
){

    const { data, error } =
        await supabaseClient
            .from("project_activity")
            .select("*")
            .eq(
                "project_id",
                projectId
            )
            .order(
                "created_at",
                {
                    ascending:false
                }
            );

    if(error){

        console.error(
            "Fetch activity error:",
            error
        );

        return [];

    }

    return data;

}

// ========================================
// ADD ACTIVITY
// ========================================

async function addProjectActivity({

    projectId,
    activity

}){

    const { error } =
        await supabaseClient
            .from("project_activity")
            .insert({

                project_id:
                    projectId,

                activity

            });

    if(error){

        console.error(
            "Add activity error:",
            error
        );

    }

}