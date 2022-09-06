//Variables 
var scores = document.querySelector("#scores");
var timer = document.querySelector("#timer");
var container = document.querySelector("#container");
var title = document.querySelector("#title");
var content = document.querySelector("#content");
var start = document.querySelector("#start");
var answer = document.querySelector("#answer");
var questionList = [];
var optionList = [];
var currentQues = 0;
var score = 0;
var timeLeft = 75;
var isQuizOngoing = false;
var leaderboard = [];
var initials = "";
var isClearingAnswer = false;
var clearingAnswerCode = 0;
var isCorrect = false;

// Question format
class Question {
    constructor(question, options, answer) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }
}

// Questions with answers; answers put into arrays
var options1 = ["1. strings", "2. boolean", "3. alerts", "4. numbers"];
var question1 = new Question("Commonly used data types DO NOT include:", options1, "3. alerts");
questionList.push(question1);

var options2 = ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"];
var question2 = new Question("The condition in an if/else statement is enclosed within ______.", options2, "2. curly brackets");
questionList.push(question2);

var options3 = ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"];
var question3 = new Question("What parameters can be passed into the query selector function?", options3, "4. all of the above");
questionList.push(question3);

var options4 = ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"];
var question4 = new Question("String values must be enclosed within ______ when being assigned to variables.", options4, "3. quotes");
questionList.push(question4);

var options5 = ["1. JavaScript", "2. terminal / bash", "3. for loops", "4. console.log"];
var question5 = new Question("A very useful tool used during development and debugging for printing content to the debugger is:", options5, "4. console.log");
questionList.push(question5);