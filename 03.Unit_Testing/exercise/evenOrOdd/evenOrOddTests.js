const expect = require('chai').expect;

function isOddOrEven(string) {
    if (typeof (string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}


describe('isOddOrEven', function () {

    it('should return undefined with a number parameter', function () {
        expect(isOddOrEven(19)).to.equal(undefined,
            'Function did not return the correct result!')
    });

    it('should return undefined with object parameter', function () {
        expect(isOddOrEven({name: "someName"})).to.equal(undefined,
            'Function did not return the correct result!')
    });

    it('should return correct result with an even length', function () {
        expect(isOddOrEven('name')).to.equal('even',
            'Function did not return the correct result!')
    });

    it('should return correct result with an odd length', function () {
        expect(isOddOrEven('abc')).to.equal('odd',
            'Function did not return the correct result!')
    });

    it('should return correct values with multiply consecutive checks', function () {
        expect(isOddOrEven('name')).to.equal('even',
            'Function did not return the correct result!');

        expect(isOddOrEven('apples')).to.equal('even',
            'Function did not return the correct result!');

        expect(isOddOrEven('apple')).to.equal('odd',
            'Function did not return the correct result!');
    });
});