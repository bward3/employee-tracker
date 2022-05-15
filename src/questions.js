const inquirer = require('inquirer');
const db = require('../cfg/connection');
const qh = require('../src/queryHandler');

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
    inquirer.prompt(question).then((ans) => {
        switch (ans.option) {
            case 'View All Employees':
                qh.viewEmployees();
                break;
            case 'Add Employee':
                console.log('yo', ans.option);
                break;
            case 'Update Employee Role':
                console.log('yo', ans.option);
                break;
            case 'View All Roles':
                qh.viewRoles();
                break;
            case 'Add Role':
                console.log('yo', ans.option);
                break;
            case 'View All Departments':
                qh.viewDepts();
                break;
            case 'Add Department':
                console.log('yo', ans.option);
                break;
            case 'Quit':
                db.end();
                break;
        }
    }).catch((err) => {
        console.log(err);
    });
}

mainMenu();