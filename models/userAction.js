const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userActionSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    application: String,
    sublocation: String,
    description: String,
    operation: String,
    ip_address: String,
    browser: String
});

module.exports = mongoose.model('UserAction', userActionSchema);