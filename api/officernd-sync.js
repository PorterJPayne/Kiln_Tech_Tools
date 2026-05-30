import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export default async function handler(req, res) {

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

                    completed:
                        ticket.status === "resolved",

                    archived:false,

                    priority:"P3"

                });

        if (error) {

            errors++;

        }
        else {

            added++;

        }

    }

    return res.status(200).json({

        success:true,
        added,
        skipped,
        errors

    });

}