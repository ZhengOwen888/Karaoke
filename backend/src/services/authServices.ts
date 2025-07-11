import { supabase } from "../utils/supabaseClient.js";

// Sign up with Supabase using email and password
export const signUpUser = async (email: string, password: string) => {
    // Validate required credentials
    if (!email?.trim() || ! password?.trim()) {
        return {
            data: null,
            error: new Error("Missing required information")
        };
    };

    // Submit sign up credentials to be verified by Supabase
    const { data, error } = await supabase.auth.signUp({
        email: email?.trim(),
        password: password?.trim()
    });
    return { data, error };
};

// Sign in with Supabase using email and password
export const signInUser = async (email: string, password: string) => {
    // Validate required credentials
    if (!email.trim() || !password.trim()) {
        return {
            data: null,
            error: new Error("Missing required information")
        };
    };

    // Submit sign in credentials to be verified by Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email?.trim(),
        password: password?.trim()
    });
    return { data, error };
};

// Sign out with Supabase
export const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};