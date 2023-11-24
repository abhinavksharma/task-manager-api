function isValidBoolean(value) {
  return typeof value === 'boolean';
}

// Function to check if a value is not null or undefined
function isNotNullOrUndefined(value) {
  return value !== null && value !== undefined;
}

module.exports = {isNotNullOrUndefined,isValidBoolean}