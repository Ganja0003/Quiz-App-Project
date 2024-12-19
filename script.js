
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
    explanation: "The book that is sent to the Muslims is called Quran."
  },
  {
    id: 2,
    question: "What is the name of the last prophet in Islam?",
    options: [
      { text: "Prophet Musa", isCorrect: false },
      { text: "Prophet Isa", isCorrect: false },
      { text: "Prophet Muhammad", isCorrect: true },
      { text: "Prophet Ibrahim", isCorrect: false },
    ],
    explanation: "The last prophet in Islam is Prophet Muhammad (PBUH)."
  },
  {
    id: 3,
    question: "How many daily prayers are obligatory for Muslims?",
    options: [
      { text: "Three", isCorrect: false },
      { text: "Five", isCorrect: true },
      { text: "Seven", isCorrect: false },
      { text: "Two", isCorrect: false },
    ],
    explanation: "Muslims are required to perform five daily prayers."
  }
];
  


  let optionElements = []; 
  const optionsContainer = document.querySelector('.options'); 
  const form = document.querySelector('#quizForm');
  const questionTitle = document.querySelector('.questionTitle');
  questionTitle.textContent = quizQuestions[1].question;
   
  for (let i = 0; i < quizQuestions[1].options.length; i++) {
    const option = quizQuestions[1].options[i];
    optionElements.push(`
      <label>
        <input type="radio" name="answer" value="${option.text}"> ${option.text}
      </label>
    `);
  }
  
  optionsContainer.innerHTML = optionElements
  
  
  function submitForm(event) {
    event.preventDefault();
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) return alert('Please select an answer.');
    if (selectedOption.value === 'Quran') {
      alert(`Correct answer. explanation: ${quizQuestions[1].explanation}` );
    } else {
      alert(`Wrong answer. explanation: ${quizQuestions[1].explanation}`);
    }
  }
  
  form.addEventListener('submit', submitForm);
  