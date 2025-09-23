import express from "express";
import { generateArticle, generateImage, generateBlogTitle, removeImageBackground, removeImageObject, resumeReview} from "../controller/aiController.js";
import {auth} from "../middleware/auth.js"
import upload from "../config/multer.js"

const router = express.Router();

router.post("/generate-article", auth, generateArticle);
router.post("/generate-blog-title", auth, generateBlogTitle);
router.post("/generate-image", auth, generateImage);
router.post("/remove-image-background", upload.single('image') , auth, removeImageBackground);
router.post("/remove-image-object",upload.single('image') , auth, removeImageObject);
router.post("/resume-review",upload.single('resume'), auth, resumeReview);

export default router;
