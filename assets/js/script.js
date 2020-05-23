var timeCounter = 0;
var questionCounter = 0;
var timeKeeperEl = document.getElementById("time-keeper");
var contentHolderEl = document.querySelector(".content-holder");
var highScoreLinkEl = document.querySelector(".h-btn");

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

var startGamePage = function () {
    contentHolderEl.innerHTML = "";
    contentHolderEl.id = "center"

    timeKeeperEl.textContent = timeCounter;

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
    contentHolderEl.appendChild(startButtonEl);

    startButtonEl.addEventListener("click", startQuiz);
};

var startQuiz = function () {
    contentHolderEl.removeAttribute("id");

    questionCounter = 0;

    keepTime();
    newQuestionPage();
};

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

var newQuestionPage = function () {
    contentHolderEl.innerHTML = "";

    var i = questionCounter;

    var questionEL = document.createElement("div");
    questionEL.className = "bold-text";
    questionEL.innerHTML = questionArray[i].question;
    contentHolderEl.appendChild(questionEL);

    var btnHolderEl = document.createElement("div");
    btnHolderEl.className = "answer-btn-container";
    contentHolderEl.appendChild(btnHolderEl);

    for (var x = 0; x < questionArray[i].answerOptions.length; x++) {

        var answerBtnEl = document.createElement("button");
        answerBtnEl.className = "btn";
        answerBtnEl.value = questionArray[i].answerOptions[x];
        answerBtnEl.textContent = questionArray[i].answerOptions[x];
        btnHolderEl.appendChild(answerBtnEl);
    }

    btnHolderEl.addEventListener("click", checkAnswer);
};

var checkAnswer = function (event) {
    var i = questionCounter;

    if (!event.target.closest(".btn")) {

        return;

    } else if (event.target.closest(".btn") &&
        event.target.value === questionArray[i].correctAnswer) {

        checkQuestionCounter();

        var correct = document.createElement("div");
        correct.className = "torf-text";
        correct.textContent = "Correct!"
        contentHolderEl.appendChild(correct);

    } else {

        timeCounter = timeCounter - 10;
        timeKeeperEl.textContent = timeCounter;

        checkQuestionCounter();

        var wrong = document.createElement("div");
        wrong.className = "torf-text";
        wrong.textContent = "Wrong!"
        contentHolderEl.appendChild(wrong);
    };
}

var checkQuestionCounter = function () {
    questionCounter++;
    if (questionCounter < questionArray.length) {
        newQuestionPage();
    }
    else {
        endGamePage();
    }
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
        for (var i = 0; i < savedScores.length; i++) {
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
    buttonContainerEl.className = "endgame-btn-container"
    contentHolderEl.appendChild(buttonContainerEl);

    var backButtonEl = document.createElement("button");
    backButtonEl.className = "btn";
    backButtonEl.textContent = "Go Back"
    buttonContainerEl.appendChild(backButtonEl);

    var clearScoresButtonEl = document.createElement("button");
    clearScoresButtonEl.className = "btn";
    clearScoresButtonEl.textContent = "Clear high scores"
    buttonContainerEl.appendChild(clearScoresButtonEl);

    backButtonEl.addEventListener("click", startGamePage)
    clearScoresButtonEl.addEventListener("click", clearScores)
}

var clearScores = function () {
    localStorage.clear();
    highScoresPage();
}

startGamePage();

highScoreLinkEl.addEventListener("click", highScoresPage);