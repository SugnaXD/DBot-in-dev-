const { SlashCommandBuilder } = require('@discordjs/builders');
const { readPlayerData, writePlayerData } = require('../src/dataHandling');

// The user ID to allow for the command
const allowedUserId = 'YOUR_USER_ID';

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
    // Check if the user executing the command has the allowed user ID
    if (interaction.user.id !== allowedUserId) {
      return interaction.reply('You are not authorized to use this command.');
    }

    // Get the amount of damage, health, and XP from the command options
    const damage = interaction.options.getInteger('damage');
    const health = interaction.options.getInteger('health');
    const xp = interaction.options.getInteger('xp');

    // Get the player data
    const playerData = readPlayerData() || {};

    // Update the player's stats
    playerData[allowedUserId] = playerData[allowedUserId] || {};
    playerData[allowedUserId].damage = (playerData[allowedUserId].damage || 0) + damage;
    playerData[allowedUserId].health = (playerData[allowedUserId].health || 0) + health;
    playerData[allowedUserId].xp = (playerData[allowedUserId].xp || 0) + xp;

    // Save the updated player data
    writePlayerData(playerData);

    // Send a reply to the user
    await interaction.reply('Stats added successfully!');
  },
};