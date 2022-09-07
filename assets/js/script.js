//Variables 
var scoresAdded = document.querySelector("#scores");
var timerCountdown = document.querySelector("#timer");
var containerBox = document.querySelector("#box");
var titleHeading = document.querySelector("#title");
var contentText = document.querySelector("#content");
var startQuiz = document.querySelector("#start");
var answerShown = document.querySelector("#answer");

// Question format
class Question {
    constructor(question, choices, answerShown) {
        this.question = question;
        this.choices = choices;
        this.answerShown = answerShown;
    }
}

var questionList = [];

// Questions with answers; answers put into arrays
var choices1 = ["strings", "boolean", "alerts", "numbers"];
var question1 = new Question("Commonly used data types DO NOT include:", choices1, "alerts");
questionList.push(question1);

var choices2 = ["quotes", "curly brackets", "parentheses", "square brackets"];
var question2 = new Question("The condition in an if/else statement is enclosed within ______.", choices2, "curly brackets");
questionList.push(question2);

var choices3 = ["numbers and strings", "other arrays", "booleans", "all of the above"];
var question3 = new Question("What parameters can be passed into the query selector function?", choices3, "all of the above");
questionList.push(question3);

var choices4 = ["commas", "curly brackets", "quotes", "parentheses"];
var question4 = new Question("String values must be enclosed within ______ when being assigned to variables.", choices4, "quotes");
questionList.push(question4);

var choices5 = ["JavaScript", "terminal / bash", "for loops", "console.log"];
var question5 = new Question("A very useful tool used during development and debugging for printing content to the debugger is:", choices5, "console.log");
questionList.push(question5);

// variables for function for question loop
var choicesList = [];
var currentQuestions = 0;
var quizOngoing = false;
var highScore = [];
var userInitials = "";
var clearingAnswer = false;
var clearingAnswerCode = 0;
var correctAnswer = false;
var scoreGame = 0;
var timeLeft = 75;

// init = initiate this function
function init() {
    startQuiz.addEventListener("click", runQuestions);
    scoresAdded.addEventListener("click", showScores);
}

// hides display that was on the page before the start button was clicked;
function runQuestions() {
    runCountdown();
    quizOngoing = true;
    startQuiz.setAttribute("style", "display: none");
    contentText.setAttribute("style", "display: none");
    var numOfOptions = questionList[0].choices.length;
    for (var i = 0; i < numOfOptions; i++) {
        var option = document.createElement("button");
        containerBox.appendChild(option);
        choicesList.push(option);
        option.setAttribute("id", `button${i + 1}`);
    }
    nextQuestion();
}

// starts timer once start button clicked
function runCountdown() {
    var clock = setInterval(function () {
        timeLeft--;
        timerCountdown.textContent = `Time: ${timeLeft} seconds`;
        if (timeLeft === 0) {
            clearInterval(clock);
            if (titleHeading.textContent !== "Game Over!") {
                endQuiz();
            }
        }
    }, 1000)
}


// moves to next question unless at end of quiz
function nextQuestion(event) {
    evaluateAnswer(event);
    if (currentQuestions < questionList.length) {
        changeQuestion();
    } else {
        endQuiz();
    }
}


// Displays next question while showing if correct or wrong for previous question
function evaluateAnswer(event) {
    if (event !== undefined) {
        if (event.currentTarget.textContent === questionList[currentQuestions - 1].answerShown) {
            correctAnswer = true;
            answerShown.textContent = "Correct!";
            // scores point for correct
            scoreGame += 10;
        } else {
            correctAnswer = false;
            answerShown.textContent = "Wrong!";
            if (timeLeft > 10) {
                // takes away time for wrong
                timeLeft -= 10;
            } else {
                timeLeft = 1;
            }
            setTimeout(function () {
            }, 1000);
        }
        clearAnswer();
    }
}

// clears out the answer
function clearAnswer() {
    if (clearingAnswer) {
        clearingAnswer = false;
        clearTimeout(clearingAnswerCode);
        clearAnswer();
    } else {
        clearingAnswer = true;
        clearingAnswerCode = setTimeout(function () {
            answerShown.textContent = "";
            clearingAnswer = false;
        }, 5000);
    }
}

// question answer buttons
function changeQuestion() {
    titleHeading.textContent = questionList[currentQuestions].question;
    for (var i = 0; i < questionList[currentQuestions].choices.length; i++) {
        choicesList[i].textContent = questionList[currentQuestions].choices[i];
        choicesList[i].addEventListener("click", nextQuestion);
    }
    currentQuestions++;
}

