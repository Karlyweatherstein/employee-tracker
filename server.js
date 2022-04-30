const express = require('express');
const inquirer = require('inquirer');
const db = require('./db/connection');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)


app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
});

//THEN I am presented with the following options: view all departments, view all roles, view all employees, 
// add a department, add a role, add an employee, and update an employee role

const directory = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ]
    }
]

// ======== Prompt ========
function prompt() {
    inquirer.prompt(directory)
        .then(function(val) {
            if (val.options === 'View all departments') {
                viewDepartments();
            } else if (val.options === 'View all roles') {
                viewRoles();
            } else if (val.options === 'View all employees') {
                viewEmployees();
            } else if (val.options === 'Add a department') {
                addDepartment();
            } else if (val.options === 'Add a role') {
                addRole();
            } else if (val.options === 'Add an employee') {
                addEmployee();
            } else if (val.options === 'Update an employee role') {
                updateEmployee();
            }
        })
}


app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

