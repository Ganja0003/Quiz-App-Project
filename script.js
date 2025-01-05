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

const submittedQuestions = [];
let currentQuestionIndex = 0;
const questionTitle = document.querySelector('.questionTitle');
const optionsContainer = document.querySelector('.options');
const form = document.querySelector('#quizForm');
const questionList = document.querySelector('.questionList');

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
  submittedQuestions.push({
    question: currentQuestion.question,
    selectedAnswer: selectedOption.value,
    isCorrect: isCorrect,
  });

  if (isCorrect) {
    alert(`Correct answer. Explanation: ${currentQuestion.explanation}`);
  } else {
    alert(`Wrong answer. Explanation: ${currentQuestion.explanation}`);
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    alert('You have completed the quiz!');
    form.removeEventListener('submit', submitForm);
    form.innerHTML = '';
    showQuestions(); 
  }
}

function showQuestions() {
  questionList.innerHTML = ''; 

  quizQuestions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `
      <h3>${index + 1}. ${question.question}</h3>
      <ul>
        ${question.options.map(option => `<li>${option.text}</li>`).join('')}
      </ul>
      <button onclick="revealAnswer(${index})">Reveal Answer</button>
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