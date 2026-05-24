// ========================================
// SAVE TICKET
// ========================================

async function saveCompletedTicket({

    ticket,
    weekKey

}){

    const {
        error
    } = await supabaseClient
        .from("ticket_history")
        .insert([{

            ticket,

            week_key:weekKey

        }]);

    if(error){

        console.error(
            "saveCompletedTicket error",
            error
        );

    }

}

// ========================================
// FETCH HISTORY
// ========================================

async function fetchTicketHistory(){

    const {
        data,
        error
    } = await supabaseClient
        .from("ticket_history")
        .select("*")
        .order(
            "submitted_at",
            { ascending:false }
        );

    if(error){

        console.error(
            "fetchTicketHistory error",
            error
        );

        return [];

    }

    return data;

}