//array to store the questions. Correct answers are designated by a 0-3 num range stored in "answer:".
const questions = [ 
    { 
      image: 'assets/imgs/evie1.webp',
      question: "How cute is your cat?",
      answers: ["Very", "Incredibly", "A bit", "Not cute"],
      answer: 1 // "incredibly"
    },
    {
      image: 'assets/imgs/mrman.webp',
      question: "Does your cat like chicken?", 
      answers: ["Yes", "No", "No comment", "Don't know"],
      answer: 0 // "yes"
    },
    {
      image: 'assets/imgs/evie2.webp',
      question: "Where is your cat?",
      answers: ["Asleep on the couch", "On top of the fridge", "Climbing out the window", "That's top secret info"],
      answer: 2 // "Climbing out the window"
    },
    {
      image: 'assets/imgs/mrman2.webp',
      question: "What is your cat thinking about?", 
      answers: ["Mischief", "Food", "Sleep", "Birds"],
      answer: 0 // "Mischief"
    },
    { 
      image: 'assets/imgs/evie3.webp',
      question: "Can your cat open doors?",
      answers: ["Don't know", "I hope not", "How could he?", "Yes"],
      answer: 3 // "Yes"
    },
    {
      image: 'assets/imgs/mrman3.webp',
      question: "Does your cat love cheese?", 
      answers: ["Yes", "No", "No comment", "Don't know"],
      answer: 0 // "yes"
    },
    {
      image: 'assets/imgs/eviemrman.webp',
      question: "How many toe beans does a cat have?",
      answers: ["Five", "Six", "Twenty", "what's a toe bean?"],
      answer: 2 // "Twenty"
    },
    {
      image: 'assets/imgs/eviemrman2.webp',
      question: "Did you know your cat is behind you?", 
      answers: ["What now?", "No", "Yes", "*eerie silence*"],
      answer: 1 // The answer is always "No". They sneak up on you.
    },
    {
      image: '',
      question: "",
      answers: "",
      answer: "" // pseudo-question to allow progression to results
    }
 ];

let trackScore = document.getElementById('scoreTracker'); //declare all the important things
let catResultImg = document.getElementById('resultsCat');
let scoreText = document.getElementById('scoreTrack');
let table = document.getElementById('highscores');
let qText = document.getElementById('question');
let qImg = document.getElementById('qImage');
let btn = document.getElementById('next');
let answersList = document.getElementsByClassName("answerFields");
let verify = document.getElementById('verify');
let quizProgress =  0;
var score = 0;
var i = 0;
verify.style.display = "none"; 
document.getElementById('scoreValues').style.display = 'none';
scoreText.style.display = "none";
catResultImg.style.display = "none"; //hide elements that come into play later

function fromStorage() { //function for retrieving data from localStorage
   var savedUser = localStorage.usrName;
   var savedScore = localStorage.scoreValue;
   let row = table.insertRow();
   let td1 = row.insertCell(0);
   let td2 = row.insertCell(1);
   td1.innerText = savedUser;
   td2.innerText = savedScore;
   }

if (localStorage.usrName) { //if a username exists in localStorage, load it to the scoreboard.
   fromStorage(); 
}

window.onload = function() { //quiz automatically starts when quiz.html has loaded
   showNext(quizProgress);
   btn.style.display = 'none';
};

function showNext() { //loads question text and answer text for as many questions as are present in the array & as much answer text is present
   var aQuestion = questions[quizProgress];
   qText.innerText = ("Question " + (quizProgress+1) + "/8: " + aQuestion.question); //array counts from 0 to 7, we want to count from 1 to 8
   qImg.src = aQuestion.image; // set the src of the img with ID qIMG as the relevant entry in the array
   for(let i = 0; i < answersList.length; i++ ) { // 0 1 2 3 answers - when i reaches 3, stop the loop
      answersList[i].style.display = '';
      answersList[i].textContent = aQuestion.answers[i];
      answersList[i].setAttribute("data-type", (i));

      if (quizProgress === 8) { //if you reach "question 9", calculate results
         calcResults();
      }
      else { //otherwise, keep going through the questions
         listenAnswer(); 
      }
   }
}

