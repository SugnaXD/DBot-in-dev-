class Enemy {
    constructor(name, health, damage) {
      this.name = name;
      this.health = health;
      this.damage = damage;
    }
  
    dropArmor(player) {
      if (Math.random() < 0.5) {
        const armorName = 'Iron Chestplate';
        const armorAmount = 10;
        player.increaseHealth(armorAmount);
        console.log(`${player.name} gained ${armorName} (+${armorAmount} health).`);
      }
    }
  
    dropWeapon(player) {
      if (Math.random() < 0.5) {
        const weaponName = 'Steel Sword';
        const weaponAmount = 5;
        player.increaseDamage(weaponAmount);
        console.log(`${player.name} gained ${weaponName} (+${weaponAmount} damage).`);
      }
    }
  }
  
  module.exports = Enemy;