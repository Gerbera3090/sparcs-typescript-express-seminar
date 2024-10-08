import express from "express";
import feedStore from "../modules/feedStore";
import loggerMiddleware from "../middlewares/logger";
import { z } from "zod";

const router = express.Router();

router.get("/getFeed", loggerMiddleware, (req, res) => {
  try {
    console.log(typeof req.query.count);
    const requestCount = parseInt(req.query.count as string, 10);

    const storeRes = feedStore.selectItems(requestCount);
    if (storeRes.success) {
      res.json(storeRes.data);
    } else {
      res.status(400).json(storeRes.data);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/addFeed", loggerMiddleware, (req, res) => {
  try {
    const { title, content } = req.body;
    const schema = z.object({
      title: z.string(),
      content: z.string(),
    });
    schema.parse({ title, content });
    const storeRes = feedStore.insertItem({ title, content });
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/deleteFeed", loggerMiddleware, (req, res) => {
  try {
    const { id } = req.body;
    console.log(typeof id);
    const schema = z.object({
      id: z.string(),
    });
    schema.parse({ id });
    const storeRes = feedStore.deleteItem(parseInt(id as string, 10));
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/editFeed", loggerMiddleware, (req, res) => {
  try {
    const { id, newTitle, newContent } = req.body;
    console.log(typeof id, newTitle, newContent);
    const schema = z.object({
      id: z.string(),
      newTitle: z.string(),
      newContent: z.string(),
    });
    schema.parse({ id, newTitle, newContent });
    const storeRes = feedStore.updateItem(parseInt(id as string, 10), {
      title: newTitle,
      content: newContent,
    });
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
