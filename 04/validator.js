
const doubles = ['11','22','33','44','55','66','77','88','99'];
const triples = ['111','222','333','444','555','666','777','888','999'];

module.exports = class Validator {
  static twoAdjacentSame( val ) {
    const str = val.toString().split('');
    
    let foundAdjacent = false;
    str.forEach((char, index) => {
      if( index < str.length && char === str[index+1] ) {
        foundAdjacent = true;
      }
    });

    return foundAdjacent;
  }

  static neverDecrease( val ) {
    let decreases = false;
    
    val.toString().split('').reduce((prev,curr) => {
      prev = Number(prev);
      curr = Number(curr);

      if( curr < prev ) {
        decreases = true;
      }

      return curr;
    }, -1);

    return !decreases;
  }

  static twoNoLargerGroup( val ) {
    const allTriples = triples.map( t => {
      if( val.toString().indexOf( t ) !== -1 ) {
        return t[0]
      };
    }).filter( i => i !== undefined );

    const allDoubles = doubles.map( d => {
      if( val.toString().indexOf( d ) !== -1 ) {
        return d[0];
      }
    }).filter( i => i !== undefined );

    allTriples.forEach( t => {
      if( allDoubles.includes(t) ) {
        allDoubles.splice( allDoubles.indexOf(t), 1 );
      }
    });

    if( allDoubles.length === 0 ) {
      return false;
    }

    return true;
  }
};