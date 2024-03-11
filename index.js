require('dotenv').config();
const mongoURL = process.env.mongoURL;
const { MongoClient } = require('mongodb');
const client = new MongoClient(mongoURL);
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');

const corsOptions = {
    origin: 'http://127.0.0.1:5500', 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4030;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

async function searchMail(emailId) {
    let ans = 0;
    try {
        console.log("Connecting...");
        await client.connect();
        console.log("Connected !!");
        console.log(emailId);
        const database = client.db('Members');
        const collection = database.collection('Details');
        const queryResult = await collection.findOne({ EmailID: emailId });
        console.log(queryResult);
        
        if(queryResult){
            ans = 1;
        }
        else{
            ans = 0;
        }
    } catch (error) {
        ans = 2;
    } finally {
        await client.close();
        return ans;
    }
}



app.post('/check_user', async (req, res) => { 
    const email  = req.body.x;
    try {
        const val = await searchMail(email); 
        if (val === 1) {
            console.log("Found!");
            res.status(200).send("Found!");
        } else if (val === 0) {
            console.log("Not Found!");
            res.status(404).send("Not Found!");
        } else if (val === 2) {
            console.log("DB Error!");
            res.status(500).send("DB Error!");
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("Internal Server Error");
    }
});
