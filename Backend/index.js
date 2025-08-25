const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:5173','https://notes-keeper-sec.vercel.app'],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/note'));

app.listen(port)
