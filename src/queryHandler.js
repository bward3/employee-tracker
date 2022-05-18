const cTable = require('console.table');
const db = require('../cfg/connection');

module.exports = {
    // View all employees
    viewEmployees: async () => {
        const results = await db.promise().query(`SELECT a.id, CONCAT( a.first_name, ' ', a.last_name ) AS "name", title, dept_name AS department,salary, CONCAT( b.first_name, ' ', b.last_name ) AS manager FROM employees a LEFT JOIN employees b ON b.id = a.manager_id, roles LEFT JOIN departments ON roles.department_id = departments.id WHERE a.role_id = roles.id;`);
        return results[0];
    },
    // Add employee
    addEmployee: async (first_name, last_name, role_id, manager_id) => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES ("${first_name}", "${last_name}", ${role_id}, ${manager_id});`;
        const results = await db.promise().query(sql);
        return results[0];
    },
    // Update employee role
    updateEmployeeRole: async (id, role_id) => {
        const results = await db.promise().query(`UPDATE employees SET role_id = ? WHERE id = ?`, [role_id, id]);
        return results[0];
    },
    // View all roles
    viewRoles: async () => {
        const results =
            await db.promise().query(`SELECT roles.id, title, dept_name, salary FROM roles, departments WHERE roles.department_id = departments.id ORDER BY id;`);
        return results[0];
    },
    // Add role
    addRole: async (title, salary, department_id) => {
        const results = await db.promise().query(`INSERT INTO roles (title, salary, department_id)
    VALUES ("${title}", ${salary}, ${department_id});`);
        return results[0];
    },
    // Add department
    addDept: async (dept_name) => {
        const results = await db.promise().query(`INSERT INTO departments (dept_name)
    VALUES ("${dept_name}");`);
        return results[0];
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