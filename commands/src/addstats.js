const { SlashCommandBuilder } = require('@discordjs/builders');
const { readPlayerData, writePlayerData } = require('./dataHandling.js');

// The user ID to allow for the command
const allowedUserId = '603554299485880331';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addstats')
    .setDescription('Add damage, health, and XP to a player')
    .addIntegerOption(option =>
      option.setName('damage')
        .setDescription('The amount of damage to add')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('health')
        .setDescription('The amount of health to add')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('xp')
        .setDescription('The amount of XP to add')
        .setRequired(true)),
  async execute(interaction) {
    if (interaction.user.id !== allowedUserId) {
      return interaction.reply('You are not authorized to use this command.');
    }

    const damage = interaction.options.getInteger('damage');
    const health = interaction.options.getInteger('health');
    const xp = interaction.options.getInteger('xp');

    const playerData = readPlayerData() || {};

    // Update the player's stats
    playerData[allowedUserId] = playerData[allowedUserId] || {};
    playerData[allowedUserId].damage = (playerData[allowedUserId].damage || 0) + damage;
    playerData[allowedUserId].health = (playerData[allowedUserId].health || 0) + health;
    playerData[allowedUserId].xp = (playerData[allowedUserId].xp || 0) + xp;

    writePlayerData(playerData);

    await interaction.reply('Stats added successfully!');
  },
};