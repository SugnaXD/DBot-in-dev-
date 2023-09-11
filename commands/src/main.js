/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const readline = require('readline');
const fs = require('fs');
const Player = require('./player.js');
const Floor = require('./floor/floor.js');
const Boss = require('./enemies/boss.js');
const MiniBoss = require('./enemies/minibos.js');
const Inventory = require('./inventoryjs');

const playerInventory = new Inventory();
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const { guildId, token } = config;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once('ready', () => {
  console.log('Ready!');
});
const rest = new REST({ version: '9' }).setToken(token);
client.once('ready', async () => {
  try {
    const commands = [
      {
        name: 'equipment',
        description: 'Find a player and list their equipment and stats',
        options: [
          {
            name: 'uid',
            description: 'User ID of the player',
            type: 3,
            required: true,
          },
        ],
      },
    ];
    await rest.put(Routes.applicationGuildCommands(config.clientId, guildId), {
      body: commands,
    });
    console.log('Slash command registered!');
  } catch (error) {
    console.error(error);
  }
});
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName, options } = interaction;
  if (commandName === 'equipment') {
    const uid = options.getString('uid');
    const player = findPlayerByUID(uid);
    if (player) {
      const equipment = playerInventory.getEquipment(player);
      const stats = player.getStats();
      const xpLevel = player.getXPLevel();
      const response = `Player: ${player.name}\nEquipment: ${equipment}\nStats: ${JSON.stringify(
        stats
      )}\nXP Level: ${xpLevel}`;
      await interaction.reply(response);
    } else {
      await interaction.reply('Player not found!');
    }
  }
});
function startGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter your player name: ', (playerName) => {
    const player = new Player(playerName);
    console.log(`New character created: ${player.name}`);
    const boss1 = new Boss('Floor 1 Boss', 1000, 50, 'Spear Throw', 10);
    const miniboss1 = new MiniBoss('Floor 1 Mini Boss', 500, 30, 'DaggerSlash', 7);
    const boss2 = new Boss('Floor 2 Boss', 1500, 70, 'Fireball', 12);
    const miniboss2 = new MiniBoss('Floor 2 Mini Boss', 800, 40, 'Ice Slash', 9);
    const floor1 = new Floor(1, boss1, miniboss1);
    const floor2 = new Floor(2, boss2, miniboss2);
    for (let i = 0; i < 20; i++) {
      const enemy = floor1.fightEnemy();
      player.gainExperience(50);
      if (enemy) {
        if (enemy.dropArmor()) {
          player.increaseHealth(10);
          playerInventory.addMobDrop('Armor');
        }
        if (enemy.dropWeapon()) {
          player.increaseDamage(5);
          playerInventory  }

          if (enemy.dropBoots()) {
            playerInventory.addMobDrop('Boots');
            const speedBoost = 2; // Increase speed by 2
            player.increaseSpeed(speedBoost);
          }
        }
        console.log(`Enemy defeated! Player health: ${player.health}`);
      }
        player.resetHealth();  
      for (let i = 0; i < 20; i++) {
        const enemy = floor2.fightEnemy();
        player.gainExperience(75);
  
        if (enemy) {
          if (enemy.dropArmor()) {
            player.increaseHealth(10);
            playerInventory.addMobDrop('Armor');
          }
  
          if (enemy.dropWeapon()) {
            player.increaseDamage(5);
            playerInventory.addMobDrop('Weapon');
          }
  
          if (enemy.dropBoots()) {
            playerInventory.addMobDrop('Boots');
            const speedBoost = 2; // Increase speed by 2
            player.increaseSpeed(speedBoost);
          }
        }
        console.log(`Enemy defeated! Player's health: ${player.health}`);
      }
  
      player.resetHealth();
  
      startGame();
    });
  }