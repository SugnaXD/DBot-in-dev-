// Define the inventory class
class Inventory {
    constructor() {
      this.mobDrops = [];
      this.equippedArmor = null;
      this.equippedSword = null;
    }
  
    // Method to add a mob drop to the inventory
    addMobDrop(drop) {
      this.mobDrops.push(drop);
    }
  
    // Method to view the mob drops in the inventory
    viewMobDrops() {
      return this.mobDrops;
    }
  
    // Method to equip armor
    equipArmor(armorName) {
      this.equippedArmor = armorName;
    }
  
    // Method to equip a sword
    equipSword(swordName) {
      this.equippedSword = swordName;
    }
  }
  
  module.exports = Inventory;