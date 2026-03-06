import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGODB_URL;

const app = express();

const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Connected to MongoDB Atlas");

const db = client.db();
const beritaCollection = db.collection("berita");

app.get("/berita", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const [berita, total] = await Promise.all([
      beritaCollection.find().skip(skip).limit(limit).toArray(),
      beritaCollection.countDocuments(),
    ]);

    res.json({
      data: berita,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});