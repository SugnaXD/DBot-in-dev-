const Enemy = require('./enemy.js');

class MiniBoss extends Enemy {
  constructor(name, health, damage, loot, minibossArmor) {
    super(name, health, damage);
    this.loot = loot;
    this.minibossArmor = minibossArmor;
  }

  dropLoot() {
    console.log(`${this.name} dropped ${this.loot}!`);
  }

  dropArmor(player) {
    // Generate a random armor amount between 5 and 20
    const armorAmount = Math.floor(Math.random() * 16) + 5;

    // Increase the player's health by the armor amount
    player.increaseHealth(armorAmount);

    // Print a message to the console indicating that armor was dropped and the player's health was increased
    console.log(`${this.name} dropped armor. ${player.name} gained ${armorAmount} health.`);
  }
}

module.exports = MiniBoss;  