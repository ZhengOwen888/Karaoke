import express, { Request, Response, Router } from "express";
import { getSongs } from "../services/songsServices.js";

const router: Router = express.Router();

const getFilter = (query: Request["query"], keys: string[]): Record<string, string | null> => {
        const result: Record<string, string | null> = {};
        for (const key of keys) {
            const value = query[key];
            result[key] = typeof value === 'string' ? value?.trim() : null;
        }
        return result;
    };

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