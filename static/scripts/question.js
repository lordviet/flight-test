const checkCorrectness = (info) => {
    const id = info.srcElement.id;
    if (id !== "true") {
        let children = info.srcElement.children;
        for (let i = 0; i < children.length; i++) {
            // CHeck this
            children[i].style.color = "red";
        }

    }
    let answers = document.getElementsByClassName("answer");
    for (answer of answers) {
        if (answer.id === "true") {
            let children = answer.children;
            for (let i = 0; i < children.length; i++) {
                children[i].style.color = "green";
            }
        }
        answer.removeEventListener("click", checkCorrectness);
    }
    let explanation = document.getElementById("explanation");
    explanation.style.display = "block";
}

let answers = document.getElementsByClassName("answer");

for (answer of answers) {
    answer.addEventListener("click", checkCorrectness);
}