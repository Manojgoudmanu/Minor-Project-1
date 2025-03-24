const express = require('express');
const app = express();
const cors = require('cors')

require('dotenv').config();

const port = process.env.PORT || 3004;
app.use(cors());

app.use(express.json());

app.use('/test',require('./test'));
app.use('/signin',require('./signInsert'))
app.use('/login',require('./login'))
app.use('/transactions',require('./transactions'))

app.listen(port,()=>{
    console.log("server is running on port",port);
})
