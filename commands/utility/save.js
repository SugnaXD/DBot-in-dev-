const { SlashCommandBuilder } = require('@discordjs/builders');
const { readPlayerData, writePlayerData } = require('../src/dataHandling');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('save')
    .setDescription('Save player data'),
  async execute(interaction) {
    // Get the user ID and username
    const userId = interaction.user.id;
    const username = interaction.user.username;

    // Get the player data
    const playerData = readPlayerData() || {};

    // Update the player data with the user's information
    playerData[userId] = {
      username,
    };

    // Save the player data
    writePlayerData(playerData);

    // Send a reply to the user
    await interaction.reply('Player data saved successfully!');
  },
};