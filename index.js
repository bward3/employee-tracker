const { init } = require("./src/questions");
const figlet = require('figlet');

console.log("\n\n\n");
console.log(figlet.textSync('\n\nEmployee Manager\n\n', {
    font: 'Big Money-ne',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 100,
    whitespaceBreak: true
}));
console.log("\n\n\n");

init();