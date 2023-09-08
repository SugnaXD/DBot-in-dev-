class Player {
    constructor(name) {
      this.name = name;
      this.level = 1;
      this.experience = 0;
      this.nextLevelExperience = 100;
      this.health = 100;
      this.damage = 10;
      this.armor = 0;
    }
  
    changeName(newName) {
      this.name = newName;
      console.log(`Player name changed to ${newName}`);
    }
  
    gainExperience(amount) {
      this.experience += amount;
      console.log(`${this.name} gained ${amount} experience points.`);
  
      if (this.experience >= this.nextLevelExperience) {
        this.levelUp();
      }
    }
  
    levelUp() {
      this.level++;
      this.experience = 0;
      this.nextLevelExperience *= 1.5;
      this.health += 20;
      console.log(`${this.name} leveled up to level ${this.level}!`);
    }
  
    increaseHealth(amount) {
      this.health += amount;
      console.log(`${this.name} gained ${amount} health.`);
    }
  
    increaseDamage(amount) {
      this.damage += amount;
      console.log(`${this.name} gained ${amount} damage.`);
    }
  
    increaseArmor(amount) {
      this.armor += amount;
      console.log(`${this.name} gained ${amount} armor.`);
    }
  }
  
  module.exports = Player;