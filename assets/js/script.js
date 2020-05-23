var timeCounter = 0;
var questionCounter = 0;
var timeKeeperEl = document.getElementById("time-keeper");
var contentHolderEl = document.querySelector(".content-holder");
var highScoreLinkEl = document.querySelector(".h-btn");

var attributeArray = []

var questionArray = [
    {
        question: "Commonly used data types Do NOT include:",
        answerOptions: [
            "Strings",
            "Booleans",
            "Alerts",
            "Numbers",
        ],
        correctAnswer: "Alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with <span class='span'>___________________</span>.",
        answerOptions: [
            "Quotes",
            "Curly brackets",
            "Parenthesis",
            "Square brackets"
        ],
        correctAnswer: "Parenthesis"
    },
    {
        question: "Arrays in javascript can be used to store <span class='span'>___________________</span>.",
        answerOptions: [
            "Numbers and strings",
            "Other arrays",
            "Booleans",
            "All of the above",
        ],
        correctAnswer: "All of the above"
    },
    {
        question: "String values must be enclosed within <span class='span'>___________________</span> when being assigned to variables",
        answerOptions: [
            "Curly brackets",
            "Quotes",
            "Commas",
            "Parenthesis",
        ],
        correctAnswer: "Quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answerOptions: [
            "For loops",
            "JavaScript",
            "Terminal/bash",
            "Console.log",
        ],
        correctAnswer: "Console.log"
    },
];

var createEl = function (name, element, childOf) {
    name = document.createElement(element);
    for (let e = 0; e < attributeArray.length; e++) {
        name.attributeArray[e].a = attributeArray[e].v;
    }
    childOf.appendChild(name);
}

var keepTime = function () {

    timeCounter = 75; // starting time
    timeKeeperEl.textContent = timeCounter; // display time

    var countDown = setInterval(function () { // timer

        timeCounter--; // countdown
        timeKeeperEl.textContent = timeCounter; // display countdown

        if (timeCounter <= 0) { // IF time reaches 0 or less than 0

            clearInterval(countDown); // stop counter
            timeCounter = 0; // if counter is below 0, set to 0
            endGamePage(); // end game

        } else if (document.querySelector("form") || document.querySelector(".hs-container")) { // IF the program reaches a page with a form or a highscore container, or in other words, IF the game has ended

            clearInterval(countDown); // stop counter
            timeCounter++ // because countdown ticks once after game has ended, undo last countdown
            timeKeeperEl.textContent = timeCounter; // display ending time
        }
    }, 1000);
}

var startGamePage = function () {

    timeKeeperEl.textContent = timeCounter;

    contentHolderEl.innerHTML = "";
    contentHolderEl.id = "center"

    var titleEl = document.createElement("div");
    titleEl.className = "bold-text";
    titleEl.textContent = "Coding Quiz Challenge";

    contentHolderEl.appendChild(titleEl);

    var instructionsEl = document.createElement("div");
    instructionsEl.className = "default-text";
    instructionsEl.innerHTML = "Try to answer the following code-related questions within the time limit. <br> Keep in mind that incorrect answers will penalize your score/time by ten seconds!"

    contentHolderEl.appendChild(instructionsEl);

    var startButtonEl = document.createElement("button");
    startButtonEl.className = "btn";
    startButtonEl.textContent = "Start Quiz";
    startButtonEl.addEventListener("click", startQuiz);

    contentHolderEl.appendChild(startButtonEl);
};

var startQuiz = function () {
    keepTime();

    contentHolderEl.removeAttribute("id");

    questionCounter = 0;

    newQuestion();
};

var newQuestion = function () {

    contentHolderEl.innerHTML = "";

    var i = questionCounter;

    var questionEL = document.createElement("div");
    questionEL.className = "bold-text";
    questionEL.innerHTML = questionArray[i].question;
    contentHolderEl.appendChild(questionEL);

    var answerContainerEl = document.createElement("div");
    answerContainerEl.className = "answer-container"
    contentHolderEl.appendChild(answerContainerEl);

    var btnGrid = document.createElement("div");
    btnGrid.className = "btn-grid-1";
    contentHolderEl.appendChild(btnGrid);

    for (let x = 0; x < questionArray[i].answerOptions.length; x++) {
        var answerBtn = document.createElement("button");
        answerBtn.className = "btn";
        answerBtn.value = questionArray[i].answerOptions[x];
        answerBtn.textContent = questionArray[i].answerOptions[x];
        btnGrid.appendChild(answerBtn);
    }
    btnGrid.addEventListener("click", checkAnswer);
};

