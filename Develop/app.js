const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

//call render get all ppl info/promts. pass it to render,after that i get a list and write a file

teamMembers = [];

function theManager(){
    const questions = [
        {
            type: "input",
            message: "What is your managers name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your managers id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your managers email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your managers office number?",
            name: "officeNumber"
        }
    ];
    inquirer.prompt(questions).then(function(response){
        console.log(response);
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        teamMembers.push(manager);
        theEmployee();
    });
}

function theEmployee(){
    const theEmployee = [
        {
            type: "list",
            name: "employeeType",
            message: "Select one of the following position titles",
            choices: ["Engineer", "Intern", "I don't want to add anymore employees!"]
        }
    ];
    inquirer.prompt(theEmployee).then(function(response){
        console.log(response);
        if(response.employeeType == "Engineer"){
            theEngineer();
        }else if(response.employeeType == "Intern"){
            theIntern();
        }else if(response == "I don't want to add anymore employees!"){
            return;
        }
    })
}

function theEngineer(){
    const questions = [
        {
            type:"input",
            message: "What is the engineers name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the engineers id?",
            name: "id",
        },
        {
            type: "input",
            message: "What is the engineers email?",
            name:"email"
        },
        {
            type: "input",
            message: "What is the engineers github username?",
            name: "github"
        }
    ]
    inquirer.prompt(questions).then(function(response){
        console.log(response);
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        teamMembers.push(engineer);
        theEmployee();
    });
}

function theIntern(){
    const questions = [
        {
            type: "input",
            message: "What is the interns name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the interns id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the interns email?",
            name: "email"
        },
        {
            type: "input",
            message: "Which college did the intern go to?",
            name: "school"
        }
    ]
    inquirer.prompt(questions).then(function(response){
        console.log(response);
        const intern = new Intern(response.name, response.id, response.email, response.school);
        teamMembers.push(intern);
        theEmployee();
    })
}

theManager();













// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```