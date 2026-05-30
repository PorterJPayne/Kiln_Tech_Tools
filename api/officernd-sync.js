import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export default async function handler(req, res) {

    const { data, error } =
        await supabase
            .from("tasks")
            .insert({
                title: "Sync Test",
                ticket: "#TEST"
            })
            .select();

    if (error) {

        return res.status(500).json({
            success: false,
            error
        });

    }

    return res.status(200).json({
        success: true,
        data
    });

}