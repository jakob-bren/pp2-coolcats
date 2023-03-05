
const questions = [
    { 
      image: 'assets/imgs/evie1.webp',
      question: "How cute is your cat?",
      answers: ["Very", "Incredibly", "A bit", "Not cute"],
      answer: 1
    },
    {
      image: 'assets/imgs/mrman.webp',
      question: "Does your cat like chicken?", 
      answers: ["yes", "no", "no comment", "don't know"],
      answer: 0
    },
    {
      image: 'assets/imgs/evie2.webp',
      question: "Where is your cat?",
      answers: ["asleep on the couch", "on top of the fridge", "climbing out the window", "that's top secret info"],
      answer: 2
    },
    {
      image: 'assets/imgs/mrman2.webp',
      question: "What is your cat thinking about?", 
      answers: ["mischief", "food", "sleep", "birds"],
      answer: 0
    },
    { 
      image: 'assets/imgs/evie3.webp',
      question: "Can your cat open doors?",
      answers: ["Don't know", "I hope not", "How could he?", "Yes"],
      answer: 3
    },
    {
      image: 'assets/imgs/mrman3.webp',
      question: "Does your cat love cheese?", 
      answers: ["yes", "no", "no comment", "don't know"],
      answer: 0
    },
    {
      image: 'assets/imgs/eviemrman.webp',
      question: "How many toe beans does a cat have?",
      answers: ["Five", "Six", "Twenty", "what's a toe bean?"],
      answer: 2
    },
    {
      image: 'assets/imgs/eviemrman2.webp',
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




let table = document.getElementById('highscores');
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

function fromStorage() {
   var savedUser = sessionStorage.usrName;
   var savedScore = sessionStorage.scoreValue;
   console.log(sessionStorage.usrName);
   console.log("test");
   console.log(sessionStorage.scoreValue);
   console.log("test1");
   let row = table.insertRow();
   let td1 = row.insertCell(0);
   let td2 = row.insertCell(1);
   td1.innerText = savedUser;
   td2.innerText = savedScore;
   }

if (sessionStorage.usrName) { fromStorage(); }

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
   qText.innerText = ("Question " + (quizProgress+1) + "/8: " + aQuestion.question);
   qImg.src = aQuestion.image;
   for(let i = 0; i < answersList.length; i++ ) {
      answersList[i].style.display = '';
      answersList[i].textContent = aQuestion.answers[i];
      answersList[i].setAttribute("data-type", (i));

      if (quizProgress === 8) {
         calcResults();
         hideButtons();
         
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
      let correct = "Correct! Well done.";
      verify.style.backgroundColor = "rgba(0, 156, 0, 35%)";
      verify.style.animation = "fadeIn 0.3s";
      verify.style.display = "";
      verify.innerText = correct;
      delay();
   }
   else if (e.target.getAttribute("data-type") != aQuestion.answer) {
      console.log("incorrect! you picked:");
      console.log(e.target.getAttribute("data-type"));
      console.log("but the answer is:");
      console.log(aQuestion.answer);
      console.log("score is:" );
      console.log(score);
      let incorrect = "100% wrong, sorry!";
      verify.style.backgroundColor = "rgba(208, 0, 0, 35%)";
      verify.style.animation = "fadeIn 0.3s";
      verify.style.display = "";
      verify.innerText = incorrect;
      delay();
   }
   qText.innerHTML = "Loading next...";
   answersList.textContent = "";
   answersList.setAttribute = "";
   console.log("old question was:");
   console.log(quizProgress+1);
   table.style.display = "none";

  
 
   
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
  qText.innerHTML = "Results";
  if (results <=3) {showResultText.innerText = pass; catResultImg.src ="assets/imgs/angry.gif"; btn.style.display = ''; btn.innerText = "Restart Quiz"; }
  if (results >=4) {showResultText.innerText = distinction; catResultImg.src ="assets/imgs/fall.gif"; btn.style.display = ''; btn.innerText = "Restart Quiz"; }
  if (results >=7) {showResultText.innerText = merit; catResultImg.src ="assets/imgs/smile.gif"; btn.style.display = ''; btn.innerText = "Restart Quiz"; }
  btn.onclick = function() {
   location.reload();
   btn.innerText = "Start Quiz";
   btn.style.display = "none"; };
  // html correspond = <p>Congrats! You got <span id="rawvalue"></span> out of 8. In other words, you scored <span id=percent></span>. </p>
}


function submitScore() {
   
   let usr = document.getElementById('user').value;
   var rawValue = score;
   console.log(rawValue);
   console.log (usr);
   var specialChars = /[^A-Za-z0-9 .!?-]/g;
   if (usr.match(specialChars)) {
       alert ("No special characters apart from '!', '?', '.', or '-' please.");
       document.getElementById('user').focus();
       return;
   }
   else if (!usr) {
      alert ("Input cannot be blank.");
      document.getElementById('user').focus();
      return;
   }
   
   else if (usr) {
      let row = table.insertRow();
      let td1 = row.insertCell(0);
      let td2 = row.insertCell(1);
      td1.innerText =  usr;
      td2.innerText = rawValue;
      sessionStorage.usrName = usr;
      sessionStorage.scoreValue = rawValue;
      table.style.display = "";
      document.getElementById('submit').style.display = "none";
      alert("Score added! Scroll to see the all-time highscores.");
   }
}