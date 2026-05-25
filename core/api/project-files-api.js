// ========================================
// FETCH FILES
// ========================================

async function fetchProjectFiles(
    projectId
){

    const { data, error } =
        await supabaseClient
            .from("project_files")
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
            "Fetch files error:",
            error
        );

        return [];

    }

    return data;

}

// ========================================
// SAVE FILE
// ========================================

async function saveProjectFile({

    projectId,
    fileName,
    fileUrl

}){

    const { error } =
        await supabaseClient
            .from("project_files")
            .insert({

                project_id:
                    projectId,

                file_name:
                    fileName,

                file_url:
                    fileUrl

            });

    if(error){

        console.error(
            "Save project file error:",
            error
        );

    }

}