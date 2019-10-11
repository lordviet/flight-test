const checkCorrectness = (event) => {
    const clickedAnswer = event.target;
    const answerIsTrue = clickedAnswer.id === "true" ? true : false;
    const questionId = $(event.target).parent().parent()[0].id;

    if (answerIsTrue) {
        $(clickedAnswer).children().css("color", "green");
    }
    else{
        $(clickedAnswer).children().css("color", "red");
        $(clickedAnswer).siblings("#true").css("color", "green");
    }

    $(`#${questionId} div.answer`)
        .toArray()
        .forEach(question => {
            $(question).unbind("click", checkCorrectness);
        });

    $(`#${questionId} #explanation`).css("display", "block");

}

let questions = [...document.getElementsByClassName("questionInfo")];

for (let question of questions) {
    $(`#${question.id} div.answer`).on("click", checkCorrectness);
}

