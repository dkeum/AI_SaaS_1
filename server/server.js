import express from "express";
import cors from "cors";
import "dotenv/config";

import { clerkMiddleware, requireAuth } from "@clerk/express";
import router from "./routes/allroutes.js";

import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js";

const app = express();

await connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/ai", router);
app.use('/api/user', userRouter)

app.get("/", (req, res) => {
  res.send("Server is Live!");
});

app.use(requireAuth());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
