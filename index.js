//import express
import express from "express";
import { MongoClient } from "mongodb";


const PORT = process.env.PORT || 8080;

const MONGO_URL = process.env.monggo_url || "mongodb://localhost:27017/frontendtest";

const app = express();

//connect to mongodb
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Connected to MongoDB");

//ambil data dari tabel berita
const db = client.db();
const beritaCollection = db.collection("berita");

app.get("/berita", async (req, res) => {
  try {
    const berita = await beritaCollection.find().toArray();
    res.json(berita);
    } catch (error) {
    console.error("Error fetching berita:", error);
    res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});