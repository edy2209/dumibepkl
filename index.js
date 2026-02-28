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
    const berita = await beritaCollection.find().toArray();
    res.json(berita);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});