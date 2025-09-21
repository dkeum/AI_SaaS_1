import express from "express";
import { generateArticle } from "../controller/aiController";

const router = express.Router();

router.post("/generate-article", auth, generateArticle);

export default router;
