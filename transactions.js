const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const url = process.env.MONGO_URL;
require("dotenv").config();

router.post("/", async (req, res) => {
  const client = new MongoClient(url);
  await client.connect();
  const db = await client.db("expense_tracker");
  const collection = await db.collection("transactions");

  try {
    const transactions = req.body;
    const trans = await collection.insertOne(transactions);
    res.json({ message: "Transaction recorded", transaction: trans });
  } catch (error) {
    console.error("error in posting data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/", async (req, res) => {
  const client = new MongoClient(url);
  await client.connect();
  const db = await client.db("expense_tracker");
  const collection = await db.collection("transactions");

  try {
    const transactions = await collection.find({}).toArray();
    res.json(transactions);
  } catch (error) {
    console.log("error in geting the data", error);
  } finally {
    client.close();
  }
});

router.post("/a", async (req, res) => {
  const client = new MongoClient(url);
  await client.connect();
  const db = await client.db("expense_tracker");
  const collection = await db.collection("users");

  try {
    const {email,transactions} = req.body;
    if(!email || !transactions  ){
        return res.json({message:"email is not found"})
    }
    const updateuser = await collection.updateOne(
        {email},
        {$push:{transactions:transactions}}
    )
    if(updateuser.modifiedCount === 0){
        return res.status(404).json({message:"user not found"})
    }
    res.json({message:"transactions recorded",transactions})
  
  } catch (error) {
    console.error("error in posting data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  finally{
    client.close();
  }
});
  router.get('/:email', async (req, res) => {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db('expense_tracker');
    const collection = db.collection('users'); 

    try {
        const email = req.params.email;
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.transactions || []);

    } catch (error) {
        console.error("Error in getting data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        client.close();
    }
});

router.patch('/delete',async(req,res)=>{
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db('expense_tracker');
  const collection = db.collection('users'); 
  try{
    const {email,title,amount,date,sign,color,money}= req.body;

    const result = await collection.findOneAndUpdate(
      {email},
      {$pull:{transactions:{title,amount,date,sign,color,money}}},//we can use js as filter method to filter the array in the document
      {returnDocument:"after"}
    )
    if(result){
      res.json({sucess:true,message:"transaction sucessfull"})
    }
    else {
      res.status(404).json({sucess:false,message:"failed transaction delete not found"})
    }

  

  }catch(error){
    res.status(500).json({sucess:false,message:"error in deleting"})

  }

})
module.exports = router;
