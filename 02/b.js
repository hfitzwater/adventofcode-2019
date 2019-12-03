const fs = require('fs');
const IntcodeCompiler = require('./intcode_c.js');

const ops = fs.readFileSync('./input').toString().split(',').map(i => Number(i));
const compiler = new IntcodeCompiler( ops );
const TARGET = 19690720; // from problemset

for(let verb=1; verb<100; verb++) {
  for(let noun=1; noun<100; noun++) {
    const result = compiler.loadMemory(ops, noun, verb).run();
    if( result === TARGET ) {
      console.log( 100 * noun + verb );
      return;
    }
  }
}