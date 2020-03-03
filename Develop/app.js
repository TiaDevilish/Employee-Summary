const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");


teamMembers = [];

function appMenu(){

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
            console.log('response ' , response);
            if(response.employeeType == "Engineer"){
                theEngineer();
            }else if(response.employeeType == "Intern"){
                theIntern();
            }else {
                console.log('else if')
                buildTeam();
                
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

    function buildTeam(){
        console.log('team members ' , teamMembers)
        console.log('ender(teamMembers) ' , render(teamMembers))
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8")

    }
    
    theManager();
}


appMenu();

