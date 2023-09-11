const { SlashCommandBuilder } = require('@discordjs/builders');
const { readPlayerData, writePlayerData } = require('./dataHandling');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('save')
    .setDescription('Save player data'),
  async execute(interaction) {
    const userId = interaction.user.id;
    const username = interaction.user.username;

    const playerData = readPlayerData() || {};

    playerData[userId] = {
      username,
    };

    writePlayerData(playerData);

    await interaction.reply('Player data saved successfully!');
  },
};