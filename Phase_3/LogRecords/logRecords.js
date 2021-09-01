let readline = require("readline-sync");
let fs = require("fs");

let emp;
try {

    emp = JSON.parse(fs.readFileSync("emp.json").toString());
    console.log("File read complete!");
} catch (e) {
    console.log("File does not exist!!");
    emp = [];
}

let ans = true;
debugger;
while (ans) {
    let answer = readline.question("Do you want to continue: Yes or No? ");

    if (answer.toUpperCase() === "NO") {
        ans = false;
    } else {

        let fName = readline.question("Enter your first name: ");
        let lName = readline.question("Enter your lasts name: ");
        let gender = readline.question("Enter your gender: ");
        let email = readline.questionEMail("Enter your email: ");
        emp.push({ fName: fName, lName: lName, gender: gender, email: email });
    }

}
debugger;
let empString = JSON.stringify(emp);
fs.writeFileSync("emp.json", empString);
debugger;
console.log("Data stored in file!");