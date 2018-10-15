const mongoose = require('mongoose');

//the Schema defines what the model will look like
const authorSchema = new mongoose.Schema({
    name: {type: String, required: true}
})
//the first parameter of mongoose.model NAMES the collection
//the second parameter says what schema will be used to manipulate that collection
const Author = mongoose.model('Author', authorSchema);
module.exports = Author;