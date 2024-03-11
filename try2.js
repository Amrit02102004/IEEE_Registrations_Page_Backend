const mongoose = require('mongoose');

// Get a reference to the collection
const collection = mongoose.connection.collection('Details');

// Example: Update a single document in the collection
collection.updateOne(
  { 'emailID': 'akshit.anand2022@vitstudent.ac.in' }, // Filter for the document you want to update
  { $set: { 
      'domains': "web"  // Set new values for the domains field
  } }, // Update operation
  (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  }
);