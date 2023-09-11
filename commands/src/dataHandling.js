const fs = require('fs');

function readDataFromFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading data from file: ${error}`);
    return null;
  }
}

function writeDataToFile(filename, data) {
  try {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(filename, jsonData, 'utf8');
    console.log('Data written to file successfully');
  } catch (error) {
    console.error(`Error writing data to file: ${error}`);
  }
}

module.exports = {
  execute: function() {
  },
  readDataFromFile,
  writeDataToFile,
};