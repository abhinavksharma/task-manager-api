const fs = require('fs').promises;

// Function to read a JSON file asynchronously
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

// Function to write a JSON file asynchronously (overwrite)
async function writeJsonFile(filePath, data) {
  try {
    const jsonString = JSON.stringify(data, null, 2); // Optionally, use null and 2 for pretty formatting
    await fs.writeFile(filePath, jsonString, { encoding: 'utf-8', flag: 'w' });
  } catch (error) {
    throw error;
  }
}

module.exports = { readJsonFile, writeJsonFile };
