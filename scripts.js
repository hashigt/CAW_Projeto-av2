/* =========================================
   SCRIPT.JS (Interatividade)
   ========================================= */

// 1. DADOS DO QUIZ (Array de Objetos)
const questions = [
    {
        question: "Qual é o maior planeta do nosso Sistema Solar?",
        answers: ["Terra", "Marte", "Júpiter", "Saturno"],
        correct: 2 // Índice da resposta correta (Júpiter)
    },
    {
        question: "Qual é o símbolo químico da água?",
        answers: ["H2O", "O2", "CO2", "Ho2"],
        correct: 0 
    },
    {
        question: "Quem formulou a Teoria da Relatividade?",
        answers: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileu Galilei"],
        correct: 1
    },
    {
        question: "Qual parte da planta é a principal responsável pela fotossíntese?",
        answers: ["Raiz", "Caule", "Folha", "Flor"],
        correct: 2
    },
    {
        question: "Em qual temperatura a água ferve ao nível do mar?",
        answers: ["90°C", "100°C", "110°C", "120°C"],
        correct: 1
    }
];

// 2. VARIÁVEIS DE ESTADO
let currentQuestionIndex = 0;
let score = 0;

// 3. SELEÇÃO DE ELEMENTOS DO DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const scoreElement = document.getElementById('score');
const questionCountElement = document.getElementById('question-count');
const nextBtn = document.getElementById('next-btn');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const finalScoreDisplay = document.getElementById('final-score-display');
const feedbackMessage = document.getElementById('feedback-message');

// 4. FUNÇÕES DO JOGO

// Inicia o jogo
function startGame() {
    startScreen.classList.add('hide');
    resultScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = score;
    
    showQuestion();
}

// Renderiza a pergunta atual na tela
function showQuestion() {
    resetState(); // Limpa botões antigos
    
    let currentQuestion = questions[currentQuestionIndex];
    
    // Atualiza contadores e texto
    questionText.innerText = currentQuestion.question;
    questionCountElement.innerText = `Questão ${currentQuestionIndex + 1} de ${questions.length}`;

    // Cria os botões de resposta dinamicamente
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('answer-btn');
        
        // Adiciona evento de clique passando o índice
        button.addEventListener('click', () => selectAnswer(index, button));
        
        answersContainer.appendChild(button);
    });
}

// Limpa o estado para a próxima pergunta (remove botões antigos, esconde botão Next)
function resetState() {
    nextBtn.classList.add('hide');
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

// Lógica ao selecionar uma resposta
function selectAnswer(selectedIndex, selectedButton) {
    const correctIndex = questions[currentQuestionIndex].correct;
    const buttons = answersContainer.children;

    // Verifica se acertou
    if (selectedIndex === correctIndex) {
        selectedButton.classList.add('correct');
        score++;
        scoreElement.innerText = score;
    } else {
        selectedButton.classList.add('wrong');
        // Mostra qual era a correta para efeito educativo
        buttons[correctIndex].classList.add('correct');
    }

    // Bloqueia todos os botões para evitar mudança de resposta
    Array.from(buttons).forEach(btn => {
        btn.disabled = true;
    });

    // Mostra botão de próxima
    nextBtn.classList.remove('hide');
}

// Avança para a próxima pergunta ou finaliza
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Exibe tela final
function showResults() {
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');
    
    finalScoreDisplay.innerText = `${score} / ${questions.length}`;
    
    // Mensagem personalizada baseada no desempenho
    if (score === questions.length) {
        feedbackMessage.innerText = "Parabéns! Acertou tudo! 🏆";
    } else if (score >= questions.length / 2) {
        feedbackMessage.innerText = "Bom trabalho! Tem bons conhecimentos. 📚";
    } else {
        feedbackMessage.innerText = "Continue a estudar! Tente novamente. 💡";
    }
}

// 5. EVENT LISTENERS
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', startGame);