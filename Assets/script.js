// create variables

numRight = 0,
numQuestions = 0,
answerDiv = document.getElementById('answers'),
questionDiv = document.getElementById('question'),
numRightSpan = document.getElementById('numRight'),
numQuestionsSpan = document.getElementById('numQuestions');
startQuiz = document.getElementById('start-button');
questions = [
  {
      question: 'What is 1 + 1 ?',
      options: ['0','1','2'],
      correctIndex: 0
  },
  {
      question: 'What is 2 + 2 ?',
      options: ['72','4','3.5'],
      correctIndex: 1
  },
  {
    question: 'What is 5 + 2 ?',
    options: ['7','11','72'],
    correctIndex: 0
  },

  {
    question: 'What is 12 + 2 ?',
    options: ['5','8','14'],
    correctIndex: 2
  },
]



function showQuestion(q) {  
  // insert the question text
  questionDiv.innerHTML = q.question;

  // clear existing 
  answerDiv.innerHTML = '';

  // for each option in the 'options' array, create a button
  // attach an 'onclick' event handler that will update
  // the question counts and display the next question in the array
  for(i = 0; i < q.options.length; i++) {
      btn = document.createElement('button');
      btn.innerHTML = q.options[i];
      btn.setAttribute('id',i);

      // event handler for each answer button
      btn.onclick = function() {
          var id = parseInt(this.getAttribute('id'),10);
          numQuestionsSpan.innerHTML = ++numQuestions;

          // if this is the right answer, increment numRight
          if(id === q.correctIndex) {
              numRightSpan.innerHTML = ++numRight;
          }

          // if there is another question to be asked, run the function again
          // otherwise, complete the test however you see fit
          if(questions.length) {
              displayQuestion(questions.shift()); 
          } else {
              alert('Done! You got '+numRight+' of '+numQuestions+' right!');
          }                    
      }
      answerDiv.appendChild(btn);        
  }
}

startQuiz.addEventListener("click", function(event){
  event.preventDefault();
  setTime();
});

  showQuestion(questions.shift());

  // timer

  var timerEl = document.querySelector(".timer");
  
  var secondsLeft = 90;
  
  function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = secondsLeft + " seconds left.";
      
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        // showResults();
      }
  
    }, 1000);
  }

  // function incorrect() {
  //   timerEl.textContent = secondsLeft + " seconds left.";
  //   secondsLeft -= 10;
  //   if(secondsLeft <= 0) {
  //     clearInterval(timerInterval);
      
  //   }
  // }


