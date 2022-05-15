const qh = require('./src/queryHandler');

qh.getEmployees()
    .then(results => {
        console.log(results);
    }).catch(err => {
        console.log(err);
    });