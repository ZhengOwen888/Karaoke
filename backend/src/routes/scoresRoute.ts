import express, { Request, Response, Router } from "express";
import { getScores, postScores } from "../services/scoresServices.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { getFilter } from "../utils/helper.js";

const router: Router = express.Router();

router.use(authenticateUser);

// Get scores based on filter
router.get("/", async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const filter = getFilter(req.query, ["id", "title", "artist", "genre"]);
    const { data, error } = await getScores(userId, filter);
    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }
    res.status(200).json({ data: data });
    return;
});

// Post score to supabase database
router.post("/", async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { songId, score } = req.body;
    const { error } = await postScores(userId, songId, score);
    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }
    res.status(201).json();
    return;
});

export default router;
