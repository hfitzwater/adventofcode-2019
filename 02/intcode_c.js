const OP_CODES = {
  ADD: 1,
  MUL: 2,
  FIN: 99
};

module.exports = class IntcodeCompiler {
  constructor( instructions ) {
    this.instructions = instructions;

    return this;
  }

  loadMemory( instructions=this.instructions, noun=12, verb=2 ) {
    this.memory = instructions.map((i,index) => {
      if( index === 1 ) return noun;
      if( index === 2 ) return verb;

      return i;
    });

    return this;
  }

  run() {
    const chunks = chunk(this.memory);

    let output = null;
    chunks.forEach( chunk => {
      const opcode = chunk[0];
      if( opcode === OP_CODES.FIN ) {
        output = this.memory[0];
      } else if( opcode === OP_CODES.ADD ) {
        this.memory[chunk[3]] = this.memory[chunk[1]] + this.memory[chunk[2]];
      } else if( opcode === OP_CODES.MUL ) {
        this.memory[chunk[3]] = this.memory[chunk[1]] * this.memory[chunk[2]];
      }
    });

    return output;
  }
}

function chunk( data, chunkSize=4 ) {
  const items = data.map(i => i);
  const chunks = [];
  let chunk = [];

  while( items.length >= chunkSize ) {
    for(let i=0; i<chunkSize; i++) {
      const item = items.shift();
      chunk.push(item);
    }
    chunks.push(chunk);
    chunk = [];
  }

  return chunks;
}