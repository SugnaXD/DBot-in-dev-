class Floor {
    constructor(level, boss, miniboss) {
      this.level = level;
      this.boss = boss;
      this.miniboss = miniboss;
    }
  
    fightBoss() {
      console.log(`Fighting boss on floor ${this.level}...`);
      this.boss.useSpecialAbility();
      // Logic for fighting the boss
    }
  
    fightMiniBoss() {
      console.log(`Fighting mini boss on floor ${this.level}...`);
      this.miniboss.dropLoot();
      // Logic for fighting the mini boss
    }
  }
  
  module.exports = Floor;