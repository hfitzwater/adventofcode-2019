
const fs = require('fs');

const modules = fs.readFileSync('./input').toString().split('\n');

const total = modules.reduce((prev, curr) => {
    const fuel = fuelForMass(curr);
    return prev + fuel + fuelForFuel( fuel );
}, 0 );

console.log( total );

function fuelForMass( mass ) {
    return Math.floor(Number(mass) / 3) - 2;
}

function fuelForFuel( fuel ) {
    let sum = 0;
    let diff = fuel;

    do {
        diff = fuelForMass( diff );
        if( diff > 0 ) {
            sum += diff;
        }
    } while( diff > 0 );

    return sum;
}