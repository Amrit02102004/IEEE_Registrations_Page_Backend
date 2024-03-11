const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 4030;

app.use(express.json());

app.get('/details', async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb+srv://amritsundarka:00000000@registrations.dyjnai8.mongodb.net');
    const database = client.db('Members');
    const collection = database.collection('Details');
    const details = await collection.find({}).toArray();
    res.status(200).json(details);
    client.close();
  } catch (error) {
    console.error('Error fetching details:', error);
    res.status(500).json({ message: 'Error fetching details' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
});
