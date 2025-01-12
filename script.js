const quizQuestions = [
  {
    id: 1,
    question: "What is the book sent to the Muslims called?",
    options: [
      { text: "Sunnah", isCorrect: false },
      { text: "Quran", isCorrect: true },
      { text: "Hadith", isCorrect: false },
      { text: "Wudhu", isCorrect: false },
    ],
    explanation: "The book that is sent to the Muslims is called Quran.",
  },
  {
    id: 2,
    question: "What is the name of the last prophet in Islam?",
    options: [
      { text: "Musa", isCorrect: false },
      { text: "Issa", isCorrect: false },
      { text: "Muhammad", isCorrect: true },
      { text: "Ibrahim", isCorrect: false },
    ],
    explanation: "The last prophet in Islam is Prophet Muhammad (peace be upon him).",
  },
  {
    id: 3,
    question: "What is the primary place of worship for Muslims?",
    options: [
      { text: "Church", isCorrect: false },
      { text: "Synagog", isCorrect: false },
      { text: "Mosque", isCorrect: true },
      { text: "Temple", isCorrect: false },
    ],
    explanation: "The primary place of worship for Muslims is a mosque.",
  },
];

let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let currentQuestionIndex = 0;

const questionTitle = document.querySelector('.questionTitle');
const optionsContainer = document.querySelector('.options');
const form = document.querySelector('#quizForm');
const questionList = document.querySelector('.questionList');

const player1ScoreHtml = document.getElementById('player1-score');
const player2ScoreHtml = document.getElementById('player2-score');
const currentTurnHtml = document.getElementById('current-turn');

function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionTitle.textContent = currentQuestion.question;

  const optionElements = currentQuestion.options.map(
    option => `
    <label>
      <input type="radio" name="answer" value="${option.text}">
      ${option.text}
    </label>
  `
  );
  optionsContainer.innerHTML = optionElements.join('');
}

function submitForm(event) {
  event.preventDefault();
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (!selectedOption) {
    alert('Please select an answer.');
    return;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isCorrect = currentQuestion.options.find(
    option => option.text === selectedOption.value
  ).isCorrect;

  if (isCorrect) {
    alert(`Correct answer. Explanation: ${currentQuestion.explanation}`);
    if (currentPlayer === 1) {
      player1Score++;
      player1ScoreHtml.textContent = player1Score;
    } else {
      player2Score++;
      player2ScoreHtml.textContent = player2Score;
    }
  } else {
    alert(`Wrong answer. Explanation: ${currentQuestion.explanation}`);
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
    if (currentPlayer === 1) {
      currentPlayer = 2;
    } else {
      currentPlayer = 1;
    }
    currentTurnHtml.textContent = `Player ${currentPlayer}`;
  } else {
    alert('quiz completed!');
    form.removeEventListener('submit', submitForm);
    form.innerHTML = '';
    stateWinner();
  }
}

function stateWinner() {
  const winningMessage = document.createElement('p');
  if (player1Score > player2Score) {
    winningMessage.textContent = 'player 1 won';
  } else if (player2Score > player1Score) {
    winningMessage.textContent = 'player 2 won';
  } else {
    winningMessage.textContent = "Its a tie!";
  }
  document.body.appendChild(winningMessage);
}

function filterQuestions(searchTerm) {
  questionList.innerHTML = '';

  quizQuestions.forEach(question => {
    if (question.question.toLowerCase().includes(searchTerm.toLowerCase())) {
      const questionDiv = document.createElement('div');
      questionDiv.textContent = question.question;
      questionList.appendChild(questionDiv);
    }
  });
}

displayQuestion();
form.addEventListener('submit', submitForm);
