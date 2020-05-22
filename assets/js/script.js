// h-btn functionality should take player to the high score page and if in the middle of the quiz? should end ask if player wishes to end quiz.

// time counter should count down from 75 every second

// start page should be centered
// start game btn should remove all content in the content-holder, remove center alignment, and load first question and the answer options that correspond to that question

// questions and answers should be single objects
// question objects should be organized in an array

// all buttons should remove all content and load new content

// the form should submit the userInput + time as an object to an array that will be saved into LocalStorage for highscores

// Variables
var timeCounter = 0;
var questionCounter = 0;
var timeKeeper = document.getElementById("time-keeper");
var contentHolderEl = document.querySelector(".content-holder");

// Console.log test
function test(test) {
    console.log(test);
    console.dir(test);
};

var questionArray = [
    {
        question: "Commonly used data types Do NOT include:",
        answerArray: [
            "Strings",
            "Booleans",
            "Alerts",
            "Numbers",
        ],
        correctAnswer: "Alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with <span>___________________</span>.",
        answerArray: [
            "Quotes",
            "Curly brackets",
            "Parenthesis",
            "Square brackets"
        ],
        correctAnswer: "Parenthesis"
    },
    {
        question: "Arrays in javascript can be used to store <span>___________________</span>.",
        answerArray: [
            "Numbers and strings",
            "Other arrays",
            "Booleans",
            "All of the above",
        ],
        correctAnswer: "All of the above"
    },
    {
        question: "String values must be enclosed within <span>___________________</span> when being assigned to variables",
        answerArray: [
            "Curly brackets",
            "Quotes",
            "Commas",
            "Parenthesis",
        ],
        correctAnswer: "Quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answerArray: [
            "For loops",
            "JavaScript",
            "Terminal/bash",
            "Console.log",
        ],
        correctAnswer: "Console.log"
    },
];

var highScoreArray = [];

var keepTime = function () {
    timeCounter = 10;
    timeKeeper.textContent = "Time: " + timeCounter;
    var countDown = setInterval(function () {
        timeCounter--;
        timeKeeper.textContent = "Time: " + timeCounter;
        if (timeCounter <= 0) {
            clearInterval(countDown);
            timeCounter = 0;
            endGame();
        }
    }, 1000);
}

// Load Game
var loadGame = function () {
    timeKeeper.textContent = "Time: " + timeCounter;

    contentHolderEl.id = "center"

    var titleEl = document.createElement("div");
    titleEl.className = "bold-text";
    titleEl.textContent = "Coding Quiz Challenge";
    contentHolderEl.appendChild(titleEl);

    var instructEl = document.createElement("div");
    instructEl.className = "default-text";
    instructEl.innerHTML = "Try to answer the following code-related questions within the time limit. <br> Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
    contentHolderEl.appendChild(instructEl);

    var startButtonEl = document.createElement("button");
    startButtonEl.className = "btn";
    startButtonEl.textContent = "Start Quiz";
    startButtonEl.addEventListener("click", quiz);
    contentHolderEl.appendChild(startButtonEl);
};

var quiz = function () {
    keepTime();
    contentHolderEl.removeAttribute("id");
    newQuestion();
};

var newQuestion = function () {
    var i = questionCounter;
    contentHolderEl.innerHTML = "";

    var questionEL = document.createElement("div");
    questionEL.innerHTML = questionArray[i].question;
    questionEL.className = "bold-text";
    contentHolderEl.appendChild(questionEL);

    var answerContainerEl = document.createElement("div");
    answerContainerEl.className = "answer-container"
    contentHolderEl.appendChild(answerContainerEl);

    var btnGrid = document.createElement("div");
    btnGrid.className = "btn-grid";
    contentHolderEl.appendChild(btnGrid);

    for (let x = 0; x < questionArray[i].answerArray.length; x++) {
        var answerBtn = document.createElement("button");
        answerBtn.className = "btn";
        answerBtn.setAttribute("value", questionArray[i].answerArray[x]);
        answerBtn.textContent = questionArray[i].answerArray[x];
        btnGrid.appendChild(answerBtn);
    }
    btnGrid.addEventListener("click", checkAnswer);


};

var checkAnswer = function (event) {
    var i = questionCounter;
    if (event.target.closest(".btn") && event.target.getAttribute("value") === questionArray[i].correctAnswer) {
        var correct = document.createElement("div");
        correct.className = "torf-text";
        correct.textContent = "Correct!"
        questionCounter++;
        if (questionCounter < questionArray.length) {
            newQuestion();
        }
        else {
            endGame();
        }
        contentHolderEl.appendChild(correct);
    }
    else {
        var wrong = document.createElement("div");
        wrong.className = "torf-text";
        wrong.textContent = "Wrong!"
        timeCounter = timeCounter - 10;
        timeKeeper.textContent = "Time: " + timeCounter;
        questionCounter++;
        if (questionCounter < questionArray.length) {
            newQuestion();
        }
        else {
            endGame();
        }
        contentHolderEl.appendChild(wrong);
    };
}

var endGame = function () {
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
    inputSubmitEl.setAttribute("value", "Submit");
    formEl.appendChild(inputSubmitEl);

    formEl.addEventListener("submit", saveScore);
}

var saveScore = function (event) {
    event.preventDefault();
    var nameInput = document.querySelector("input[name='task-name']").value;

    if (!nameInput) {
        endGame();
    }
    var score = nameInput + " - " + timeCounter;
    highScoreArray.push(score);
    localStorage.setItem("highscores", JSON.stringify(highScoreArray));

    highScores();
}

var highScores = function () {
    contentHolderEl.innerHTML = "";

    var scorePageText = document.createElement("div");
    scorePageText.className = "bold-text";
    scorePageText.textContent = "High scores"
    contentHolderEl.appendChild(scorePageText);

    var highScoreListEl = document.createElement("div");
    highScoreListEl.className = "hs-container";
    contentHolderEl.appendChild(highScoreListEl);

    var savedHighScores = localStorage.getItem("highscores");
    savedHighScores = savedHighScores || "";
    savedHighScores = JSON.parse(savedHighScores);


    for (let hs = 0; hs < savedHighScores.length; hs++) {
        var highScoreEl = document.createElement("div");
        highScoreEl.innerHTML = (hs + 1) + ". " + savedHighScores[hs];
        highScoreListEl.appendChild(highScoreEl);
    }
    test(savedHighScores);
}

loadGame();