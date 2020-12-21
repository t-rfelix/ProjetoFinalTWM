const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    author: { type: String, required: true},    
    body: { type: String, required: true},
    answers: [{ body: String, votes: { type: Number, default: 0 }}],    
});


const Question = mongoose.model("Question", questionSchema);
module.exports = Question;