import { Request, Response, NextFunction } from "express";
import { supabase } from "../utils/supabaseClient.js";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace("Bearer ", "").trim();

    if (!token) {
        res.status(401).json({ error: "Missing token" });
        return;
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        res.status(401).json({ error: "Invalid or expired token" });
        return;
    }

    (req as any).user = user;

    next();
    return;
};

export const getProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", userId)
        .single();

    return { data, error };
};

export const updateProfile = async (userId: string, updates: any) => {
    const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", userId)
        .select("*")
        .single();

    return { data, error };
};
