const express = require("express");
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const secretKey = require("../config/config").secretKey;

const User = require("../models/User");
const Question = require("../models/Question");

router.post("/ask", (req, res) => {
    //const decoded = jsonwebtoken.verify(req.headers.authorization, secretKey)
    const decoded = jsonwebtoken.verify(req.body.authorization, secretKey)    
    const newQuestion = new Question({
        author: decoded.username,        
        body: req.body.body
    });
    newQuestion.save()
        .then(question => res.json(question))
        .catch(err => console.log(err))
});


router.get("/all", (req, res) => {
    Question.find()
        .then(questions => res.json(questions))
});


router.post("/answer/:question_id", (req, res) => {
    Question.findById(req.params.question_id)
        .then(question => {            
            question.answers.push({ body: req.body.body });
            question.save()
                .then(() => res.json(question))
        });
})


router.get("/:question_id", (req, res) => {
    Question.findById(req.params.question_id)
        .then(question => res.json(question))
});



router.post("/:question_id/:answer_id", (req, res) => {
    Question.findById(req.params.question_id)
        .then(question => {
            for (let index = 0; index < question.answers.length; index++) {
                if (question.answers[index]._id == req.params.answer_id) {
                    question.answers[index].votes = question.answers[index].votes + 1;
                } else {
                    question.answers[index].votes = question.answers[index].votes;
                }
                
            }
            // question.answers.map(answer => {
            //     if (answer._id == req.params.answer_id) {
            //         // answer.votes++;
            //         if(!answer.votes) {
            //             answer.votes = 2;
            //         } else {
            //             answer.votes = answer.votes ;
            //         }                    
            //     } else {
            //         answer.votes = answer.votes;
            //     }               
            // })
            question.save();
            res.json(question);
        })
});





 module.exports = router;