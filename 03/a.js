const fs = require('fs');
const Breadboard = require('./breadboard');

const wires = fs.readFileSync('./input')
  .toString()
  .split('\n')
  .map( w => {
    return w.split(',')
      .map( p => {
        return {
          dir: p[0],
          len: Number(p.substring(1))
        };
      });
  });

let board = new Breadboard( wires );

console.log( board.getIntersections() );

