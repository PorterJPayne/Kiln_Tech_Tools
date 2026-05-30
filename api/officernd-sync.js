import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export default async function handler(req, res) {

    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, OPTIONS"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    if (req.method === "OPTIONS") {

        return res.status(200).end();

    }

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method not allowed"
        });

    }

    const { tickets } = req.body;

    let added = 0;
    let skipped = 0;
    let errors = 0;

    for (const ticket of tickets) {

        try {

            const { data: existing } =
                await supabase
                    .from("tasks")
                    .select("id")
                    .eq(
                        "officernd_id",
                        ticket._id
                    )
                    .limit(1);

            if (existing?.length) {

                skipped++;

                continue;

            }

            let building = null;

            if (
                ticket.subject?.startsWith(
                    "Lehi 1"
                )
            ) {

                building = "Lehi 1";

            }
            else if (
                ticket.subject?.startsWith(
                    "Lehi 2"
                )
            ) {

                building = "Lehi 2";

            }

            const { error } =
                await supabase
                    .from("tasks")
                    .insert({

                        officernd_id:
                            ticket._id,

                        ticket:
                            `#${ticket.number}`,

                        title:
                            ticket.subject || "",

                        description:
                            ticket.message || "",

                        building:
                            building,

                        link:
                            `https://app.officernd.com/admin/kiln/collaboration/issues/${ticket._id}`,

                        completed:
                            false,

                        archived:
                            false,

                        priority:
                            "P3"

                    });

            if (error) {

                console.error(error);

                errors++;

            }
            else {

                added++;

            }

        }
        catch (err) {

            console.error(err);

            errors++;

        }

    }

    return res.status(200).json({

        success: true,
        added,
        skipped,
        errors

    });

}