function listenAnswer() { //listen out for which button was clicked
   for (let i = 0; i < answersList.length; i++) {
      answersList[i].addEventListener("click", verifyAnswer);
   }
}

function verifyAnswer(e) { //verify whether or not user input matches correct answer according to array
   const delay = setTimeout(next, 450); //wait 450ms before progressing and activating the function "next()"
   function next() {
      verify.style.display = "none"; //hide correct/incorrect popup
      ++quizProgress; //progress to the next question in the array
      showNext(quizProgress); }
 
   var aQuestion = questions[quizProgress];
   if (e.target.getAttribute("data-type") == aQuestion.answer) { //check data-type number of button clicked against "answer" number stored in array
      ++score;
      scoreText.style.display = "";
      var navbar = document.getElementById('header');
      navbar.style.marginBottom = '0rem';
      trackScore.innerText = score;
      let correct = "Correct! Well done.";
      verify.style.backgroundColor = "rgba(0, 156, 0, 35%)";
      verify.style.animation = "fadeIn 0.2s";
      verify.style.display = "";
      verify.innerText = correct;
      return delay;
   }
   else if (e.target.getAttribute("data-type") != aQuestion.answer) {
      let incorrect = "100% wrong, sorry!";
      verify.style.backgroundColor = "rgba(208, 0, 0, 35%)";
      verify.style.animation = "fadeIn 0.3s";
      verify.style.display = "";
      verify.innerText = incorrect;
      return delay;
   }
   qText.innerHTML = "Loading next..."; //dummy text
   answersList.textContent = "";
   answersList.setAttribute = "";
   table.style.display = "none"; //hide scoreboard after first question
}

function calcResults() // calculate results
{
   let ansDiv = document.getElementById('answerList');
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
   qImg.style.display = "none";
   scoreText.style.display = "none";
   document.getElementById('header').style.marginBottom = "1rem";
   qText.innerHTML = "Results";

   if (results <=3) { //depending on score achieved, give different "results" image and text
      showResultText.innerText = pass; 
      catResultImg.style.display=''; 
      catResultImg.src ="assets/imgs/angry.gif"; 
      btn.style.display = ''; 
      btn.innerText = "Restart Quiz"; 
   }

   if (results >=4) {
      showResultText.innerText = distinction; 
      catResultImg.style.display=''; 
      catResultImg.src ="assets/imgs/fall.gif"; 
      btn.style.display = ''; 
      btn.innerText = "Restart Quiz"; 
   }

   if (results >=7) {
      showResultText.innerText = merit; 
      catResultImg.src ="assets/imgs/smile.gif"; 
      btn.style.display = ''; 
      btn.innerText = "Restart Quiz"; 
   }

   btn.onclick = function() {
      location.reload();
      btn.innerText = "Start Quiz";
      btn.style.display = "none";
   };
}

function submitScore() { //this is not unused, it is simply called by a html button instead of being triggered directly in the script
   let usr = document.getElementById('user').value;
   var rawValue = score;
   var specialChars = /[^A-Za-z0-9 .!?-]/g; //regex to detect anything other ("^") than A-z in lower or uppercase, 0-9 in decimals, or "!" "?" "." or "-" which are harmless elements which oft form part of human names and usernames

   if (usr.match(specialChars)) {
       alert ("No special characters apart from '!', '?', '.', or '-' please.");
       document.getElementById('user').focus();
       return;
   }

   else if (!usr) { //if "usr" is undefined or null - aka if the input is blank AND the user tries to submit, tell them to input a username.
      alert ("Input cannot be blank. Please input a username.");
      document.getElementById('user').focus();
      return;
   }
   
   else if (usr) { //if user input exists and has already been pre-determined as valid, submit to scoreboard
      let row = table.insertRow();
      let td1 = row.insertCell(0);
      let td2 = row.insertCell(1);
      td1.innerText =  usr;
      td2.innerText = rawValue;
      localStorage.usrName = usr;
      localStorage.scoreValue = rawValue;
      table.style.display = "";
      document.getElementById('submit').style.display = "none";
      alert("Score added! Scroll to see the all-time highscores.");
   }
}