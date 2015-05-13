var assert = require('assert');
var expect = require('chai').expect;
var valid = require('../bank_validation');

var validClabe = '032180000118359719';
var invalidClabe = '033180000118359719';

describe('clabe checksum', function() {
  it('should return true for a valid clabe', function() {
    expect(valid(validClabe)).to.be.true;
  });

  it('should return false for an invalid clabe', function() {
    expect(valid(invalidClabe)).to.be.false;
  });
});
