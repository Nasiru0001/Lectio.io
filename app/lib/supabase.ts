import { createClient } from "@supabase/supabase-js";

const supabaseurl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabasekey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

export const supabase = createClient(supabaseurl, supabasekey);
