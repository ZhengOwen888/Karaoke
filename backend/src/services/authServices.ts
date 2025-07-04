import { SignUpWithPasswordCredentials } from "@supabase/supabase-js"
import { supabase } from "../utils/supabaseClient.js";

// Sign up with Supabase using email and password
export const signUpUser = async (email: string, username: string, password: string) => {
    // Validate required credentials
    if (!email?.trim() || !username?.trim() || ! password?.trim()) {
        return {
            data: null,
            error: new Error("Missing required information")
        };
    };

    // Prepare sign-up credentials for supabase auth
    const signUpParam: SignUpWithPasswordCredentials = {
        email: email?.trim(),
        password: password?.trim(),
        options: {
            data: {
                username: username?.trim()
            }
        }
    };

    // Submit sign up credentials to be verified by Supabase
    return await supabase.auth.signUp(signUpParam);
};

// Login with Supabase using email and password
export const loginUser = async (email: string, password: string) => {
    // Validate required credentials
    if (!email.trim() || !password.trim()) {
        return {
            data: null,
            error: new Error("Missing required information")
        };
    };

    // Submit login credentials to be verified by Supabase
    return await supabase.auth.signInWithPassword({
        email: email?.trim(),
        password: password?.trim()
    });
};