const express = require("express")
const router = express.Router()
const {MongoClient} = require("mongodb")
const url = process.env.MONGO_URL

router.get('/',)