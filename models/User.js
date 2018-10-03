const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    log: [{ type: Schema.Types.ObjectId, ref: 'Exercise'}],
    count: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);