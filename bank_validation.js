'use strict';

var _ = require('lodash');

function clabeChecksum(clabe) {
  // Weight factor for first 17 digies
  // (see: http://en.wikipedia.org/wiki/CLABE#Control_digit)
  var mask = '37137137137137137';
  var sum = _.reduce(_.map(_.zip(clabe.split(''), mask.split('')), function(pair) {
    // Multiply the clabe and mask pairwise (mod ten) and store in array
    // 3 * digit 1 (mod 10), 7 * digit 2 (mod 10), ...
    return (pair[0] * pair[1]) % 10;
  }), function(total, element) {
    // Sum values in array
    return total + parseInt(element, 10);
  }, 0);

  // The last digit of the clabe should be (10 - checksum mod 10) mod 10
  var checkdigit = (10 - sum % 10) % 10;
  return checkdigit;
}

module.exports = function(clabe) {
  // Clabe must be 18 digits
  if (!clabe) {
    return false;
  } else if (!/^\d+$/.test(clabe)) {
    return false;
  } else if (clabe.length !== 18) {
    return false;
  }
  // The checksum of the first 17 digits should equal the 18th digit
  return (clabeChecksum(clabe.substring(0, 17))
    === parseInt(clabe.substring(17), 10));
}
