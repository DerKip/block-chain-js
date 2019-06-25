const SHA256 = require('crypto-js/sha256');
class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash;
  }
  calculateHash() {
    return SHA256(
      this.index +
        this.timestamp +
        this.previousHash +
        JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, '21/06/2019', 'Genesis block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      let currentBlock = this.chain[i];
      let previousBlock = this.chain[i - 1];
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (previousBlock.hash !== currentBlock.previousHash) {
        return false;
      }
    }
    return true;
  }
}

let derkCoin = new Blockchain();
derkCoin.addBlock(new Block(1, '21/06/2019', { amount: 12 }));
derkCoin.addBlock(new Block(2, '21/06/2019', { amount: 0 }));
derkCoin.addBlock(new Block(3, '21/06/2019', { amount: 42 }));

console.log(JSON.stringify(derkCoin, null, '\t'));
console.log('Is blockchain valid ?', derkCoin.isChainValid());
