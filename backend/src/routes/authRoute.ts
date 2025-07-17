import express, { Router, Request, Response } from "express";
import { signUpUser, signInUser, signOutUser} from "../services/authServices.js"
import { authenticateUser } from "../middleware/authenticateUser.js";

// Initialize router
const router: Router = express.Router();

// Sign up route
router.post("/signup", async (req: Request, res: Response) => {
    // Get credientials from request body
    const { email, password } = req.body;
    const { data, error } = await signUpUser(email, password);

    // Sign up failed
    if (error) {
        res.status(400).json({ error: error.message });
        return;
    }

    // Sign up successful
    if (data) {
        res.status(201).json({ user: data.user, session: data.session });
    }
    return;
});

// Sign in route
router.post("/login", async (req: Request, res: Response) => {
    // Get credientials from request body
    const { email, password } = req.body;
    const { data, error } = await signInUser(email, password);

    // Sign in authentication failed
    if (error) {
        res.status(401).json({ error: error.message });
        return;
    }

    // Sign in authentication successful
    if (data) {
        res.status(200).json({ user: data.user, session: data.session });
    }
    return;
});

// Sign out route
router.post("/logout", authenticateUser, async (req: Request, res: Response) => {
    const { error } = await signOutUser();
    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }
    res.status(200).json({ message: "Successfully signed out" });
    return;
});

export default router;