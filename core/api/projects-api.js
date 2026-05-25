// =========================
// FETCH PROJECTS
// =========================

async function fetchProjects(){

    const { data, error } =
        await supabaseClient
            .from("projects")
            .select("*")
            .order("created_at", {
                ascending:false
            });

    if(error){

        console.error(
            "Fetch projects error:",
            error
        );

        return [];

    }

    return data;

}

// =========================
// CREATE PROJECT
// =========================

async function createProject(project){

    const { error } =
        await supabaseClient
            .from("projects")
            .insert(project);

    if(error){

        console.error(
            "Create project error:",
            error
        );

    }

}