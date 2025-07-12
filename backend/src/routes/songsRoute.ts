import express, { Request, Response, Router } from "express";
import { getSongs } from "../services/songsServices.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { getFilter } from "../utils/helper.js";

const router: Router = express.Router();

// Middleware to check if user is authenticated before accessing other routes
router.use(authenticateUser);

// Get songs based on filter
router.get("/", async (req: Request, res: Response) => {
    const filter = getFilter(req.query, ["id", "title", "artist", "genre"]);
    const { data, error } = await getSongs(filter);

    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }
    res.status(200).json({ data });
});

export default router;