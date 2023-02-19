const QUESTIONS = [
    "How cute is your cat?", 
    "Does your cat like chicken?", 
    "Where is your cat?",
    "What is your cat thinking about?"
 ];
let qText = document.getElementById('question');
qText.innerText = QUESTIONS[i] 
let btn = document.getElementById('next');
btn.addEventListener('click', showNext);

var i = 0;
qText.innerText = QUESTIONS[i];
function showNext() {
if(QUESTIONS[i+1]){
   i++;
   qText.innerText = QUESTIONS[i];
}
else {

   if(QUESTIONS[i-1]) {
      qText.innerText = ("Quiz over!");
   };
  }
}

function SubmitQuiz() {

}