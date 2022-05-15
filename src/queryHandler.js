const cTable = require('console.table');
const db = require('../cfg/connection');

module.exports = {
    // View all employees
    viewEmployees: () => {
        db.query(
            `SELECT a.id, CONCAT( a.first_name, ' ', a.last_name ) AS "name", title, dept_name AS department,salary, CONCAT( b.first_name, ' ', b.last_name ) AS manager FROM employees a LEFT JOIN employees b ON b.id = a.manager_id, roles LEFT JOIN departments ON roles.department_id = departments.id WHERE a.role_id = roles.id;`,
            (err, results) => {
                if (err) {
                    console.log(error);
                } else {
                    console.table(results);
                }
            });
    },
    // Add employee
    addEmployee: (first_name, last_name, role_id, manager_id) => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (${first_name}, ${last_name}, ${role_id}, ${manager_id});`, (err, results) => {
            if (err) {
                console.log(error);
            } else {
                console.table(results);
            }
        });
    },
    // Update employee role
    updateEmployeeRole: (id, role_id) => {
        db.query(`UPDATE employees SET role_id = ? WHERE id = ?`, [role_id, id], (err, results) => {
            if (err) {
                console.log(error);
            } else {
                console.table(results);
            }
        });
    },
    // View all roles
    viewRoles: () => {
        db.query(`SELECT roles.id, title, dept_name, salary FROM roles, departments WHERE roles.department_id = departments.id ORDER BY id;`, (err, results) => {
            if (err) {
                console.log(error);
            } else {
                console.table(results);
            }
        });
    },
    // Add role
    addRole: (title, salary, department_id) => {
        db.query(`INSERT INTO roles (title, salary, department_id)
    VALUES (${title}, ${salary}, ${department_id});`, (err, results) => {
            if (err) {
                console.log(error);
            } else {
                console.table(results);
            }
        });
    },
    // View all departments
    viewDepts: () => {
        db.query(`SELECT * FROM departments;`, (err, results) => {
            if (err) {
                console.log(error);
            } else {
                console.table(results);
            }
        });
    },
    // Add department
    addDept: (dept_name) => {
        db.query(`INSERT INTO departments (dept_name)
    VALUES (${dept_name});`, (err, results) => {
            if (err) {
                console.log(error);
            } else {
                console.table(results);
            }
        });
    },
    getEmployees: async () => {
        const results = await db.promise().query(`SELECT * FROM employees;`);
        return results[0];
    },
    getDepts: async () => {
        const results = await db.promise().query(`SELECT * FROM departments;`);
        return results[0];
    },
    getRoles: async () => {
        const results = await db.promise().query(`SELECT * FROM roles;`);
        return results[0];
    }
}