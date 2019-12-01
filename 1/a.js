
const fs = require('fs');

const modules = fs.readFileSync('./input').toString().split('\n');

const total = modules.reduce((prev, curr) => {
    const fuel = Math.floor(Number(curr) / 3) - 2;
    return prev + fuel;
}, 0 );

console.log( total );