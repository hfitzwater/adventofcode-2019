const Validator = require('./validator');

const input = {
  start: 137683,
  end: 596253
};

let validPWs = [];
for(let i=input.start; i<=input.end; i++ ) {
  if( Validator.twoAdjacentSame(i) && Validator.neverDecrease(i) ) {
    validPWs.push( i );
  }
}

console.log( validPWs.length );