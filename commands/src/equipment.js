/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Intents } = require('discord.js');
const { createLeaderboardCommand, execute } = require('./leaderboard');
const readline = require('readline');
const fs = require('fs');
const Player = require('./player.js');
const Floor = require('./floor/floor.js');
const Boss = require('./enemies/boss.js');
const MiniBoss = require('./enemies/minibos.js');
const Inventory = require('./inventoryjs');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

const { guildId, token } = config;

const playerInventory = new Inventory();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('Ready!');
});

const equipmentCommand = new SlashCommandBuilder()
  .setName('equipment')
  .setDescription('Find a player and list their equipment and stats')
  .addStringOption((option) =>
    option
      .setName('uid')
      .setDescription('User ID of the player')
      .setRequired(true)
  );

client.once('ready', async () => {
  const commands = await client.guilds.cache.get(guildId)?.commands.set([equipmentCommand]);
  console.log('Slash commands registered!');
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

client.login(token);