//import { createClient } from "@supabase/supabase-js";

//const supabaseUrl = 'https://jkemablawsjwcfyaljyx.supabase.co'
//const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZW1hYmxhd3Nqd2NmeWFsanl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5ODQ0MzgsImV4cCI6MjA5MDU2MDQzOH0.uZwSOjdyHn5vUD3XwjXhOhwXZ7y7HU3PJASCnznekWI"
//export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
