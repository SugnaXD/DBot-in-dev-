const fs = require('fs');

// Read player data from file
function readPlayerData() {
  try {
    const data = fs.readFileSync('playerData.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading player data:', error);
    return null;
  }
}

// Write player data to file
function writePlayerData(playerData) {
  try {
    fs.writeFileSync('playerData.json', JSON.stringify(playerData));
    console.log('Player data saved successfully.');
  } catch (error) {
    console.error('Error writing player data:', error);
  }
}

module.exports = {
  readPlayerData,
  writePlayerData,
};