const centralPortCoors = [1,1];
const DIRECTION = { UP: 'U', LEFT: 'L', RIGHT: 'R', DOWN: 'D' };

module.exports = class Breadboard {
  constructor( wires ) {
    this.intersections = [];
    this.board = {};
    this.wires = wires.map(w => {
      w.distanceTraveled = 0;
      w.distances = {};
      return w;
    });

    wires.forEach( (wire, wireIndex) => {
      this.lastLoc = centralPortCoors;
      this.addWire( wire, wireIndex );
    });
  }

  shortInt() {
    this.intersections = this.getIntersections();

    this.wires.forEach((wire, wireIndex) => {
      this.lastLoc = centralPortCoors;
      this.addWire( wire, wireIndex );
    });

    let sums = [];
    this.intersections.forEach( inter => {
      const dist0 = this.wires[0].distances[`${inter[0]},${inter[1]}`][0];
      const dist1 = this.wires[1].distances[`${inter[0]},${inter[1]}`][0];

      sums.push( dist0 + dist1);
    });

    console.log(sums.sort((a,b) => a-b));
  }

  addWire( wire, wireIndex ) {
    this.wires[wireIndex].distanceTraveled = 0;

    wire.forEach((section) => {
      this.addWireSection( this.lastLoc, section, wireIndex );
    });
  }

  addWireSection( startCoords, wireSection, wireIndex ) {
    let startX = startCoords[0];
    let startY = startCoords[1];

    if( wireSection.dir === DIRECTION.UP ) {
      for(let y=startY+1; y<=startY + wireSection.len; y++ ) {
        this.setLoc( startX, y, wireIndex );
      }
    } else if( wireSection.dir === DIRECTION.DOWN ) {
      for(let y=1; y<=wireSection.len; y++ ) {
        this.setLoc( startX, startY - y, wireIndex );
      }
    } else if( wireSection.dir === DIRECTION.RIGHT ) {
      for(let x=startX+1; x<=startX + wireSection.len; x++ ) {
        this.setLoc( x, startY, wireIndex );
      }
    } else if( wireSection.dir === DIRECTION.LEFT ) {
      for(let x=1; x<=wireSection.len; x++ ) {
        this.setLoc( startX - x, startY, wireIndex );
      }
    }
  }

  setLoc( x, y, wireIndex ) {
    const key = `${x},${y}`;
    const curr = this.board[key];

    this.wires[wireIndex].distanceTraveled += 1;

    if( curr === null || curr === undefined ) {
      this.board[key] = [];
    }
    
    this.board[key].push( wireIndex );

    if( this.intersections ) {
      this.intersections.forEach( inter => {
        if( inter[0] === x && inter[1] === y ) {
          if( !this.wires[wireIndex].distances[key] ) {
            this.wires[wireIndex].distances[key] = [];
          }

          this.wires[wireIndex].distances[key].push(this.wires[wireIndex].distanceTraveled);
        }
      });
    }

    this.lastLoc = [x,y];
  }

  getIntersections() {
    const intersections = [];

    Object.keys( this.board ).forEach( key => {
        const hasWire0 = this.board[key].includes(0);
        const hasWire1 = this.board[key].includes(1);

        if( hasWire0 && hasWire1 ) {
            const coordStrVals = key.split(',');
            intersections.push([
              Number(coordStrVals[0]),
              Number(coordStrVals[1])
            ]);
        }
    })
    
    return intersections.map(i => {
      i.dist = this.manhattanDist(centralPortCoors, i);
      return i;
    }).sort((a,b) => {
      return a.dist-b.dist;
    });
  }

  manhattanDist( from, to ) {
    return Math.abs(to[1] - from[1]) + Math.abs(to[0] - from[0]);
  }
};