import { supabase } from "../../core/api/supabaseAdmin"; // adjust to your project

export default async function handler(req, res) {

    const { error } = await supabase
        .from("officernd_issues")
        .insert({
            title: "OfficeRnD Sync Test",
            description: "Created by sync route",
            ticket: "#TEST"
        });

    if (error) {
        return res.status(500).json({
            success: false,
            error
        });
    }

    return res.status(200).json({
        success: true
    });

}