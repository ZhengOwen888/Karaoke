import { supabase } from "../utils/supabaseClient.js";

export const getScores = async (userId: string, filter: Record<string, string | null>) => {
    // Input validation
    if (!userId) {
        return {
            data: null,
            error: { message: "Missing required information" }
        };
    }

    let query = supabase
        .from("scores")
        .select("*, songs(*)")
        .eq("user_id", userId);

    if (filter.id) {
        query = query.eq("songs.id", filter.id);
    }
    if (filter.title) {
        query = query.ilike("songs.title", `%${filter.title}%`);
    }
    if (filter.artist) {
        query = query.ilike("songs.artist", `%${filter.artist}%`);
    }
    if (filter.genre) {
        query = query.eq("songs.genre", filter.genre);
    }

    const { data, error } = await query;
    return { data, error };
};

export const postScores = async (userId: string, songId: string, score: number) => {
    // Input validation
    if (!userId || !songId || score < 0) {
        return { error: { message: "Missing required infomation or negative score" } };
    }

    // Fetch data if any
    const { data: existingData, error: fetchError } = await supabase
        .from("scores")
        .select("*")
        .eq("user_id", userId)
        .eq("song_id", songId)
        .maybeSingle();

    // Failed to fetch data
    if (fetchError) {
        return { error: fetchError };
    }

    if (existingData) {
        // Update existing data
        if (score > existingData.score) {
            const { error: updateError } = await supabase
                .from("scores")
                .update({
                    "score": score,
                    "updated_at": new Date().toISOString()
                })
                .eq("user_id", userId)
                .eq("song_id", songId);
            return { error: updateError };
        }
        return { error: null };
    } else {
        // Insert new data
        const { error: insertError } = await supabase
            .from("scores")
            .insert({
                "user_id": userId,
                "song_id": songId,
                "score": score
            });
        return { error: insertError };
    }
};