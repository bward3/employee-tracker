const cTable = require('console.table');
const mysql = require('mysql2');
const db = require('../cfg/connection');

// View all employees
const viewEmployees = () => {
    db.query(
`SELECT a.id, CONCAT( a.first_name, ' ', a.last_name ) AS "name", title, dept_name AS department,salary, CONCAT( b.first_name, ' ', b.last_name ) AS manager FROM employees a LEFT JOIN employees b ON b.id = a.manager_id, roles LEFT JOIN departments ON roles.department_id = departments.id WHERE a.role_id = roles.id;`,
     (err, results) => {
        if (err) {
            console.log(error);
        } else {
            console.table(results);
        }
    });
}
// Add employee
const addEmployee = (id, first_name, last_name, role_id, manager_id) => {
    db.query(`INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
    VALUES (${id}, ${first_name}, ${last_name}, ${role_id}, ${manager_id});`, (err, results) => {
        if (err) {
            console.log(error);
        } else {
            console.table(results);
        }
    });
}
// Update employee role
const updateEmployeeRole = (id, role_id) => {
    db.query(`UPDATE employees SET role_id = ? WHERE id = ?`, [role_id, id], (err, results) => {
        if (err) {
            console.log(error);
        } else {
            console.table(results);
        }
    });
}
// View all roles
const viewRoles = () => {
    db.query(`SELECT roles.id, title, dept_name, salary FROM roles, departments WHERE roles.department_id = departments.id ORDER BY id;`, (err, results) => {
        if (err) {
            console.log(error);
        } else {
            console.table(results);
        }
    });
}
// Add role
const addRole = (id, title, salary, department_id) => {
    db.query(`INSERT INTO roles (id, title, salary, department_id)
    VALUES (${id}, ${title}, ${salary}, ${department_id});`, (err, results) => {
        if (err) {
            console.log(error);
        } else {
            console.table(results);
        }
    });
}
// View all departments
const viewDepts = () => {
    db.query(`SELECT * FROM departments;`, (err, results) => {
        if (err) {
            console.log(error);
        } else {
            console.table(results);
        }
    });
}
// Add department
const addDept = (id, dept_name) => {
    db.query(`INSERT INTO departments (id, dept_name)
    VALUES (${id}, ${dept_name});`, (err, results) => {
        if (err) {
            console.log(error);
        } else {
            console.table(results);
        }
    });
}

viewEmployees();
viewRoles();
viewDepts();