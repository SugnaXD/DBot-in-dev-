/* eslint-disable no-undef */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

function createLeaderboardCommand() {
  const command = new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Show the leaderboard')
    .addStringOption((option) =>
      option
        .setName('category')
        .setDescription('Select a category')
        .setRequired(true)
        .addChoice('Damage', 'damage')
        .addChoice('Health', 'health')
        .addChoice('Level', 'level')
    );

  return command;
}

async function execute(interaction) {
  const category = interaction.options.getString('category');

  let leaderboard;
  if (category === 'damage') {
    leaderboard = players.sort((a, b) => b.damage - a.damage);
  } else if (category === 'health') {
    leaderboard = players.sort((a, b) => b.health - a.health);
  } else if (category === 'level') {
    leaderboard = players.sort((a, b) => b.level - a.level);
  }

  const leaderboardText = leaderboard
    .map((player, index) => `${index + 1}. ${player.name}: ${player.health} health, ${player.damage} damage, Level ${player.level}`)
    .join('\n');

  const row = new MessageActionRow().addComponents(
    new MessageButton().setCustomId('damage').setLabel('Damage').setStyle('PRIMARY'),
    new MessageButton().setCustomId('health').setLabel('Health').setStyle('PRIMARY'),
    new MessageButton().setCustomId('level').setLabel('Level').setStyle('PRIMARY')
  );

  await interaction.reply({ content: 'Leaderboard:', ephemeral: true });
  await interaction.followUp({ content: leaderboardText, components: [row] });
}

module.exports = {
  createLeaderboardCommand,
  execute,
};