function fromStorage() { //function for retrieving data from localStorage
    let table = document.getElementById('highscores');
    var savedUser = localStorage.usrName;
    var savedScore = localStorage.scoreValue;
    let row = table.insertRow();
    let td1 = row.insertCell(0);
    let td2 = row.insertCell(1);
    td1.innerText = savedUser;
    td2.innerText = savedScore;
}
 
 if (localStorage.usrName) {  //if a username exists in localStorage, load it to the scoreboard.
    fromStorage(); 
}

 function sent() { //in lieu of having a database or anywhere meaningful to send the comments form, sent is triggered when the form on feed.html is "submitted".
    alert("Message sent!");
 }

 