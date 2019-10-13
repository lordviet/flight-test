let questions = [...document.getElementsByClassName("questionInfo")];
const numberOfQuestions = questions.length;
let correctAnswers = 0;
let numberOfClicks = 0;

const checkCorrectness = (event) => {
    const clickedAnswer = event.target;
    const answerIsTrue = clickedAnswer.id === "true" ? true : false;
    const questionId = $(event.target).parent().parent()[0].id;

    numberOfClicks++;

    if (answerIsTrue) {
        $(clickedAnswer).children().css("color", "green");
        correctAnswers++;
    }
    else {
        $(clickedAnswer).children().css("color", "red");
        $(clickedAnswer).siblings("#true").css("color", "green");
    }

    if (allQuestionsAreAnswered(numberOfQuestions, numberOfClicks)) {
        showFinalScore(correctAnswers, numberOfQuestions);
    }
    removeEventListeners(questionId);

    // Show explanation of the answer
    $(`#${questionId} #explanation`).css("display", "block");

}


for (let question of questions) {
    $(`#${question.id} div.answer`).on("click", checkCorrectness);
}

function removeEventListeners(questionId) {
    $(`#${questionId} div.answer`)
        .toArray()
        .forEach(question => {
            $(question).unbind("click", checkCorrectness);
        });
}

function allQuestionsAreAnswered(numberOfQuestions, numberOfClicks) {
    return numberOfQuestions === numberOfClicks;
}

function showFinalScore(correctAnswers, numberOfQuestions) {
    $("h3.score")
        .show()
        .text(`You have ${correctAnswers} correct answers out of ${numberOfQuestions} questions`);
}

// TODO Hide the ids of the questions, maybe hash the id everytime