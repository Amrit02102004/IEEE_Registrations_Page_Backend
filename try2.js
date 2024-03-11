const express = require('express');
const mongoose = require('mongoose');
const Detail = require('./models/studentModel');
// require('dotenv').config();
// const mongoURL = process.env.mongoURL;

const app = express();
const PORT = process.env.PORT || 4030;

app.use(express.json())

app.get('/details', (req, res) => {
  Detail.find({})
  .then(Details => {
    res.status(200).json(Details);
  }) .catch(error => {
    res.status(500).json({message: error.message});
  })
});


mongoose.connect('mongodb+srv://amritsundarka:00000000@registrations.dyjnai8.mongodb.net/Members?retryWrites=true&w=majority&appName=Registrations')
  .then(() => {
    console.log('connected to monogdb');
    app.listen(PORT, () => {
      console.log(`Port is running at: ${PORT}`)
    });
  }).catch((error) => {
    console.log(error)
  });

