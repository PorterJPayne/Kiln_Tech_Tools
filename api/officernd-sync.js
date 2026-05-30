import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export default async function handler(req, res) {

    const officeRndTicket = {
    number: 712433,
    subject: "Lehi 1 | 1st | Pillar paint touchups",
    message: "There are two big dents..."
};

const { data, error } =
    await supabase
        .from("tasks")
        .insert({
            title: officeRndTicket.subject,
            description: officeRndTicket.message,
            ticket: `#${officeRndTicket.number}`,
            completed: false,
            archived: false,
            priority: "P3"
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