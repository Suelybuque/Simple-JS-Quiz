const questions = [{
        question: "What do you call a portable computer?",
        answers: [
            { text: "Desktop", corrent: false },
            { text: "Laptop", corrent: true },
            { text: "Tablet", corrent: false },
            { text: "Server", corrent: false },
        ]
    },
    {
        question: "Which of the following is a programming language used for creating web pages?",
        answers: [
            { text: "HTML", corrent: true },
            { text: "Java", corrent: false },
            { text: "Python", corrent: false },
            { text: "C++", corrent: false },
        ]
    },
    {
        question: "What does CPU stand for?",
        answers: [
            { text: "Central Processing Unit", corrent: true },
            { text: "Computer Personal Unit", corrent: false },
            { text: "Central Process Unit", corrent: false },
            { text: "Central Processor Unit", corrent: false },
        ]
    },
    {
        question: "Who is known as the co-founder of Microsoft?",
        answers: [
            { text: "Steve Jobs", corrent: false },
            { text: "Bill Gates", corrent: true },
            { text: "Mark Zuckerberg", corrent: false },
            { text: "Elon Musk", corrent: false },
        ]
    },
    {
        question: "Who created the well-known app 'Pinterest'?",
        answers: [
            { text: "Mark Zuckerberg", corrent: false },
            { text: "Evan Spiegel", corrent: false },
            { text: "Ben Silbermann", corrent: true },
            { text: "Jack Dorsey", corrent: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.corrent) {
            button.dataset.corrent = answer.corrent;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.corrent === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.corrent === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    let message = '';
    let emoji = '';
    if (score >= 4) {
        message = "Congratulations! 🎉You're awesome!";
        emoji = '👏';
    } else if (score === 3) {
        message = "You almost got there!🌟";
        emoji = '😊';
    } else {
        message = "Oops! Looks like you need more practice. ";
        emoji = '🤔';
    }

    questionElement.innerHTML = `${message} ${emoji} You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again.";
    nextButton.style.display = "block";
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
