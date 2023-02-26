const questions = [
    { 
      question: "How cute is your cat?",
      answers: ["Very", "Incredibly", "A bit", "Not cute"],
      answer: 1
    },
    {
      question: "Does your cat like chicken?", 
      answers: ["yes", "no", "no comment", "don't know"],
      answer: 0
    },
    {
      question: "Where is your cat?",
      answers: ["asleep on the couch", "on top of the fridge", "climbing out the window", "that's top secret info"],
      answer: 2
    },
    {
      question: "What is your cat thinking about?", 
      answers: ["mischief", "food", "sleep", "birds"],
      answer: 0
    },
    { 
      question: "Can your cat open doors?",
      answers: ["Don't know", "I hope not", "How could he?", "Yes"],
      answer: 3
    },
    {
      question: "Does your cat love cheese?", 
      answers: ["yes", "no", "no comment", "don't know"],
      answer: 0
    },
    {
      question: "How many toe beans does a cat have?",
      answers: ["Five", "Six", "Twenty", "what's a toe bean?"],
      answer: 2
    },
    {
      question: "Did you know your cat is behind you?", 
      answers: ["What now?", "No", "Yes", "*eerie silence*"],
      answer: 1
    }
 ]; //add more questions here
var qText = document.getElementById('question');
var aNswer = document.getElementsByClassName('answer');
let btn = document.getElementById('next');
let submitButton =  document.getElementById('submit');
submitButton.addEventListener('click',submit);
//btn.addEventListener('click', showNext);
var answersList = document.getElementsByClassName("answerFields");
let quizProgress =  0;
var i = 0;

btn.onclick = function() { 
   //if(quizProgress>questions.length -1){   
   showNext(quizProgress);
};

// qText.innerText = questionText;

function showNext() {
   var aQuestion = questions[quizProgress];
   qText.innerText = aQuestion.question;

   for(let i = 0; i < answersList.length; i++ ) {
      answersList[i].textContent = aQuestion.answers[i];
      answersList[i].setAttribute("data-type", (i));
   }
   if (quizProgress == 8) {
      calcResults();
   }
   else { 
      listenAnswer(); 
   }
}


function listenAnswer() {
   for (let i = 0; i < answersList.length; i++) {
      answersList[i].addEventListener("click", verifyAnswer);
   }
}

var score = 0;
function verifyAnswer(e) {
   var aQuestion = questions[quizProgress];
   if (e.target.getAttribute("data-type") == aQuestion.answer) {
      console.log("correct");
      ++score;
      console.log("score is:" );
      console.log(score);
   }
   else if (e.target.getAttribute("data-type") != aQuestion.answer) {
      console.log("incorrect! you picked:")
      console.log(e.target.getAttribute("data-type"));
      console.log("but the answer is:");
      console.log(aQuestion.answer);
      console.log("score is:" );
      console.log(score);
   };
   qText.innerHTML = "";
   answersList.textContent = "";
   answersList.setAttribute = "";
   console.log("old question was:");
   console.log(quizProgress+1);

   if (quizProgress === 7) {
      calcResults();
   }
   else { 
      ++quizProgress;
      console.log("new question is:");
      console.log(quizProgress+1);
      showNext(quizProgress); }
 
   
}

//to do: more questions, score calculation, results page, THEN general css, images, beautifying etc



function calcResults() 
{
  var pass = "your cat knowledge isn't very good";
  var distinction = "you could do with brushing up on cats";
  var merit = "you're a proper cat genius";
  var showResultText = document.getElementById('resultsText');
  var results = parseInt(score);
  var rawValue = document.getElementById('rawvalue');
  var percentage = document.getElementById('percent');
  const calcScore = (results / 8) * 100;
  rawValue.innerText = results;
  percentage.innerText = calcScore;
  if (results <=3) {showResultText.innerText = pass; };
  if (results <=6) {showResultText.innerText = distinction;};
  if (results >=7) {showResultText.innerText = merit;};
  // html correspond = <p>Congrats! You got <span id="rawvalue"></span> out of 8. In other words, you scored <span id=percent></span>. </p>
}