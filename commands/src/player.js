class Player {
  constructor(name, race) {
    this.name = name;
    this.level = 1;
    this.experience = 0;
    this.nextLevelExperience = 100;
    this.health = 100;
    this.damage = 10;
    this.armor = 0;
    this.lastDefeatedEnemy = null;
    this.race = race;

    // Apply race pros and cons
    this.applyRaceEffects();
  }

  changeName(newName) {
    this.name = newName;
    console.log(`Player name changed to ${newName}`);
  }

  chooseRace(race, discordUserId) {
    const requiredDiscordUserId = 'your_specific_discord_user_id';
  
    if (race === 'Orc' && discordUserId !== requiredDiscordUserId) {
      console.log(`Only players with the specific Discord user ID can choose the Orc race.`);
      return;
    }
    switch (race) {
      case 'Human':
        this.health += 10;
        this.damage += 5;
        this.armor -= 2;
        console.log(`${this.name} is a Human. Health +10, Damage +5, Armor -2.`);
        break;
      case 'Elf':
        this.health -= 5;
        this.damage += 10;
        this.armor += 2;
        console.log(`${this.name} is an Elf. Health -5, Damage +10, Armor +2.`);
        break;
      case 'Dwarf':
        this.health += 15;
        this.damage -= 5;
        this.armor += 5;
        console.log(`${this.name} is a Dwarf. Health +15, Damage -5, Armor +5.`);
        break;
      case 'Orc':
        this.health += 20;
        this.damage -= 15;
        this.armor += 10;
        console.log(`${this.name} is an Orc. Health +20, Damage -15, Armor +10.`);
        break;
      default:
        console.log(`${this.name} has chosen an invalid race.`);
    }
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

  defeatEnemy(enemy) {
    this.lastDefeatedEnemy = enemy;
    // Logic for defeating an enemy
  }

  idleXP() {
    if (this.lastDefeatedEnemy) {
      const idleXPGain = this.lastDefeatedEnemy.xpGain * 0.1; // Adjust the scaling factor as needed
      this.gainExperience(idleXPGain);
      console.log(`${this.name} gained ${idleXPGain} experience points while idle.`);
    } else {
      console.log(`${this.name} has not defeated any enemies yet.`);
    }
  }

  applyRaceEffects() {
    // Apply race pros and cons based on the chosen race
    switch (this.race) {
      case 'Human':
        this.health += 10;
        this.damage += 5;
        this.armor -= 2;
        break;
        case 'Elf':
          this.health -= 5;
          this.damage += 10;
          this.armor += 2;
          break;
        case 'Dwarf':
          this.health += 15;
          this.damage -= 5;
          this.armor += 5;
          break;
        case 'Orc':
          this.health += 20;
          this.damage -= 15;
          this.armor += 10;
          break;
        default:
          console.log(`${this.name} has chosen an invalid race.`);
          
    }
  }
}