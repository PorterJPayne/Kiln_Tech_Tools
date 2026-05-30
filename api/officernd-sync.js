import { createClient } from "@supabase/core/api/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {

    const { data, error } =
        await supabase
            .from("officernd_issues")
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