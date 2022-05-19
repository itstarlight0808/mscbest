const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: {type: Boolean, required: true, default: true}
});

module.exports = mongoose.model("Event", eventSchema);