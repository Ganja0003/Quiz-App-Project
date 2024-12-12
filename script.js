const quizQuestion = {
    id: 1,
    question: "What is the book sent to the Muslims called?",
    options: [
      { text: "Sunnah", isCorrect: false },
      { text: "Quran", isCorrect: true },
      { text: "Hadith", isCorrect: false },
      { text: "Wudhu", isCorrect: false },
    ],
    explanation: "The book that is sent to the Muslims is called Quran."
  };
  
  let optionElements = []; 
  const optionsContainer = document.querySelector('.options'); 
  const form = document.querySelector('#quizForm');
  const questionTitle = document.querySelector('.questionTitle');
  questionTitle.textContent = quizQuestion.question;
   
  for (let i = 0; i < quizQuestion.options.length; i++) {
    const option = quizQuestion.options[i];
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
      alert(`Correct answer. explanation: ${quizQuestion.explanation}` );
    } else {
      alert(`Wrong answer. explanation: ${quizQuestion.explanation}`);
    }
  }
  
  form.addEventListener('submit', submitForm);
  