// ends game allows user to see final score
function endQuiz() {
    titleHeading.textContent = "Game Over!";
    timeLeft = 1;
    clearChoices();
    clearAnswer();
    contentText.setAttribute("style", "display: visible");
    contentText.textContent = `Final score is ${scoreGame}`;
    inputBox();
}

// clears answer buttons
function clearChoices() {
    for (var i = 0; i < choicesList.length; i++) {
        choicesList[i].remove();
    }
    choicesList = [];
}

// input box for user typing initials
function inputBox() {
    var initialsForm = document.createElement("form");
    containerBox.appendChild(initialsForm);
    initialsForm.setAttribute("id", "form");
    var label = document.createElement("label");
    initialsForm.appendChild(label);
    label.textContent = "Type your initials: "
    var input = document.createElement("input")
    initialsForm.appendChild(input);
    input.setAttribute("id", "userInitials");
    var submit = document.createElement("button");
    initialsForm.appendChild(submit);
    submit.setAttribute("id", "submit");
    submit.textContent = "Submit";

    titleHeading.setAttribute("style", "align-self: start")
    contentText.setAttribute("style", "align-self: start; font-size: 150%");


    input.addEventListener("keydown", stopDefault);
    submit.addEventListener("click", addScore);

}

// prevents default for reloading page
function stopDefault(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
}

// saves score and stops quiz
function addScore(event) {
    if (event !== undefined) {
        event.preventDefault();
    }
    var id = document.getElementById("userInitials");
    if (id.value.length > 3 || id.value.length === 0) {
        inputInvalid();
        return;
    }
    quizOngoing = false;
    document.getElementById("form").remove();
    saveScore(id);
}

// puts score into an array and updates local storage
function saveScore(id) {
    if (localStorage.getItem("highScore") !== null) {
        highScore = JSON.parse(localStorage.getItem("highScore"));
    }
    highScore.push(`${scoreGame} ${id.value}`);
    localStorage.setItem("highScore", JSON.stringify(highScore));
    showScores();
}

// makes user put in their initials to record score
function inputInvalid() {
    answerShown.textContent = "Please enter your initials!";
    clearAnswer();
    var submit = document.getElementById("submit");
    submit.addEventListener("click", addScore);
}

// displays warning if trying to access high scores during quiz
function showScores() {
    if (!quizOngoing) {
        titleHeading.textContent = "High Scores";
        // hides start quiz button if view high scores is clicked at beginning
        startQuiz.setAttribute("style", "display: none");
        localScores();
        finalButtons();
    } else if (titleHeading.textContent === "Game Over!") {
        answerShown.textContent = "Please enter your initials!";
        clearAnswer();
    } else {
        answerShown.textContent = "Scores available at end of quiz!";
        clearAnswer();
    }
}

// if scores are stored in local storage puts into an array for access
function localScores() {
    contentText.textContent = "";
    contentText.setAttribute("style", "white-space: pre-wrap; font-size: 150%");
    if (localStorage.getItem("highScore") !== null) {
        highScore = JSON.parse(localStorage.getItem("highScore"));
    }
    highScore.sort();
    highScore.reverse();
    var limit = 10;
    if (limit > highScore.length) {
        limit = highScore.length;
    }
    for (var i = 0; i < limit; i++) {
        contentText.textContent += highScore[i] + '\n';
    }
}

// sets option to restart
function finalButtons() {
    if (!document.getElementById("restart")) {
        var restartVar = document.createElement("button");
        containerBox.appendChild(restartVar);
        restartVar.textContent = "Restart Quiz";
        restartVar.setAttribute("id", "restart");

        var clearScoresVar = document.createElement("button");
        containerBox.appendChild(clearScoresVar);
        clearScoresVar.textContent = "Clear High Scores";
        clearScoresVar.setAttribute("id", "clearScores");

        restartVar.addEventListener("click", restartGame);
        clearScoresVar.addEventListener("click", clearScores)
    }
}

// sets page back to starting page
function restartGame() {
    titleHeading.setAttribute("style", "align-self: center");
    contentText.setAttribute("style", "align-self: center; font-size: 125%");
    document.getElementById("restart").remove();
    document.getElementById("clearScores").remove();
    titleHeading.textContent = "Coding Quiz";
    contentText.textContent = "Test your coding knowledge! Once you press the start button, you'll have 75 seconds to answer the 5 questions. Be careful though, because wrong answers will subtract 15 seconds from your time remaining. Good Luck!";
    startQuiz.setAttribute("style", "display: visible");
    currentQuestions = 0;
    scoreGame = 0;
    timeLeft = 75;
    init();
}

// option to clear high scores
function clearScores() {
    localStorage.clear();
    contentText.textContent = "";
    highScore = [];
}

init();