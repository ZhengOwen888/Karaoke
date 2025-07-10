import express, { Router, Request, Response} from "express";
import { authenticateUser, getProfile, updateProfile } from "../services/profilesServices.js";

const route: Router = express.Router();

// Get user profile
route.get("/profile", authenticateUser, async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { data, error } = await getProfile(userId);

    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }
    res.status(200).json({ data: data });
    return;
});

// Update user profile
route.post("/profile", authenticateUser, async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const updates = req.body;
    const { data, error } = await updateProfile(userId, updates);
    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }
    res.status(200).json({ data: data });
    return;
});

export default route;