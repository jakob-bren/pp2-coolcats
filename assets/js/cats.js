
const questions = [
    { 
      image: 'assets/imgs/cat1.jpg',
      question: "How cute is your cat?",
      answers: ["Very", "Incredibly", "A bit", "Not cute"],
      answer: 1
    },
    {
      image: 'assets/imgs/cat2.jpg',
      question: "Does your cat like chicken?", 
      answers: ["yes", "no", "no comment", "don't know"],
      answer: 0
    },
    {
      image: 'assets/imgs/cat3.jpg',
      question: "Where is your cat?",
      answers: ["asleep on the couch", "on top of the fridge", "climbing out the window", "that's top secret info"],
      answer: 2
    },
    {
      image: 'assets/imgs/cat4.jpg',
      question: "What is your cat thinking about?", 
      answers: ["mischief", "food", "sleep", "birds"],
      answer: 0
    },
    { 
      image: 'assets/imgs/cat5.jpg',
      question: "Can your cat open doors?",
      answers: ["Don't know", "I hope not", "How could he?", "Yes"],
      answer: 3
    },
    {
      image: 'assets/imgs/cat6.jpg',
      question: "Does your cat love cheese?", 
      answers: ["yes", "no", "no comment", "don't know"],
      answer: 0
    },
    {
      image: 'assets/imgs/cat7.jpg',
      question: "How many toe beans does a cat have?",
      answers: ["Five", "Six", "Twenty", "what's a toe bean?"],
      answer: 2
    },
    {
      image: 'assets/imgs/cat8.jpg',
      question: "Did you know your cat is behind you?", 
      answers: ["What now?", "No", "Yes", "*eerie silence*"],
      answer: 1
    },
    {
      image: '',
      question: "",
      answers: "",
      answer: ""
    }
 ];


function fromStorage() {
   var savedUser = localStorage.usrName;
   var savedScore = localStorage.scoreValue;
      var table = document.getElementById('highscores');
      let row = table.insertRow();
      let td1 = row.insertCell(0);
      let td2 = row.insertCell(1);
      td1.innerText = savedUser;
      td2.innerText = savedScore;
}

let qText = document.getElementById('question');
let qImg = document.getElementById('qImage');
let aNswer = document.getElementsByClassName('answer');
let btn = document.getElementById('next');
let answersList = document.getElementsByClassName("answerFields");
let verify = document.getElementById('verify');
let quizProgress =  0;
var i = 0;
verify.style.display = "none";
document.getElementById('scoreValues').style.display = 'none';

function hideButtons() {
   for(let i = 0; i < answersList.length; i++ ) {
      answersList[i].style.display = 'none';
   }
}

hideButtons();

window.onload = function() {  
   showNext(quizProgress);
   btn.style.display = 'none';
};

// qText.innerText = questionText;

function showNext() {
   var aQuestion = questions[quizProgress];
   let br = document.createElement("br");
   qText.innerText = ("Question " + (quizProgress+1) + ": " + aQuestion.question);
   qImg.src = aQuestion.image;
   for(let i = 0; i < answersList.length; i++ ) {
      answersList[i].style.display = '';
      answersList[i].textContent = aQuestion.answers[i];
      answersList[i].setAttribute("data-type", (i));

      if (quizProgress === 8) {
         calcResults();
         hideButtons();
         qText.style.display = 'none';
      }
      else { 
         listenAnswer(); 
      }
   }
}


function listenAnswer() {
   for (let i = 0; i < answersList.length; i++) {
      answersList[i].addEventListener("click", verifyAnswer);
   }
}

var score = 0;
function verifyAnswer(e) {
   const delay = setTimeout(next, 400);
   function next() {
      verify.style.display = "none";
      ++quizProgress;
      console.log("new question is:");
      console.log(quizProgress+1);
      showNext(quizProgress); }
 
   var aQuestion = questions[quizProgress];
   if (e.target.getAttribute("data-type") == aQuestion.answer) {
      console.log("correct");
      ++score;
      console.log("score is:" );
      console.log(score);
      let correct = "Correct! Well done."
      verify.style.display = "";
      verify.style.backgroundColor = "green";
      verify.innerText = correct;
      delay;
   }
   else if (e.target.getAttribute("data-type") != aQuestion.answer) {
      console.log("incorrect! you picked:")
      console.log(e.target.getAttribute("data-type"));
      console.log("but the answer is:");
      console.log(aQuestion.answer);
      console.log("score is:" );
      console.log(score);
      let incorrect = "100% wrong, sorry!"
      verify.style.display = "";
      verify.style.backgroundColor = "red";
      verify.innerText = incorrect;
      delay;
   };
   qText.innerHTML = "";
   answersList.textContent = "";
   answersList.setAttribute = "";
   console.log("old question was:");
   console.log(quizProgress+1);

  
 
   
}

//to do: more questions, score calculation, results page, THEN general css, images, beautifying etc



function calcResults() 
{
  let ansDiv = document.getElementById('answerList');
  var catResultImg = document.getElementById('resultsCat');
  var pass = "your cat knowledge isn't very good";
  var distinction = "you could do with brushing up on cats";
  var merit = "you're a proper cat genius";
  var showResultText = document.getElementById('resultsText');
  document.getElementById('scoreValues').style.display = '';
  var results = parseInt(score);
  var rawValue = document.getElementById('rawvalue');
  var percentage = document.getElementById('percent');
  const calcScore = (results / 8) * 100;
  rawValue.innerText = results;
  percentage.innerText = calcScore;
  ansDiv.style.display = "none";
  if (results <=3) {showResultText.innerText = pass; catResultImg.src ="assets/imgs/angry.gif"; btn.style.display = ''; btn.innerText = "Restart Quiz"; };
  if (results >=4) {showResultText.innerText = distinction; catResultImg.src ="assets/imgs/fall.gif"; btn.style.display = ''; btn.innerText = "Restart Quiz"; };
  if (results >=7) {showResultText.innerText = merit; catResultImg.src ="assets/imgs/smile.gif"; btn.style.display = ''; btn.innerText = "Restart Quiz"; };
  btn.onclick = function() {
   location.reload();
   btn.innerText = "Start Quiz";
   btn.style.display = "none"; }
  // html correspond = <p>Congrats! You got <span id="rawvalue"></span> out of 8. In other words, you scored <span id=percent></span>. </p>
}


function submitScore() {
   var usr = document.getElementById('user').value;
   var rawValue = score;
   var table = document.getElementById('highscores');
   console.log(rawValue);
   console.log (usr);
   let row = table.insertRow();
   let td1 = row.insertCell(0);
   let td2 = row.insertCell(1);
   td1.innerText =  usr;
   td2.innerText = rawValue;
   localStorage.usrName = usr;
   localStorage.scoreValue = rawValue;
   console.log(localStorage.usrName);
   console.log(localStorage.scoreValue);
}