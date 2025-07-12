import { supabase } from "../utils/supabaseClient.js";

export const getSongs = async (filter: Record<string, string | null> ) => {

    let query = supabase
        .from("songs")
        .select("*");

    if (filter.id) {
        query = query.eq("id", filter.id);
    }
    if (filter.title) {
        query = query.ilike("title", `%${filter.title}%`);
    }
    if (filter.artist) {
        query = query.ilike("artist", `%${filter.artist}%`);
    }
    if (filter.genre) {
        query = query.eq("genre", filter.genre);
    }

    const { data, error } = await query;
    return { data, error };
};