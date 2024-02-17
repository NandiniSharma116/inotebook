const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    user: {
        //Foreign Key taken from User Database
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('notes', NoteSchema);