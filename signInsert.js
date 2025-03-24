const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URL;

// SIGNUP ROUTE
router.post("/", async (req, res) => {
  const client = new MongoClient(url)
  //const client = await Mongoclient.connect('url')

  try {
    await client.connect();
    const db = client.db("expense_tracker");
    const collection = db.collection("users");

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Error: User already exists" });
    }

    const newUser = { name, email, password };
    await collection.insertOne(newUser);

    res.json({ message: "User registered successfully!" });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });

  } finally {
    await client.close();
  }
});

// GET ALL USERS ROUTE
router.get("/get", async (req, res) => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db("expense_tracker");
    const collection = db.collection("users");

    const users = await collection.find().toArray();
    res.json(users);

  } catch (error) {
    console.error("Fetch Users Error:", error);
    res.status(500).json({ message: "Internal Server Error" });

  } finally {
    await client.close();
  }
});

module.exports = router;
