const mongoose = require('mongoose');
const { Schema } = mongoose;
const getDateString = require('../utils/getDateString');

const exerciseSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: String, default: getDateString() }
});

module.exports = mongoose.model('Exercise', exerciseSchema);