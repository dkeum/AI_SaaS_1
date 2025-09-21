import express from "express";
import { auth } from "../middleware/auth";
import {
  getPublishedCreations,
  getUserCreations,
  toggleLikeCreation,
} from "../controller/useerController";

const userRouter = express.Router();

userRouter.get("/get-user-creations", auth, getUserCreations);

userRouter.get("/get-published-creations", auth, getPublishedCreations);

userRouter.get("/toggle-like-creation", auth, toggleLikeCreation);

export default userRouter;
