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

 function sent() {
    alert("Message sent!");
 }