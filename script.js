// Dom Elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false }
        ], 
    },
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "6", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Saturn", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Neptune", correct: false }
        ]
    },
    { 
    question: "What is the chemical symbol for water?",
    answers: [
        { text: "H2O", correct: true },
        { text: "O2", correct: false },
        { text: "CO2", correct: false },
        { text: "NaCl", correct: false }
    ]
},
{
    question: "What is the largest ocean on Earth?",
    answers: [
        { text: "Atlantic Ocean", correct: false },
        { text: "Indian Ocean", correct: false },
        { text: "Arctic Ocean", correct: false },
        { text: "Pacific Ocean", correct: true }
    ]
},
];

// Quiz State vars
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;
// Event Listeners
startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion()
}

function showQuestion() {
    //reset state
    answersDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex]
    currentQuestionSpan.textContent = currentQuestionIndex + 1
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    // progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question

    // todo: explain this in a second
answersContainer.innerHTML = "";
 
currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
});

}

function selectAnswer(event) {
    if (answersDisabled) return; 
    answersDisabled = true; 
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
});

if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
}
setTimeout(() => {
    currentQuestionIndex++;
    if(currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "Perfect! you're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! you know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! you can do better!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Keep trying! practice makes perfect!";
    } else {
        resultMessage.textContent = "Don't give up! you can improve!";
    };
}


function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz()
}