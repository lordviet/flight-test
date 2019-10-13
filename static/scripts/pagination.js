const previousBtn = $("#previous");
const nextBtn = $("#next");
const allQuestions = $("div.questionInfo");
let currentQuestion = 0;

function showQuestion(nextQuestion) {
    $(allQuestions[currentQuestion]).removeClass("questionInfo");
    $(allQuestions[nextQuestion]).addClass("nextQuestion");
    currentQuestion = nextQuestion;

    // The first question should not have a previous button
    currentQuestion === 0 ? previousBtn.hide() : previousBtn.show();

    // The last question should not have a next button 
    currentQuestion === allQuestions.length - 1 ? nextBtn.hide() : nextBtn.show();

}
