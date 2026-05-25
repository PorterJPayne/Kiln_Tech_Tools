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

// ========================================
// WEEKLY TOTALS
// ========================================

async function getWeeklyTicketTotals(){

    const history =
        await fetchTicketHistory();

    const totals = {};

    history.forEach(item => {

        if(!totals[item.week_key]){

            totals[item.week_key] = 0;

        }

        totals[item.week_key]++;

    });

    return totals;

}

// ========================================
// MONTHLY TOTALS
// ========================================

async function getMonthlyTicketTotals(){

    const history =
        await fetchTicketHistory();

    const totals = {};

    history.forEach(item => {

        const date =
            new Date(item.submitted_at);

        const key =
            `${date.getFullYear()}-${
                String(
                    date.getMonth() + 1
                ).padStart(2,"0")
            }`;

        if(!totals[key]){

            totals[key] = 0;

        }

        totals[key]++;

    });

    return totals;

}

window.fetchFreshserviceTickets =
    fetchFreshserviceTickets;