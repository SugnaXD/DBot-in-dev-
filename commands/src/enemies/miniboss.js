const Enemy = require('./enemy');

class MiniBoss extends Enemy {
  constructor(name, health, attack, loot) {
    super(name, health, attack);
    this.loot = loot;
  }

  dropLoot() {
    console.log(`${this.name} dropped ${this.loot}!`);
    // Logic for the mini boss's loot drop
  }
}

module.exports = MiniBoss;