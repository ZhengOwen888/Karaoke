import express, { Router } from "express";
import { getScores, postScores } from "../services/scoresServices.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router: Router = express.Router();

export default router;
