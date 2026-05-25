export default async function handler(req, res){

    try{

        const response =
            await fetch(
                "https://calendar.google.com/calendar/ical/porter.p%40kiln.com/public/basic.ics"
            );

        const text =
            await response.text();

        res.status(200).send(text);

    }

    catch(error){

        res.status(500).json({
            error: "Failed to fetch calendar"
        });

    }

}