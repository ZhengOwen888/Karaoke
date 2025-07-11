import express, { Router, Request, Response} from "express";
import { getProfile, updateProfile } from "../services/profilesServices.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router: Router = express.Router();

// Middleware to check if user is authenticated before accessing other routes
router.use(authenticateUser);

// Get user profile
router.get("/profile", async (req: Request, res: Response) => {
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
router.post("/profile", async (req: Request, res: Response) => {
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

export default router;