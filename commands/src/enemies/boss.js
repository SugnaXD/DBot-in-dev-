const Enemy = require('./enemy');

class Boss extends Enemy {
  constructor(name, health, damage, loot, bossArmor) {
    super(name, health, damage);
    this.loot = loot;
    this.bossArmor = bossArmor;
  }

  dropLoot() {
    console.log(`${this.name} dropped ${this.loot}!`);
    // Logic for the boss's loot drop
  }

  dropArmor(player) {
    // Generate a random armor amount between 10 and 30
    const armorAmount = Math.floor(Math.random() * 21) + 10;

    // Increase the player's health by the armor amount
    player.increaseHealth(armorAmount);

    // Print a message to the console indicating that armor was dropped and the player's health was increased
    console.log(`${this.name} dropped armor. ${player.name} gained ${armorAmount} health.`);
  }
}

module.exports = Boss;