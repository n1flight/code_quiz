//quiz questions + answers     
var questions = [{
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["script", "Javascript", "js", "Scripting"],
    answer: "script"
},
{
    title: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
    choices: ["last( )", "put( )", "push( )", "pop( )"],
    answer: "push( )"
},
{
    title: " Which built-in method returns the characters in a string beginning at the specified location?",
    choices: ["substr( )", "getSubstring( )", "slice( )", "None of the above."],
    answer: "substr( )"
},
{
    title: "Which of the following function of an array object adds and/or removes elements from an array?",
    choices: ["toSource( )", "sort( )", "unshift( )", "splice( )"],
    answer: "splice( )"
},
{
    title: "Which of the following function of String object combines the text of two strings and returns a new string?",
    choices: ["add( )", "concat( )", " merge( )", "append( )"],
    answer: "concat( )"
}
]

//scores and timers 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts timer
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>You got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("qBody").innerHTML = quizContent;
}

function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 
<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>`;

document.getElementById("qBody").innerHTML = quizContent;
}

function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
    Coding Quiz Challenge
</h1>
<h3>
    Try to answer the following code-related questions within the time limit. Keep in mind that incorrect
    answers will penalize your score/time by ten secons!
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("qBody").innerHTML = quizContent;
}
// take away 10 sec each wrong answer
function incorrect() {
timeLeft -= 10; 
next();
}

function correct() {
score += 20;
next();
}

//loops through the questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonSel = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonSel = buttonSel.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonSel = buttonSel.replace("[ANS]", "correct()");
    } else {
        buttonSel = buttonSel.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonSel
}


document.getElementById("qBody").innerHTML = quizContent;
}