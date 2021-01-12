// create variables

numRight = 0;
numQuestions = 0;
answerDiv = document.getElementById('answers');
questionDiv = document.getElementById('question');
numRightSpan = document.getElementById('numRight');
numQuestionsSpan = document.getElementById('numQuestions');
startQuiz = document.getElementById('start-button');
questions = [
  {
      question: 'What is 1 + 1 ?',
      options: ['0','2','4'],
      correctIndex: 1
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
];

// When you click start quiz, timer begins and questions appear
startQuiz.addEventListener("click", function(event){
  event.preventDefault();
  setTime();
  displayQuestion(questions.shift());
});


function displayQuestion(q) {  
  // question text in HTML
  questionDiv.innerHTML = q.question;

  // clear answer buttons
  answerDiv.innerHTML = '';

  // for each option in the 'options' array, create a button
  // attach an 'onclick' event that will update
  // the question counts and display the next question in the array
  for(i = 0; i < q.options.length; i++) {
      btn = document.createElement('button');
      btn.innerHTML = q.options[i];
      btn.setAttribute('id',i);

      // event handler for each answer button
      btn.onclick = function() {
          var id = parseInt(this.getAttribute('id'),10);
          numQuestionsSpan.innerHTML = ++numQuestions;

          // if this is the right answer, increment numRight, if not subtract 10 seconds from timer
          if(id === q.correctIndex) {
              numRightSpan.innerHTML = ++numRight;
          }
          else {
            secondsLeft -= 10;
          }
        
          // if there is another question to be asked, run the function again
          // otherwise, complete the test
          if(questions.length) {
              displayQuestion(questions.shift()); 
          } else {
              alert('Done! You got '+numRight+' of '+numQuestions+' right!');
          }                    
      }
      answerDiv.appendChild(btn);        
  }
}

  // timer

  var timerEl = document.querySelector(".timer");
  
  var secondsLeft = 30;
  
  function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = secondsLeft + " seconds left.";
      
      if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        alert('Done! You got '+numRight+' of '+ 4 +' right!');
      }
  
    }, 1000);
  }

