//I tried to do the advanced homework, but couldn't figure out
//all of the parts. Instead of just putting all of the questions, 
//on one screen, however, I flipped through the questions and
//added an individual question timer.
const questions = [
    {
        question: "Which hero was changed because of Blizzard copyright?",
        answers: [
            "Spectre",
            "Skeleton King",
            "Doom",
            "Phantom Lancer"
        ],
        correctAnswer: 1
    },
    {
        question: "Which pair of heroes are in the same family?",
        answers: [
            "Clockwerk & Timbersaw",
            "Shadow Fiend & Shadow Demon",
            "Nature's Prophet & Enchantress",
            "Crystal Maiden & Lina"
        ],
        correctAnswer: 3
    },
    {
        question: "Which hero has the lowest Base Attack Time?",
        answers: [
            "Dark Willow",
            "Sven",
            "Juggernaut",
            "Weaver"
        ],
        correctAnswer: 0
    },
    {
        question: "Which hero has the highest Base Armor?",
        answers: [
            "Ogre Magi",
            "Meepo",
            "Terrorblade",
            "Magnus"
        ],
        correctAnswer: 2
    }
]
var currentQuestion = 0;
var correctAnswers = 0;
var gameOver = false;
var timer = 15;

$(document).ready(function(){
    showCurrentQuestion();
    $("#errorMessage").hide();

    $("#nextQuestion").on("click", function(){
        if (!gameOver){
            value = $("input[type='radio']:checked", "#options").val();
            if (value == undefined){
                $("#errorMessage").text("Select an answer before proceeding.");
                $("#errorMessage").show();
            }
            else{
                $("#errorMessage").hide();

                if (value == questions[currentQuestion].correctAnswer){
                    correctAnswers++;
                }
                currentQuestion++;

                if(currentQuestion < questions.length){
                    showCurrentQuestion();
                }
                else{
                    stopTimer();
                    showScore();
                    $("#nextQuestion").text("Play Again");
                    gameOver = true;
                }
            }
        }
        else{
            gameOver = false;
            $("#nextQuestion").text("Next Question");
            resetGame();
            showCurrentQuestion();
            resetScore();
            
        }
    });

});

function showCurrentQuestion(){
    startTimer();
    var question = questions[currentQuestion].question;
    var answerCount = questions[currentQuestion].answers.length;
    $("#question").text(question);
    $("#options").find("li").remove();

    var answer;
    for(i=0; i < answerCount; i++){
        answer = questions[currentQuestion].answers[i];
        $("<li><input type='radio' value=" + i + " />" + answer + "</li>").appendTo("#options");
    }
}

function startTimer(){
    stopTimer();
    timer = 15;
    $("#counter").text(timer);
    counter = setInterval(runTimer, 1000);
}
function runTimer(){
    timer--
    $("#counter").text(timer);

    if(timer === 0){
        stopTimer();
        currentQuestion++;
        if(currentQuestion < questions.length){
            showCurrentQuestion();
        }
        else{
            showScore();
            $("#nextQuestion").text("Play Again");
            gameOver = true;
        }
    }
}
function stopTimer(){
    clearInterval(counter);
}
function resetGame(){
    stopTimer();
    currentQuestion = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    timer = 15;
    resetScore();
}

function showScore(){
    $("#score").text("Score: " + correctAnswers + " Correct out of 4");
    $("#score").show();
}

function resetScore(){
    $("#score").hide();
}