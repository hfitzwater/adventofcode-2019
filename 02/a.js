const fs = require('fs');
const IntcodeCompiler = require('./intcode_c.js');

const ops = fs.readFileSync('./input').toString().split(',').map(i => Number(i));

const result = new IntcodeCompiler( ops )
  .loadMemory(ops, 12, 2)
  .run();

console.log( result );
