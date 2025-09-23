import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import { cloudinary } from "../config/cloudinary.js";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";
import axios from "axios";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({ success: false, message: "Limit reached. continue." });
    }

    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    await sql` INSERT INTO creations (user_id, prompt, content, type )
    VALUES(${userId}, ${prompt}, ${content}, 'blog-title' )`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({ success: true, content });
  } catch (e) {
    console.log(e.message);
    res.json({ message: e.message });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({ success: false, message: "Limit reached. continue." });
    }

    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    await sql` INSERT INTO creations (user_id, prompt, content, type )
    VALUES(${userId}, ${prompt}, ${content}, 'blog-title' )`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({ success: true, content });
  } catch (e) {
    console.log(e.message);
    res.json({ message: e.message });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only avaiable for premium subscriptions",
      });
    }
    const form = new FormData();
    form.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      form,
      {
        headers: {
          "x-api-key": process.env.CLIPBOARD_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;



    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    console.log(secure_url)

    await sql` INSERT INTO creations (user_id, prompt, content, type, publish )
      VALUES(${userId}, ${prompt}, ${secure_url}, 'generateImage', ${
      publish ?? false
    } )`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({ success: true, content: secure_url });
  } catch (e) {
    console.log(e.message);
    res.json({ message: e.message });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only avaiable for premium subscriptions",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql` INSERT INTO creations (user_id, prompt, content, type)
      VALUES(${userId}, 'Remove background from image', ${secure_url}, 'image')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({ success: true, content: secure_url });
  } catch (e) {
    console.log(e.message);
    res.json({ message: e.message });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const { image } = req.file;

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only avaiable for premium subscriptions",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    await sql` INSERT INTO creations (user_id, prompt, content, type)
      VALUES(${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({ success: true, content: secure_url });
  } catch (e) {
    console.log(e.message);
    res.json({ message: e.message });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();

    const resume = req.file;
    const plan = req.plan;

    const free_usage = req.free_usage;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only avaiable for premium subscriptions",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        sucess: false,
        message: "Resume file size exceeds allowed size (5MB).",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resumse and provide constructive feedback on is strengths, weaknesses , and areas for improvement. Resume Content:\n\n${pdfData.text}`;

    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql` INSERT INTO creations (user_id, prompt, content, type)
      VALUES(${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({ success: true, content });
  } catch (e) {
    console.log(e.message);
    res.json({ message: e.message });
  }
};
