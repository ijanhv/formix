import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eeoiaaigtkpwkppddqwb.supabase.co";
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);
