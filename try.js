const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://amritsundarka:00000000@registrations.dyjnai8.mongodb.net/?retryWrites=true&w=majority&appName=Registrations', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema
const detailsSchema = new mongoose.Schema({
    Register_Number: String,
    Student_Name: String,
    EmailID: String,
    Mobile_No: String,
    Domains: String
});

// Create a model
const Details = mongoose.model('Details', detailsSchema);

// Define the email to search for
const emailToSearch = 'amrit.sundarka2022@vitstudent.ac.in';
// Search for the document with the given email
Details.findOne({ EmailID: emailToSearch })
    .then(result => {
        if (result) {
            console.log('Document found:', result);
        } else {
            console.log('No document found with email:', emailToSearch);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
