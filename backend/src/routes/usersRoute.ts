import express, { Request, Response} from "express";

const router = express.Router();

router.post("/login", (req: Request, res: Response) => {
    // some login logic
});

router.post("/signup", (req: Request, res: Response) => {
    // some signup logic
});

export default router;