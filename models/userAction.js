const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userActionSchema = new Schema({
    description: String,
    operation: String
});

module.exports = mongoose.model('UserAction', userActionSchema);