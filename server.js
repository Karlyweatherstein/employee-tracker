const express = require('express');
const inquirer = require('inquirer');
const db = require('./db/connection');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// List of options to choose from
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
};

// View all departments
function viewDepartments() {
        const sql = `SELECT * FROM department`;
      
        db.query(sql, (err, rows) => {
          if (err) {
            throw err;
          }
          console.table(rows)
          prompt();
    });
};

// View all roles
function viewRoles() {
    const sql = `SELECT role.*, department.name AS department
    FROM role 
    LEFT JOIN department ON role.department_id = department.id`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      console.table(rows)
      prompt();

    });
};

// View all employees
function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title, role.salary 
     FROM employee, role, department
     WHERE department.id = role.department_id
     AND role.id = employee.role_id
    `  
    db.query(sql, (err, rows) => {
      if (err) {
        throw err;
        
      }
      console.table(rows)
      prompt();

    });
};


// Add a department
function addDepartment() {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?'
        }
    ])   
    .then((answer) => {
         db.query(sql, answer.departmentName, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('Added department to database!')
        prompt();
        });
    })
   
};

// Add a role
function addRole() {
    const sql = `SELECT * FROM department`;
    let deptArr = [];
    db.query(sql, (err, rows)=>{
        if (err) throw err;
        for (let i=0; i<rows.length; i++){
            deptArr.push(rows[i].name);
        }
    });
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?',
                
            },
            {
                type: 'input',
                name: 'salaryAmount',
                message: 'What is the salary of the role?',
                
            },
            {
                type: 'list',
                name: 'deptName',
                message: 'Which department does the role belong to?',
                choices: deptArr
            }
        ])
        .then((answer) => {
            const roleSql = `SELECT id FROM department WHERE name = "${answer.deptName}"`
            db.query(roleSql, (err, row)=>{
                if (err) throw err;
                let newId = row.map(newIdHere => newIdHere.id);
                addToRole(answer.roleName, answer.salaryAmount, newId[0])
            });
            prompt();
        });
};

// Add an employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?'
        },
        {
            type: 'input',
            name: 'employeesRole',
            message: 'What is the employees role?'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Who is the employees manager?'
        }
    ]) 
    .then((answer) => {
        db.query(sql, answer.departmentName, (err, rows) => {
       if (err) {
         res.status(404).json({ error: err.message });
         return;
       }
       console.log('Added department to database!')
       prompt();
       });
   })
};

// Function that adds the responses into the role table
function addToRole (title, salary, id) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${id}")`
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('Added department to database!');
        
    });
};


//Function that adds the responses into the employee table
function addToEmployee () {

};





prompt()


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

