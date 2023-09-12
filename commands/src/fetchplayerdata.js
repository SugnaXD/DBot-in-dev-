const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const config = require('DBot Updater/config.json');

class Player {
  constructor(name, race, level, health = 100, damage = 10, armor = 0, speed = 12) {
    this.name = name;
    this.race = race;
    this.level = level;
    this.health = health;
    this.damage = damage;
    this.armor = armor;
    this.speed = speed;
  }
  
  getHealth() {
    return this.health;
  }
}
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'fetchPlayerData') {
    const playerName = interaction.options.getString('playername');

    const playerData = await fetchPlayerData(playerName);

    if (playerData) {
      const player = new Player(playerData.name, playerData.race, playerData.level, playerData.health, playerData.damage, playerData.armor);

      // Output the player's data
      const playerInfo = `Name: ${player.name}\nLevel: ${player.level}\nHealth: ${player.health}\nDamage: ${player.damage}\nArmor: ${player.armor}`;
      interaction.reply(playerInfo);
    } else {
      interaction.reply(`Player data for ${playerName} not found.`);
    }
  }
});

async function fetchPlayerData(playerName) {
  return new Promise((resolve, reject) => {
    fs.readFile('playerdata.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      const playerData = JSON.parse(data);

      const player = playerData.find((player) => player.name === playerName);

      resolve(player || null);
    });
  });
}

client.login(config.discordBotToken);

module.exports = {
  execute: function() {
  }
};