// ========================================
// FETCH PROJECT LINKS
// ========================================

async function fetchProjectLinks(
    projectId
){

    const { data, error } =
        await supabaseClient
            .from("project_links")
            .select("*")
            .eq(
                "project_id",
                projectId
            );

    if(error){

        console.error(
            "Fetch project links error:",
            error
        );

        return [];

    }

    return data;

}

// ========================================
// ATTACH ITEM
// ========================================

async function attachProjectItem({

    projectId,
    itemType,
    itemId

}){

    const { error } =
        await supabaseClient
            .from("project_links")
            .insert({

                project_id:
                    projectId,

                item_type:
                    itemType,

                item_id:
                    itemId

            });

    if(error){

        console.error(
            "Attach item error:",
            error
        );

    }

}

// ========================================
// REMOVE ITEM
// ========================================

async function removeProjectItem({

    projectId,
    itemType,
    itemId

}){

    const { error } =
        await supabaseClient
            .from("project_links")
            .delete()
            .eq(
                "project_id",
                projectId
            )
            .eq(
                "item_type",
                itemType
            )
            .eq(
                "item_id",
                itemId
            );

    if(error){

        console.error(
            "Remove item error:",
            error
        );

    }

}