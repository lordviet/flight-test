const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    Explanation: {
        type: String
    },
    Qfigure: {
        type: mongoose.Mixed
    },
    Exfigure: {
        type: mongoose.Mixed
    },
    Exfigure2: {
        type: mongoose.Mixed
    },
    Exfigure3: {
        type: mongoose.Mixed
    },
    QuestionId: {
        type: String
    },
    QuestionContent: {
        type: String
    },
    Answers: {
        type: [
            mongoose.Mixed
        ]
    },
    Annexes: {
        type: mongoose.Mixed
    },
    IsInExam: {
        type: Boolean
    },
    IsProblematic: {
        type: Boolean
    },
    Chapter: {
        type: String
    }
})

module.exports = mongoose.model("Question", questionSchema, "questions");