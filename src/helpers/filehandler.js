const fs = require('fs');

// Function to read a JSON file asynchronously
function readJsonFile(filePath, callback) {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
}

// Function to write a JSON file asynchronously
function writeJsonFile(filePath, data, callback) {
  const jsonString = JSON.stringify(data, null, 2); // Optionally, use null and 2 for pretty formatting

  fs.writeFile(filePath, jsonString, { encoding: 'utf-8', flag: 'w' }, (err,status) => {
    if (err) {
        status = false
      callback(err,status);
      return;
    }
    status = true
    callback(null,status);
  });
}


module.exports = {readJsonFile,writeJsonFile};
// // Example usage
// const filePath = 'example.json';

// // Reading the JSON file
// readJsonFile(filePath, (readError, jsonData) => {
//   if (readError) {
//     console.error('Error reading JSON file:', readError.message);
//     return;
//   }

//   console.log('Read JSON data:', jsonData);

//   // Modify the data as needed

//   // Writing the JSON file
//   writeJsonFile(filePath, jsonData, (writeError) => {
//     if (writeError) {
//       console.error('Error writing JSON file:', writeError.message);
//       return;
//     }

//     console.log('JSON file written successfully');
//   });
// });
