import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

// Load environment variables from .env file
dotenv.config();

// Read from .env file
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// create and export supabase client for backend and supabase database communication
export const supabase = createClient(supabaseUrl, supabaseKey);

// currently songs are not able to be added through UX
