const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table")
let roleList = [];

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
function viewAllEmployees() {
    console.log("view employees")
    connection.query("SELECT * FROM department",
        (err, data) => {
            console.log("err", err)
            console.table(data)
            start()
        })
};

// View Employees by Department
function viewEmployeesByDepartment() {
    console.log("view employees by department")
    connection.query(
        "SELECT NAME FROM department", (err, data) => {
            const deptNames = []
            data.forEach(item => {
                deptNames.push(item.NAME)
            })
            // console.log(data)
            inquirer.prompt({
                type: "list",
                choices: deptNames,
                name: "Department",
                message:
                    "Choose a Department"
            })
                .then(function (answer) {
                    let choice = ''
                    //   console.log(answer)
                    switch (answer.Department) {
                        case "Management": choice = 1;
                            break;
                        case "Cubicle Rats": choice = 2;
                            break;
                        case "Karens": choice = 3;
                            break;
                        case "Toilet Cleaners": choice = 4;
                            break;
                    }
                    connection.query(`SELECT * FROM employee WHERE role_id = ${choice}`, (err, data) => {
                        // console.log("err",err)
                        console.table(data)
                        start()
                    })
                })
        })
};

// View Employees by Manager
function viewEmployeesByManager() {
    console.log("view employees by manager")
    connection.query("SELECT * FROM employee WHERE role_id = 1", (err, data) => {
        // console.log(data);
        const mgmtNames = []
        data.forEach(item => {
            mgmtNames.push(`${item.first_name}`)
        })
        // console.log(mgmtNames);
        inquirer.prompt({
            type: "list",
            choices: mgmtNames,
            name: "Manager",
            message:
                "Choose a Manager"
        })
            .then(function (answer) {
                // User's answer choice
                const userChoice = answer.Manager
                // Manager's ID getting found and chosen
                let managerID;
                // data coming from original query
                data.forEach(Manager => {
                    if (Manager.first_name === userChoice) {
                        managerID = Manager.id
                    }
                })
                connection.query(`SELECT * FROM employee WHERE manager_id = ${managerID}`, (err, data) => {
                    // console.log("err",err)
                    console.table(data)
                    start()
                })
            })

        // console.log(answer)


    })
};

// Add Employee to Database
function addEmployee() {
    // inquirer
    //     .prompt([
    //         {
    //             name: "firstName",
    //             type: "input",
    //             message: "What is the first name of the employee you want to add?"
    //         },
    //         {
    //             name: "lastName",
    //             type: "input",
    //             message: "What is the last name of the employee you want to add?"
    //         },
    //     {
    //             name: "role",
    //             type: "list",
    //             message: "What is the role of the employee you want to add?",
    //             choice: "options"
    //         }
    //     ])
    console.log("add employee")
};

// Remove Employee from Database
function removeEmployee() {
    console.log("remove employee")
};

// Update Employee Role
function updateEmployeeRole() {
    console.log("update employee role")
};

// Update Employee Manager
function updateEmployeeManager() {
    console.log("update employee manager")
};

// End Process
function end() {
    console.log("end connection")
};