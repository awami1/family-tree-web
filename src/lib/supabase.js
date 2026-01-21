import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://XXXX.supabase.co";
const supabaseAnonKey = "PUBLIC_ANON_KEY";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
