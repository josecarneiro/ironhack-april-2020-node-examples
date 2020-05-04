function multiply(a, b) {
  return a * b;
}

const cde = (a, b) => a / b;

exports.multiply = multiply;
exports.divide = cde;

exports.PI = 3.141592;

// Export one single value
// module.exports = ...
// Export multiple values
// exports.valueA = ...
// exports.valueB = ...
