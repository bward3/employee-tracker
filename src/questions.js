const inquirer = require('inquirer');
const db = require('../cfg/connection');
const qh = require('../src/queryHandler');

const addDept = async () => {
    let results = await inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: 'What is the name of the department?',
        validate: function (value) {
            const re = /[^A-Za-z ]/;
            if (!re.test(value)) {
                return true;
            } else {
                return 'Please enter a valid name.';
            }
        }
    }]);
    qh.addDept(results.name);
    console.log(`\nDepartment "${results.name}" added.\n`)
}

const addRole = async () => {
    let deptTable = await qh.getDepts();
    let depts = deptTable.map((obj) => obj.dept_name);
    let questions = [{
            name: 'name',
            type: 'input',
            message: 'What is the name of the role?',
            validate: function (value) {
                const re = /[^A-Za-z ]/;
                if (!re.test(value)) {
                    return true;
                } else {
                    return 'Please enter a valid name.';
                }
            }
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the role?',
            validate: function (value) {
                let done = this.async();
                if (!isNaN(value)) {
                    done(true);
                    return;
                } else {
                    done('Please enter a valid salary number.');
                    return;
                }
            }
        },
        {
            name: 'dept',
            type: 'list',
            message: 'Which department does this role belong to?',
            choices: depts
        }
    ]
    let results = await inquirer.prompt(questions);
    depts = deptTable.filter((obj) => obj.title === questions.dept);
    let dept_id = depts[0].id;
    qh.addRole(results.name, results.salary, dept_id);
    console.log(`\nRole "${results.name}" added.\n`);
}

const addEmployee = async () => {
    let roleTable = await qh.getRoles();
    let roles = roleTable.map((obj) => obj.title);
    let employeesTable = await qh.getEmployees();
    let employees = employeesTable.map((obj) => `${obj.first_name} ${obj.last_name}`);
    employees.push('None');

    let questions = [{
            name: 'firstname',
            type: 'input',
            message: 'What is the employee\'s first name?',
            validate: function (value) {
                const re = /[^A-Za-z ]/;
                if (!re.test(value)) {
                    return true;
                } else {
                    return 'Please enter a valid name.';
                }
            }
        },
        {
            name: 'lastname',
            type: 'input',
            message: 'What is the employee\'s last name?',
            validate: function (value) {
                const re = /[^A-Za-z ]/;
                if (!re.test(value)) {
                    return true;
                } else {
                    return 'Please enter a valid name.';
                }
            }
        },
        {
            name: 'role',
            type: 'list',
            message: 'What is the employee\'s role?',
            choices: roles
        },
        {
            name: 'manager',
            type: 'list',
            message: 'Who is this employee\'s manager?',
            choices: employees
        }
    ];
    const results = await inquirer.prompt(questions);
    roles = roleTable.filter((obj) => obj.title === results.role);
    let role_id = roles[0].id;
    employees = employeesTable.filter((obj) => `${obj.first_name} ${obj.last_name}` === results.manager);
    let manager_id = employees[0] ? employees[0].id : 'null';
    qh.addEmployee(results.firstname, results.lastname, role_id, manager_id);
    console.log(`\n${results.firstname} ${results.lastname} added to company.\n`);
}

const updateEmployeeRole = async () => {
    let roleTable = await qh.getRoles();
    let roles = roleTable.map((obj) => obj.title);
    let employeesTable = await qh.getEmployees();
    let employees = employeesTable.map((obj) => `${obj.first_name} ${obj.last_name}`);

    let questions = [{
            name: 'employee',
            type: 'list',
            message: 'Whose role would you like to update?',
            choices: employees
        },
        {
            name: 'role',
            type: 'list',
            message: 'Which role would you like to assign to selected employee?',
            choices: roles
        }
    ];
    const results = await inquirer.prompt(questions);
    roles = roleTable.filter((obj) => obj.title === results.role);
    let role_id = roles[0].id;
    employees = employeesTable.filter((obj) => `${obj.first_name} ${obj.last_name}` === results.employee);
    let id = employees[0].id;
    qh.updateEmployeeRole(id, role_id);
    console.log(`\n${results.role} has now been assigned to ${results.employee}.\n`);
}

const mainMenu = async () => {
    const options = ['View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Quit'
    ];
    const question = [{
        name: 'option',
        type: 'list',
        message: 'What would you like to do?',
        choices: options
    }];
    const results = await inquirer.prompt(question);
    return results;
}

const init = async () => {
    let quit = false;
    while (!quit) {
        const results = await mainMenu();
        switch (results.option) {
            case 'View All Employees':
                let employees = await qh.viewEmployees();
                console.log('\n\n');
                console.table(employees);
                console.log('\n\n');
                break;
            case 'Add Employee':
                await addEmployee();
                break;
            case 'Update Employee Role':
                await updateEmployeeRole();
                break;
            case 'View All Roles':
                let roles = await qh.viewRoles();
                console.log('\n\n');
                console.table(roles);
                console.log('\n\n');
                break;
            case 'Add Role':
                await addRole();
                break;
            case 'View All Departments':
                let depts = await qh.getDepts();
                console.log('\n\n');
                console.table(depts);
                console.log('\n\n');
                break;
            case 'Add Department':
                await addDept();
                break;
            case 'Quit':
                db.end();
                quit = true;
                break;
        }
    }
}

exports.init = init;