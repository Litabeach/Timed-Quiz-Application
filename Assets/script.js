// variables

var numRight = 0;
var numQuestions = 0;
var answerDiv = document.getElementById('answers');
var questionDiv = document.getElementById('question');
var numRightSpan = document.getElementById('numRight');
var numQuestionsSpan = document.getElementById('numQuestions');
var startQuiz = document.getElementById('start-button');
var scoreEl = document.getElementById('score');
var completeDiv = document.getElementById('complete');
var inputInitials = document.getElementById('input-initials');
var timerInterval;
var timerEl = document.querySelector(".timer");
var submitForm = document.getElementById('submit-form');
var secondsLeft = 30;

var scores = JSON.parse(localStorage.getItem("scores")) || [];
console.log(scores);

// array of quiz questions
var questions = [
  {
    question: 'What is the stalk that joins a leaf to a stem called?',
    options: ['root', 'petiole', 'xylem'],
    correctIndex: 1
  },
  {
    question: 'Which part of the plant makes food for the plant?',
    options: ['stem', 'leaves', 'stamen'],
    correctIndex: 1
  },
  {
    question: 'What part of the plant absorbs water and minerals from soil?',
    options: ['root', 'flower', 'seeds'],
    correctIndex: 0
  },

  {
    question: 'What part of the plant delivers water to the other parts of the plant?',
    options: ['leaf', 'auxillary bud', 'stem'],
    correctIndex: 2
  },
];

// When you click start quiz, timer begins and questions appear
startQuiz.addEventListener("click", function (event) {
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
  for (i = 0; i < q.options.length; i++) {
    var btn = document.createElement('button');
    btn.innerHTML = q.options[i];
    btn.setAttribute('id', i);
    btn.style.color = 'blue';
    // btn.appendChild(lineBreak);

    // event handler for each answer button
    btn.onclick = function () {
      var id = parseInt(this.getAttribute('id'), 10);
      numQuestionsSpan.innerHTML = ++numQuestions;

      // if this is the right answer, increment numRight, if not subtract 10 seconds from timer
      if (id === q.correctIndex) {
        numRightSpan.innerHTML = ++numRight;
      }
      else {
        if (secondsLeft <= 9) {
          secondsLeft = 1
        }
        else {
          secondsLeft -= 10;
        }
      }

      // if there is another question to be asked, run the function again
      // otherwise, complete the test and display results
      if (questions.length) {
        displayQuestion(questions.shift());
      } else {
        displayResults();
      }
    }
    answerDiv.appendChild(btn);
  }
}

// function to hide questions/answers and show score and initials form
function displayResults() {
  questionDiv.classList.add("hide");
  answerDiv.classList.add("hide");
  completeDiv.classList.remove("hide");
  clearInterval(timerInterval);
  scoreEl.innerHTML = "All done! Your score is: " + secondsLeft;
};

// event listener to submit score and intials, send to high score page
submitForm.addEventListener("submit", function (event) {
  event.preventDefault()

  scores.push({
    initials: inputInitials.value,
    score: secondsLeft
  })

  localStorage.setItem('scores', JSON.stringify(scores))

  // redirect to high scores page
  location.href = "Assets/highscores.html";
});


// timer;
function setTime() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = secondsLeft + " seconds left.";

      if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        displayResults();
      }


  }, 1000);
}
