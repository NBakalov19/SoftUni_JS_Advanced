const lookupChar = require('./charLookup.js');

const expect = require('chai').expect;

describe('Test lookupChar', function () {

    it('should return undefined if first parameter is non-string', function () {
        expect(lookupChar(12, 1)).to.equal(undefined,
            'Function did not return the correct result!')
    });

    it('should return undefined if second parameter is non-number', function () {
        expect(lookupChar('Hello', '1')).to.equal(undefined,
            'Function did not return the correct result!')
    });

    it('should return undefined if second parameter is floating-point number', function () {
        expect(lookupChar('Hello', 1.2)).to.equal(undefined,
            'Function did not return the correct result!')
    });

    it('should return incorrect index if index is greater of string length ', function () {
        expect(lookupChar('string', 15)).to.equal('Incorrect index',
            'should return incorrect index if index is greater of string length')
    });

    it('should return incorrect index if index is negative', function () {
        expect(lookupChar('string', -11)).to.equal('Incorrect index',
            'should return incorrect index if index is negative')
    });


    it('should return incorrect index if index is equals of string length ', function () {
        expect(lookupChar('string', 6)).to.equal('Incorrect index',
            'should return incorrect index if index is equals of string length');
    });


    it('should return correct char on specified index', function () {
        expect(lookupChar('string', 0)).to.equal('s',
            'Function work correct');

    });

    it('should return correct char on specified index', function () {
        expect(lookupChar('string', 1)).to.equal('t',
            'Function work correct');

    });

});