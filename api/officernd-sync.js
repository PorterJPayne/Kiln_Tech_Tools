import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export default async function handler(req, res) {

    const response = await fetch(
  "https://app.officernd.com/i/organizations/kiln/issues?status=open,new,pending&$limit=1000",
  {
    headers: {
      Cookie: process.env.OFFICERND_COOKIE
    }
  }
);

const data = await response.json();

return res.status(200).json(data);

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