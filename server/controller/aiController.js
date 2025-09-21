import OpenAI from "openai";
import sql from "../config/db";
import { clerkClient } from "@clerk/express";

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
    res.json({ sucess: true, content });
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

    fetch('https://clipdrop-api.co/text-to-image/v1', {
        method: 'POST',
        headers: {
          'x-api-key': YOUR_API_KEY,
        },
        body: form,
      })

    await axios.post('https://clipdrop-api.co/text-to-image/v1', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.CLIPBOARD_API_KEY,
        },
        body: form,
      })

    await sql` INSERT INTO creations (user_id, prompt, content, type )
      VALUES(${userId}, ${prompt}, ${content}, 'blog-title' )`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({ sucess: true, content });
  } catch (e) {
    console.log(e.message);
    res.json({ message: e.message });
  }
};
