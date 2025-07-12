import { supabase } from "../utils/supabaseClient.js";

// Get user profile info
export const getProfile = async (userId: string) => {
    if (!userId) {
        return {
            data: null,
            error: { message: "Missing required information" }
        };
    }
    const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", userId)
        .single();

    return { data, error };
};

// Update user profile info
export const updateProfile = async (userId: string, updates: any) => {
    if (!userId || !updates) {
        return {
            data: null,
            error: { message: "Missing required information" }
        };
    }
    const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", userId)
        .select("*")
        .single();

    return { data, error };
};
