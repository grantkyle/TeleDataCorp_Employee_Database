const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 4200,
    user: "root",
    password: "BARNABy1991",
    database: "employee_cms",
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

function start() {
    inquirer
        .prompt(
            {
                name: "options",
                type: "list",
                message: "What would you like to do?",
                choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager",
                    "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"]
            }
        )
        .then(function (answer) {
            // There will be a huge boo-lay-yawn to contain the user response
            switch (answer.options) {
                case "View All Employees": viewAllEmployees();
                case "View All Employees by Department": viewEmployeesByDepartment();
                case "View All Employees by Manager": viewEmployeesByManager();
                case "Add Employee": addEmployee();
                case "Remove Employee": removeEmployee();
                case "Update Employee Role": updateEmployeeRole();
                case "Update Employee Manager": updateEmployeeManager();
                default: connection.end();
            }
        });
}

function viewAllEmployees();
function viewEmployeesByDepartment();
function viewEmployeesByManager();
function addEmployee();
function removeEmployee();
function updateEmployeeRole();
function updateEmployeeManager();
function end();