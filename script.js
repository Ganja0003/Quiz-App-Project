
// Quizquestions array which are fetched from a json file and currentQuestionIndex to keep track of who turn it is 
let quizQuestions = [];
let currentQuestionIndex = 0;

// these store scores for both players and know whose turn it is
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

// These will connect to the user interface to display the players,names, scores and the current turn
const playerForm = document.getElementById('playerForm');
const playerName1UI = document.getElementById('player1Name');
const player1ScoreUI = document.getElementById('player1-score');
const playerName2UI = document.getElementById('player2Name');
const player2ScoreUI = document.getElementById('player2-score');
const currentTurnUI = document.getElementById('current-turn');

// These connect to the user interface to show the quiz form, question, and the options they can choose from.
const form = document.querySelector('#quizForm');
const questionTitle = document.querySelector('.questionTitle');
const optionsContainer = document.querySelector('.options');
const questionList = document.querySelector('.questionList');







//Function that is executed when the playerForm is submited and they have to input there names or anything
playerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const player1ValueName = document.getElementById('player1ValueNameFromInput').value;
  const player2ValueName = document.getElementById('player2ValueNameFromInput').value;
  
  playerName1UI.textContent = `${player1ValueName}:`
  playerName2UI.textContent = `${player2ValueName}:`

  currentTurnUI.textContent = currentPlayer === 1 ? player1ValueName : player2ValueName;

  playerForm.style.display ='none'
});



//fetches from a json file where Quizquestions is located
async function fetchQuestions(){
  try {
    const response = await fetch('https://raw.githubusercontent.com/Ganja0003/Ganja0003.github.io/refs/heads/main/apis/data.json');
    quizQuestions = await response.json();
    displayQuestion();
  } catch (error) {
    console.log(`failed to fetch:${err}`)
  }
}



//Function that dislpays the question, and the choices you can make, and it will be called aslong as there is questions left.
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



// Function that is responsible for handling the player's answer to a quiz question. It checks whether the player's choice is correct, updates the player's score, and moves the game to the next question or ends the quiz when all questions are answered.
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
      player1ScoreUI.textContent = player1Score;
    } else {
      player2Score++;
      player2ScoreUI.textContent = player2Score;
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
    currentTurnUI.textContent = `${currentPlayer === 1 ? playerName1UI.textContent : playerName2UI.textContent}`;
  } else {
    alert('quiz completed!');
    form.removeEventListener('submit', submitForm);
    form.innerHTML = '';
    showQuestions(); 
    stateWinner();
  }
}



// Function this shows all the quiz questions after the game is finished, and lets the players see the questions and the correct answers.
function showQuestions() {
  questionList.innerHTML = ''; 
  questionList.style.display = "flex";
  questionList.style.height = "400px"

  quizQuestions.forEach(  (quizQuestion, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-div';
    questionDiv.innerHTML = `
      <h3>${index + 1}. ${quizQuestion.question}</h3>
      <ul>
        ${quizQuestion.options.map((option) => `<li>${option.text}</li>`).join('')}
      </ul>
      <button class="reveal-button"onclick="revealAnswer(${index})">Reveal Answer</button>
      <p id="answer-${index}" style="display: none;">Correct Answer: ${
        quizQuestion.options.find(option => option.isCorrect).text
    }</p>
    `;
    questionList.appendChild(questionDiv);
  });
}



// Function shows the correct answer for a specific question when the player clicks the "Reveal Answer" button.
function revealAnswer(index) {
  document.getElementById(`answer-${index}`).style.display = 'block';
}



// Function is used to display the winner of the quiz game after all questions have been answered it compares the players' scores and shows a message announcing who won or if it's a tie
function stateWinner() {
  const winningMessage = document.createElement('p');

  if (player1Score > player2Score) {
    winningMessage.textContent = `${playerName1UI.textContent} Won 🏆`;
  } else if (player2Score > player1Score) {
    winningMessage.textContent = `${playerName2UI.textContent} Won 🏆`;
  } else {
    winningMessage.textContent = "Its a tie!";
  }
  document.body.appendChild(winningMessage);
  console.log(winningMessage)
}



// Function that filters and display quiz questions based on the user’s input. It will only show the questions that match the input the userInput.
function filterQuestions(userInput) {
  questionList.innerHTML = '';

  quizQuestions.forEach((quizQuestion) => {
    if (quizQuestion.question.toLowerCase().includes(userInput.toLowerCase())) {
      const questionDiv = document.createElement('div');
      questionDiv.textContent = quizQuestion.question;
      questionList.appendChild(questionDiv);
    }
  });
}

fetchQuestions();
form.addEventListener('submit', submitForm);
