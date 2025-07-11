import { supabase } from "../utils/supabaseClient.js";

// Get user profile info
export const getProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", userId)
        .single();

    return { data, error };
};

// Update user profile info
export const updateProfile = async (userId: string, updates: any) => {
    const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", userId)
        .select("*")
        .single();

    return { data, error };
};
