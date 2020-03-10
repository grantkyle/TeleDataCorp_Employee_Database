const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table")
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
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
                    "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "Exit"]
            }
        )
        .then(function (answer) {
            // There will be a huge case, switch to contain the user response
            switch (answer.options) {
                case "View All Employees": viewAllEmployees()
                break;
                case "View All Employees by Department": viewEmployeesByDepartment();
                break;
                case "View All Employees by Manager": viewEmployeesByManager();
                break;
                case "Add Employee": addEmployee();
                break;
                case "Remove Employee": removeEmployee();
                break;
                case "Update Employee Role": updateEmployeeRole();
                break;
                case "Update Employee Manager": updateEmployeeManager();
                break;
                default: connection.end();
                console.log("Exit process");
                break;
            }
        });
}
// View all Employees
function viewAllEmployees(){
    console.log("view employees")
    connection.query("SELECT * FROM employee", (err,data)=>{
        //console.log("err",err)
        console.table(data)
        start()
    })
};

// View Employees by Department
function viewEmployeesByDepartment(){
   // console.log("view employees by department")
    connection.query("SELECT name FROM department", (err,data) =>{
        const deptNames = data
        inquirer.prompt({
            type: "list",
            choices: deptNames,
            name: "View Employees by Department",
            message: 
            "Choose a Department"
        })
        .then(function(answer){
       //   console.log(answer.view)
            connection.query("SELECT * FROM employee WHERE department_id", (err,data)=>{
               // console.log("err",err)
                console.table(data)
                start()
            })
        })
    })
};

// View Employees by Manager
function viewEmployeesByManager(){
    console.log("view employees by manager")
    connection.query("SELECT name FROM department", (err,data) =>{
        const mgmtNames = data
        inquirer.prompt({
            type: "list",
            choices: mgmtNames,
            name: "View Employees by Manager",
            message: 
            "Choose a Manager"
        })
        .then(function(answer){
       //   console.log(answer.view)
            connection.query("SELECT * FROM employee WHERE manager_id", (err,data)=>{
               // console.log("err",err)
                console.table(data)
                start()
            })
        })
    })
};

// Add Employee to Database
function addEmployee(){
    console.log("add employee")
};

// Remove Employee from Database
function removeEmployee(){
    console.log("remove employee")
};

// Update Employee Role
function updateEmployeeRole(){
    console.log("update employee role")
};

// Update Employee Manager
function updateEmployeeManager(){
    console.log("update employee manager")
};

// End Process
function end(){
    console.log("end connection")
};