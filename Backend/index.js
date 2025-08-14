const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
require('dotenv').config();

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`NotesKeeper backend listening at http://localhost:${port}`)
})