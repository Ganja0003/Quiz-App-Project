let quizQuestions = [];
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
const playerForm = document.getElementById('playerForm');
const player1UI = document.getElementById('player1UI');
const player2UI = document.getElementById('player2UI');

playerForm.addEventListener("submit", function(event){
  event.preventDefault();
  const player1ValueName = document.getElementById('player1ValueName').value;
  const player2ValueName = document.getElementById('player2ValueName').value;
  
  player1UI.textContent = player1ValueName
  player2UI.textContent = player2ValueName

  playerForm.classList.add('hidden');
});




fetch('https://raw.githubusercontent.com/Ganja0003/Ganja0003.github.io/refs/heads/main/apis/data.json')
.then(response => response.json())
.then(data => quizQuestions = data)
.then(displayQuestion)
.catch(err => console.log(`failed to fetch:${err}`))



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
    showQuestions(); 
    stateWinner();
  }
}

function showQuestions() {
  questionList.innerHTML = ''; 
  questionList.style.display = "flex"
  questionList.style.height = "400px"

  quizQuestions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-div';
    questionDiv.innerHTML = `
      <h3>${index + 1}. ${question.question}</h3>
      <ul>
        ${question.options.map(option => `<li>${option.text}</li>`).join('')}
      </ul>
      <button class="reveal-button"onclick="revealAnswer(${index})">Reveal Answer</button>
      <p id="answer-${index}" style="display: none;">Correct Answer: ${
      question.options.find(option => option.isCorrect).text
    }</p>
    `;
    questionList.appendChild(questionDiv);
  });

  
}

function revealAnswer(index) {
  document.getElementById(`answer-${index}`).style.display = 'block';
}

function stateWinner() {
  const winningMessage = document.createElement('p');
  const player1ValueName = document.getElementById('player1ValueName').value;
  const player2ValueName = document.getElementById('player2ValueName').value;  

  if (player1Score > player2Score) {
    winningMessage.textContent = `${player1ValueName} Won`;
  } else if (player2Score > player1Score) {
    winningMessage.textContent = `${player2ValueName} Won`;
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


form.addEventListener('submit', submitForm);
