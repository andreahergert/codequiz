/*GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score

5 questions
questions worth 1 point each
start time 75 seconds
wrong answers take away 15 seconds

Need to show if answer if correct or wrong on bottom of next question instead of having a next button
Need to create timer
Need to be able to save score with initials
Create link through pages to save high scores
Need to create intro on start page
    need to hide intro on next page

*/

var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerElement = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var introText = document.getElementById("intro");
var allQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})


// Start game shows first question (0 in array/index)
function startGame() {
    // hides intro and start button
    introText.classList.add("hide");
    startButton.classList.add("hide");
    allQuestions = questions;
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();

    // Timer starts when start is pressed 
    var timerEl = document.getElementById('countdown');

    // Timer that counts down from 75
    function countdown() {
        var timeLeft = 5;

        // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
        var timeInterval = setInterval(function () {
            // As long as the `timeLeft` is greater than 1
            if (timeLeft > 1) {
                // Set the `textContent` of `timerEl` to show the remaining seconds
                timerEl.textContent = timeLeft + ' seconds remaining';
                // Decrement `timeLeft` by 1
                timeLeft--;
            } else if (timeLeft === 1) {
                // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
                timerEl.textContent = timeLeft + ' second remaining';
                timeLeft--;
            } else {
                // Once `timeLeft` gets to 0, set `timerEl` to an empty string
                timerEl.textContent = 'Time is up!';
                // Use `clearInterval()` to stop the timer
                clearInterval(timeInterval);
            }
        }, 1000);
    }
    countdown();
}


// Setting next question in array (question 2, index 1) will be what happens when next button is pressed
function setNextQuestion() {
    resetState()
    showQuestion(allQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

// Hides next button while questions are displayed
function resetState() {
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
            (answerButtonsElement.firstChild)
    }
}

// Sets what happens when answer is selected
function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (allQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

var questions = [
    // Question 1
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            { text: "strings", correct: false },
            { text: "boolean", correct: false },
            { text: "alerts", correct: true },
            { text: "numbers", correct: false },
        ]
    },
    // Question 2
    {
        question: "The condition in an if/else statement is enclosed within ______.",
        answers: [
            { text: "quotes", correct: false },
            { text: "curly brackets", correct: true },
            { text: "parentheses", correct: false },
            { text: "square brackets", correct: false },
        ]
    },
    // Question 3
    {
        question: "Arrays in JavaScript can be used to store ______.",
        answers: [
            { text: "numbers and strings", correct: false },
            { text: "other arrays", correct: false },
            { text: "booleans", correct: false },
            { text: "all of the above", correct: true },
        ]
    },
    // Question 4
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: [
            { text: "commas", correct: false },
            { text: "curly brackets", correct: false },
            { text: "quotes", correct: true },
            { text: "parentheses", correct: false },
        ]
    },
    // Question 5
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "terminal / bash", correct: false },
            { text: "for loops", correct: false },
            { text: "console.log", correct: true },
        ]
    },
]

