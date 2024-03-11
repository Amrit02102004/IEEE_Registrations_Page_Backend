require('dotenv').config();
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
  .then(details => {
    res.status(200).json(details);
  }) .catch(error => {
    res.status(500).json({message: error.message});
  })
});

app.get('/details/:id', (req, res) => {
  const {id} = req.params;
  Detail.findById(id)
  .then(details => {
    res.status(200).json(details)
  }) .catch(error => {
    res.status(500).json({message: error.message})
  })
});

app.put('/details/:id', (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid Product Id" })
  }
  Detail.findByIdAndUpdate(id, req.body)
    .then(details => {
      if (!details) {
        return res.status(404).json({ message: "Product not find" });
      }
      Detail.findById(id)
        .then(updatedDetail => {
          res.status(200).json(updatedDetail)
        })
    }).catch(error => {
      res.status(500).json
    })
})



mongoose.connect(process.env.mongoURL)
  .then(() => {
    console.log('connected to monogdb');
    app.listen(PORT, () => {
      console.log(`Port is running at: ${PORT}`)
    });
  }).catch((error) => {
    console.log(error)
  });

