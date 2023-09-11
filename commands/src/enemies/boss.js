const Enemy = require('./enemy');

class Boss extends Enemy {
  constructor(name, health, damage, loot, bossArmor) {
    super(name, health, damage);
    this.loot = loot;
    this.bossArmor = bossArmor;
  }

  dropLoot() {
    console.log(`${this.name} dropped ${this.loot}!`);
  }

  dropArmor(player) {
    const armorAmount = Math.floor(Math.random() * 21) + 10;

    player.increaseHealth(armorAmount);

    console.log(`${this.name} dropped armor. ${player.name} gained ${armorAmount} health.`);
  }
}

module.exports = Boss;