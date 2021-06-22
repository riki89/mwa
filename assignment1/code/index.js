const childProcess = require("child_process");

console.log("a");

const newProcess = childProcess.spawn(
    "node",
    ["computation/fib.js"], {stdio: 'inherit'}
)
console.log("b");