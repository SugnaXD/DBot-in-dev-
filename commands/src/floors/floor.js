class Enemy {
  constructor(name, health, damage, xpGain) {
    this.name = name;
    this.health = health;
    this.damage = damage;
    this.xpGain = xpGain;
  }
  
  // Enemy class methods
}

class Floor {
  constructor(level, boss, miniboss) {
    this.level = level;
    this.boss = boss;
    this.miniboss = miniboss;
    this.enemies = [];
    this.generateEnemies();
  }

  generateEnemies() {
    // Generate regular enemies based on the floor level
    const numEnemies = this.level * 3; // Adjust the number of enemies as needed

    for (let i = 1; i <= numEnemies; i++) {
      const enemyName = `Enemy ${i}`;
      const enemyHealth = Math.floor(Math.random() * 50) + 50; // Random health between 50 and 100
      const enemyDamage = Math.floor(Math.random() * 10) + 10; // Random damage between 10 and 20
      const xpGain = Math.floor(Math.random() * 20) + 20; // Random XP gain between 20 and 40
      const enemy = new Enemy(enemyName, enemyHealth, enemyDamage, xpGain);
      this.enemies.push(enemy);
    }
  }

  fightBoss() {
    console.log(`Fighting boss on floor ${this.level}...`);
    this.boss.useSpecialAbility();
    // Logic for fighting the boss
  }

  fightMiniBoss() {
    console.log(`Fighting mini-boss on floor ${this.level}...`);
    this.miniboss.dropLoot();
    // Logic for fighting the mini-boss
  }
}

module.exports = Floor;