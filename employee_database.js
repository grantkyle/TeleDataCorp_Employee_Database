const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table")
let titleList = [];
let managerList = [];

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
                choices: ["View All Employees", "View Departments", "View Employees by Manager", "View Roles",
                    "Add Employee", "Add Department", "Add Role", "Update Employee Role", "Exit"]
            }
        )
        .then(function (answer) {
            // There will be a huge case, switch to contain the user response
            switch (answer.options) {
                case "View All Employees": viewAllEmployees()
                    break;
                case "View Departments": viewDepartments();
                    break;
                case "View Employees by Manager": viewEmployeesByManager();
                    break;
                case "View Roles": viewRoles();
                    break;
                case "Add Employee": addEmployee();
                    break;
                case "Add Department": addDepartment();
                    break;
                case "Add Role": addRole();
                    break;
                case "Update Employee Role": updateEmployeeRole();
                    break;
                default: connection.end();
                    break;
            }
        });
}
// View all Employees
function viewAllEmployees() {
    // console.log("view employees")
    connection.query(`SELECT employee.id,employee.first_name,employee.last_name 
    ,role.title,role.salary ,department.name department,
    concat(employee2.first_name," ", employee2.last_name) manager
    FROM employee 
    LEFT JOIN role on employee.role_id=role.id
    LEFT JOIN employee employee2 on employee.manager_id=employee2.id
    LEFT JOIN department on department.id=role.department_id
    `,
        (err, data) => {
            console.log("err", err)
            console.table(data)
            start()
        })
};

// View Departments

function viewDepartments() {
    connection.query("SELECT name FROM department", function (err, res) {
        if (err) throw err;
        console.table(res)
    })

    start()
}
// View Employees by Manager
function viewEmployeesByManager() {
    // console.log("view employees by manager")
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
    })
};

// View Roles
function viewRoles() {
    connection.query("SELECT title FROM role", function (err, res) {
        if (err) throw err;
        console.table(res)
    })

    start()
}

// Add Employee to Database
function managerOption() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM employee WHERE manager_id IS NOT NULL", function (err, data) {
            if (err) throw err;
            resolve(data);
        });
    });
}

function roleOption() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM role", function (err, data) {
            if (err) throw err;
            resolve(data);
        });
    })
}

function addEmployee() {

    roleOption().then(function (titles) {
        titleList = titles.map(role => role.title);

        managerOption().then(function (manager) {

            managerList = manager.map(item => item.first_name + " " + item.last_name);

            inquirer
                .prompt([
                    {
                        name: "firstName",
                        type: "input",
                        message: "What is the employee's first name?"
                    },
                    {
                        name: "lastName",
                        type: "input",
                        message: "What is the employee's last name?"

                    },
                    {
                        name: "role",
                        type: "list",
                        message: "What is the employee's role?",
                        choices: titleList
                    },
                    {
                        name: "manager",
                        type: "list",
                        message: "Who is the employee manager?",
                        choices: managerList
                    }])
                .then(function (input) {

                    const mySeelectedRole = titles.find(item => item.title === input.role);
                    const mySelectedManager = manager.find(item => (item.first_name + " " + item.last_name) === input.manager);
                    console.log(mySelectedManager.manager_id)
                    connection.query(`INSERT INTO employee(first_name, last_name, role_id,manager_id) VALUES ("${input.firstName}", "${input.lastName}", ${mySeelectedRole.id}, "${mySelectedManager.id}")`,
                        function (err, res) {
                            if (err) throw err;
                        }
                    );
                    start();
                });
        });
    });

}

// Add Department
function addDepartment() {
    inquirer.prompt([{
        name: "department",
        type: "input",
        message: "What department would you like to add?"
    }])
        .then(function (input) {
            connection.query(`INSERT INTO department (name) VALUES("${input.department}")`, function (err, res) {
                if (err) throw err;
                console.table(viewDepartments());
                start();
            })
        })
    // console.log("add department")
};

// Add Role
function addRole() {
    inquirer.prompt([{
        name: "role",
        type: "input",
        message: "What role would you like to add?"
    }])
        .then(function (input) {
            connection.query(`INSERT INTO role (title) VALUES("${input.role}")`, function (err, res) {
                if (err) throw err;
                console.table(viewRoles());
                start();
            })
        })
}

// Update Employee Role
function employeeChoose() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT first_name, last_name FROM employee`, function (err, data) {
            if (err) throw err;
            // console.log(data);
            resolve(data);
        });
    });
}

function updateEmployeeRole() {
    let employeeList = [];

    employeeChoose().then(function (employees) {
        employeeList = employees.map(employee => employee.first_name)
        roleOption().then(function (titles) {
            titleList = titles.map(role => role.title);

            inquirer.prompt([{
                name: "pickEmployee",
                type: "list",
                message: "Which employee do you want to update?",
                choices: employeeList
            },
            {
                name: "updateTitle",
                type: "list",
                message: "What is the employee's new title?",
                choices: titleList
            }
            ]).then(function (input) {
                connection.query(`INSERT INTO role (title) VALUE("${input.updateTitle}")`, function (err, res) {
                    if (err) throw err;

                })
                start();
            })

        })
    })
};