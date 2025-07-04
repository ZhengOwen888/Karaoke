import express, { Router, Request, Response } from "express";
import { signUpUser, loginUser } from "../services/authServices.js"

// Initialize router
const router: Router = express.Router();

// Sign up route
router.post("/signup", async (req: Request, res: Response) => {
    // Get credientials from request body
    const { email, username, password } = req.body;
    const { data, error } = await signUpUser(email, username, password);

    // Sign up failed
    if (error) {
        res.status(400).json({ error: error.message });
        return;
    }

    // Sign up successful
    res.status(201).json({ user: data.user, session: data.session });
    return;
});

// Login route
router.post("/login", async(req: Request, res: Response) => {
    // Get credientials from request body
    const { email, password } = req.body;
    const { data, error } = await loginUser(email, password);

    // Login authentication failed
    if (error) {
        res.status(401).json({ error: error.message });
        return;
    }

    // Login authentication successful
    res.status(200).json({ user: data.user, session: data.session });
    return;
});

export default router;