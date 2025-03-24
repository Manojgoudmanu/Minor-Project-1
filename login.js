const express = require("express");

const router = express.Router()
const url = process.env.MONGO_URL
const {MongoClient} = require("mongodb")
const bcrypt = require("bcryptjs")
 

router.post ('/',async(req,res)=>{
   
    const client = await MongoClient.connect(url)
    const db = await client.db('expense_tracker')
    const collection = await db.collection('users')

    const logindetais = {
        email:req.body.email,
        password:req.body.password
    }

    const user = await collection.findOne({email:logindetais.email})
    if(!user){
        return res.json({message:"error data does not exists"})
    }

    
    if(logindetais.password !== user.password) {
        console.log(logindetais.password,"loginpass")
        console.log(user.password,"userspass")
        return res.json({message:"error pass do not match"})
    }
    res.json({message:"login succesfull", user: user})
})

module.exports = router;