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
                updateEmployeeRole();
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
            db.query(roleSql, (err, row) => {
                if (err) throw err;
                let newId = row.map(newIdHere => newIdHere.id);
                addToRole(answer.roleName, answer.salaryAmount, newId[0])
            });
            prompt();
        });
};

// Add an employee
function addEmployee() {
    const sql =`SELECT * FROM role`;
    let roleArr = [];
    db.query(sql, (err, rows) => {
        if (err) throw err;
        for (let i=0; i<rows.length; i++){
            roleArr.push(rows[i].title);
        }
    });
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
            type: 'list',
            name: 'employeesRole',
            message: 'What is the employees role?',
            choices: roleArr
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Who is the employees manager(Enter their ID - "1" or "2")?'
        }
    ]) 
    .then((answer) => {
        const empSql = `SELECT id FROM role WHERE title = "${answer.employeesRole}"`
        db.query(empSql, (err, row) => { 
            if (err) throw err;
            let newId = row.map(newIdHere => newIdHere.id);
            addToEmployee(answer.first_name, answer.last_name, newId, answer.managerId)
        });
        prompt();

   })
};

// Update an employees role
function updateEmployeeRole() {
    const sql = `SELECT first_name, last_name, role.title 
    FROM employee, role
    WHERE employee.role_id = role.id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        const allEmployees = rows;
        let f_Name = allEmployees.map(emp => `${emp.first_name}`);
        let l_Name = allEmployees.map(emp => `${emp.last_name}`);
        const roleArray = allEmployees.map(emp => `${emp.title}`);
        let allRoles = roleArray.filter((roles, index) => {
            return roleArray.indexOf(roles) === index;
        });
        inquirer.prompt([
            {
                type: 'list',
                name: 'f_name',
                message: 'What is the employees first name that you wish to update?',
                choices: f_Name
            },
            {
                type: 'list',
                name: 'l_name',
                message: 'What is the employees last name that you wish to update?',
                choices: l_Name
            },
            {
                type: 'list',
                name: 'employeeRole',
                message: 'What is the employees new role?',
                choices: allRoles
            }
        ]) 
        .then((answer) => {
            const upSql = `SELECT id FROM role WHERE title = "${answer.employeeRole}"`
            db.query(upSql, (err, row) => { 
                if (err) throw err;
                let newId = row.map(newIdHere => newIdHere.id);
                updateEmpRole(answer.f_name, answer.l_name, newId)
            });
            prompt();
       })
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
function addToEmployee (firstName, lastName, roleId, managerId) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${roleId}", "${managerId}")`
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('Added employee to database!');
    })
};


//Function that updates the employees role in the employee table
function updateEmpRole (f_name, l_name, roleId) {
    const sql = `UPDATE employee SET role_id = "${roleId}" WHERE first_name = "${f_name}" AND last_name = "${l_name}"`
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('Updated employee role in database!');
    })

};



prompt()


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

