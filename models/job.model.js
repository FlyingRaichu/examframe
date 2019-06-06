const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: String,
    description: String,
    category: String,
    area: String
});

module.exports = mongoose.model('job', jobSchema);