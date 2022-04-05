// External/outside
const minimist = require("minimist");

// Internal
const soma = require("./soma").soma;

// Terminal
const args = minimist(process.argv.slice(2));
const a = parseInt(args['a']);
const b = parseInt(args['b']);

soma(a, b);



// Example of how to run
// node index.js --a=5 --b=6