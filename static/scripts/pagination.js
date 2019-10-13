const previousBtn = $("#previous");
const nextBtn = $("#next");
const allQuestions = $("div.questionInfo");
let currentQuestion = 0;

// Adding the class to start the pagination
$(allQuestions[0]).addClass("nextQuestion");

function showQuestion(nextQuestion) {
    $(allQuestions[currentQuestion]).removeClass("nextQuestion");
    $(allQuestions[nextQuestion]).addClass("nextQuestion");
    
    // The first question should not have a previous button
    currentQuestion === 0 ? previousBtn.hide() : previousBtn.show();
    
    // The last question should not have a next button 
    currentQuestion === allQuestions.length - 1 ? nextBtn.hide() : nextBtn.show();
    
    currentQuestion = nextQuestion;
}

function showNextQuestion() {
    showQuestion(currentQuestion + 1);
}

function showPreviousQuestion() {
    showQuestion(currentQuestion - 1);
}

$(nextBtn).on("click", showNextQuestion);
$(previousBtn).on("click", showPreviousQuestion);