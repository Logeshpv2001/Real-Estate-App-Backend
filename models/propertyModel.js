// models/propertyModel.js
const mongoose = require('mongoose');
const propertySchema = new mongoose.Schema({
    type: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    status: { type: String, default: 'Not Sold' },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
});
module.exports = mongoose.model('Property', propertySchema);