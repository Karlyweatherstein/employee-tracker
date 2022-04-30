const express = require('express');
const inquirer = require('inquirer');
const prompts = require('prompts');
const { start } = require('repl');
const db = require('./db/connection');
const router = express.Router();



const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




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

// View all departments

function viewDepartments() {
        const sql = `SELECT * FROM department`;
      
        db.query(sql, (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          console.table(rows)
    });
    
}

function viewRoles() {
    console.log('this also worked!')
}




prompt()


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