var checkAnswer = function (event) {

    var i = questionCounter;

    if (!event.target.closest(".btn")) {
        return;
    }
    else if (event.target.closest(".btn") && event.target.value === questionArray[i].correctAnswer) {

        questionCounter++;

        if (questionCounter < questionArray.length) {
            newQuestion();
        }
        else {
            endGamePage();
        }

        var correct = document.createElement("div");
        correct.className = "torf-text";
        correct.textContent = "Correct!"
        contentHolderEl.appendChild(correct);

    } else {

        timeCounter = timeCounter - 10;
        timeKeeperEl.textContent = timeCounter;

        questionCounter++;

        if (questionCounter < questionArray.length) {
            newQuestion();
        }
        else {
            endGamePage();
        }

        var wrong = document.createElement("div");
        wrong.className = "torf-text";
        wrong.textContent = "Wrong!"
        contentHolderEl.appendChild(wrong);
    };
}

var endGamePage = function () {
    contentHolderEl.innerHTML = ""

    var doneEl = document.createElement("div");
    doneEl.className = "bold-text";
    doneEl.textContent = "Coding Quiz Challenge";
    contentHolderEl.appendChild(doneEl);

    var scoreTextEl = document.createElement("div");
    scoreTextEl.className = "hs-text";
    scoreTextEl.textContent = "Your final score is " + timeCounter + ".";
    contentHolderEl.appendChild(scoreTextEl);

    var scoreTextEl = document.createElement("div");
    scoreTextEl.className = "hs-text";
    scoreTextEl.textContent = "Enter initials: ";
    contentHolderEl.appendChild(scoreTextEl);

    var formEl = document.createElement("form");
    formEl.className = "hs-form";
    scoreTextEl.appendChild(formEl);

    var inputTextEl = document.createElement("input");
    inputTextEl.type = "text";
    inputTextEl.name = "task-name";
    formEl.appendChild(inputTextEl);

    var inputSubmitEl = document.createElement("input");
    inputSubmitEl.type = "submit";
    inputSubmitEl.className = "btn";
    inputSubmitEl.value = "Submit";
    formEl.appendChild(inputSubmitEl);

    formEl.addEventListener("submit", saveScore);
}

var saveScore = function (event) {
    event.preventDefault();

    var nameInput = document.querySelector("input[name='task-name']").value;

    if (nameInput === "") {
        return endGamePage();
    }

    var newScore = {
        name: nameInput,
        score: timeCounter
    };

    var savedScores = localStorage.getItem("highscores");
    savedScores = JSON.parse(savedScores) || [];

    savedScores.push(newScore);
    savedScores.sort(function compareNumbers(a, b) {
        return b.score - a.score;
    });

    localStorage.setItem("highscores", JSON.stringify(savedScores));

    highScoresPage();
}

var highScoresPage = function () {
    contentHolderEl.innerHTML = "";
    contentHolderEl.removeAttribute("id");

    var scorePageText = document.createElement("div");
    scorePageText.className = "bold-text";
    scorePageText.textContent = "High scores"
    contentHolderEl.appendChild(scorePageText);

    var highScoreListEl = document.createElement("div");
    highScoreListEl.className = "hs-container";
    contentHolderEl.appendChild(highScoreListEl);

    var savedScores = localStorage.getItem("highscores");
    savedScores = JSON.parse(savedScores) || "No high scores yet!";

    if (!(savedScores === "No high scores yet!")) {
        for (let i = 0; i < savedScores.length; i++) {
            var highScoreEl = document.createElement("div");
            highScoreEl.textContent = (i + 1) + ". " + savedScores[i].name + " - " + savedScores[i].score;
            highScoreListEl.appendChild(highScoreEl);
        }
    }
    else {
        var highScoreEl = document.createElement("div");
        highScoreEl.textContent = savedScores;
        highScoreListEl.appendChild(highScoreEl);
    }

    var buttonContainerEl = document.createElement("div");
    buttonContainerEl.className = "btn-grid-2"
    contentHolderEl.appendChild(buttonContainerEl);

    var backButtonEl = document.createElement("button");
    backButtonEl.className = "btn";
    backButtonEl.textContent = "Go Back"
    buttonContainerEl.appendChild(backButtonEl);
    backButtonEl.addEventListener("click", startGamePage)

    var clearScoresButtonEl = document.createElement("button");
    clearScoresButtonEl.className = "btn";
    clearScoresButtonEl.textContent = "Clear high scores"
    buttonContainerEl.appendChild(clearScoresButtonEl);
    clearScoresButtonEl.addEventListener("click", clearScores)
}

var clearScores = function () {
    localStorage.clear();
    highScoresPage();
}

startGamePage();

highScoreLinkEl.addEventListener("click", highScoresPage);