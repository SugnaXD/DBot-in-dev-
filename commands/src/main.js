const readline = require('readline');
const Player = require('./player');
const Floor = require('./floor');
const Boss = require('./enemies/boss');
const MiniBoss = require('./enemies/miniboss');

function startGame() {
  // Create a new player
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter your player name: ', (playerName) => {
    const player = new Player(playerName);
    console.log(`New character created: ${player.name}`);

    // Create a boss and miniboss for the first floor
    const boss1 = new Boss('Floor 1 Boss', 1000, 50, 'Spear Throw');
    const miniboss1 = new MiniBoss('Floor 1 Mini Boss', 500, 30, 'DaggerSlash');

    // Create a floor with the boss and miniboss
    const floor1 = new Floor(1, boss1, miniboss1);

    // Simulate fighting enemies on the first floor
    for (let i = 0; i < 20; i++) {
      const enemy = floor1.fightEnemy();
      player.gainExperience(50);

      if (enemy) {
        if (enemy.dropArmor()) {
          player.increaseHealth(10);
        }

        if (enemy.dropWeapon()) {
          player.increaseDamage(5);
        }
      }
    }

    // Allow the player to change their name
    rl.question('Enter your new player name: ', (newName) => {
      player.changeName(newName);
      console.log(`Player name changed to ${player.name}`);
      rl.close();
    });
  });
}

startGame();