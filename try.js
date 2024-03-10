const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://amritsundarka:00000000@registrations.dyjnai8.mongodb.net/?retryWrites=true&w=majority&appName=Registrations';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase(emailId) {
    try {
        await client.connect();

        console.log('Connected to the database');
        const database = client.db('Members');
        const collection = database.collection('Details');
        const queryResult = await collection.findOne({ EmailID: emailId });
        console.log('Query Result:', queryResult);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        await client.close();
    }
}

connectToDatabase('amrit.sundarka2022@vitstudent.ac.in'); 