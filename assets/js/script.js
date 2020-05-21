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
var timeKeeper = document.getElementById("time-keeper");
var contentHolderEl = document.querySelector(".content-holder");
var span = document.createElement("span");

// Console.log test
function test(test) {
    console.log(test);
    console.dir(test);
};

var questionArray = [
    {
        question: "Commonly used data types Do NOT include:",
        answer1: "Strings",
        answer2: "Booleans",
        answer3: "Alerts",
        answer4: "Numbers",
        trueAnswer: "Alerts",
    },
    {
        question: "The condition in an if / else statement is enclosed with <span></span>.",
        answer1: "Quotes",
        answer2: "Curly brackets",
        answer3: "Parenthesis",
        answer4: "Square brackets",
        trueAnswer: "Parenthesis",
    },
    {
        question: "Arrays in javascript can be used to store <span></span>.",
        answer1: "Numbers and strings",
        answer2: "Other arrays",
        answer3: "Booleans",
        answer4: "All of the above",
        trueAnswer: "All of the above",
    },
    {
        question: "String values must be enclosed within <span></span> when being assigned to variables",
        answer1: "Curly brackets",
        answer2: "Quotes",
        answer3: "Commas",
        answer4: "Parenthesis",
        trueAnswer: "Quotes",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer1: "For loops",
        answer2: "JavaScript",
        answer3: "Terminal/bash",
        answer4: "Console.log",
        trueAnswer: "Console.log",
    },
];

// Load Game
var loadGame = function () {
    timeKeeper.textContent = "Time: " + timeCounter;

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
    startButtonEl.id = "start-game";
    contentHolderEl.appendChild(startButtonEl);
    startButtonEl.addEventListener("click", quiz);
};

var quiz = function () {
    for (var i = 0; i < array.length; i++) {

    };
};

loadGame();