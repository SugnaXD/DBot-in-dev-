const Enemy = require('./enemy');

class Boss extends Enemy {
  constructor(name, health, attack, specialAbility) {
    super(name, health, attack);
    this.specialAbility = specialAbility;
  }

  useSpecialAbility() {
    console.log(`${this.name} uses ${this.specialAbility}!`);
    // Logic for the boss's special ability
  }
}

module.exports = Boss;