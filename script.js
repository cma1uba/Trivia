const scoreCounter = document.getElementById("score");
const CurrenQuestion = document.getElementById("current-q");
const questionText = document.getElementById("question-text");
const answerButtuns = document.getElementById("answer-buttuns");
const nextBtn = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");

let questions = [];
let currentIndex = 0;
let score = 0;

async function startQuiz() {
    const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    const data = await res.json();
    // Clean the data: combine correct and incorrect answers into one shuffled array
    questions = data.results.map(q => {
        const answers = [...q.incorrect_answers, q.correct_answer];
        return {
            question: q.question,
            correct: q.correct_answer,
            answers: answers.sort(() => Math.random() - 0.5) // Random shuffle
        };
    });
    
    function showQuestion() {
        const currentQuestion = questions[currentIndex];
        questionText.innerHTML = currentQuestion.question;
        answerButtons.innerHTML = "";
        
        currentQuestion.answers.forEach(answer =>{
            const button = document.createElement("button");
            button.innerHTML = answer;
            button.classList.add("btn");
            
        })
    };
}
startQuiz();

nextBtn.addEventListener("click", () => {
    // 1. Increment the index to move to the next question
    currentIndex++;

    // 2. Check if we still have questions left
    if (currentIndex < questions.length) {
        // Show the next question
        showQuestion();
        
        // Hide the next button again until the next answer is picked
        nextBtn.classList.add("hidden");
        
        // Update the question counter in the UI
        document.getElementById("current-q").textContent = currentIndex + 1;
    } else {
        // 3. End of the game!
        quizContainer.innerHTML = `
            <h2>Game Over! 🏆</h2>
            <p>Your final score is ${score} out of ${questions.length}</p>
            <button class="btn" onclick="location.reload()">Play Again</button>
        `;
    }
});