class Calculator {
    constructor() {
        this.expenses = [];
    }

    add(data) {
        this.expenses.push(data);
    }

    divideNums() {
        let divide;
        for (let i = 0; i < this.expenses.length; i++) {
            if (typeof (this.expenses[i]) === 'number') {
                if (i === 0 || divide === undefined) {
                    divide = this.expenses[i];
                } else {
                    if (this.expenses[i] === 0) {
                        return 'Cannot divide by zero';
                    }
                    divide /= this.expenses[i];
                }
            }
        }
        if (divide !== undefined) {
            this.expenses = [divide];
            return divide;
        } else {
            throw new Error('There are no numbers in the array!')
        }
    }

    toString() {
        if (this.expenses.length > 0)
            return this.expenses.join(" -> ");
        else return 'empty array';
    }

    orderBy() {
        if (this.expenses.length > 0) {
            let isNumber = true;
            for (let data of this.expenses) {
                if (typeof data !== 'number')
                    isNumber = false;
            }
            if (isNumber) {
                return this.expenses.sort((a, b) => a - b).join(', ');
            } else {
                return this.expenses.sort().join(', ');
            }
        } else return 'empty';
    }
}


const assert = require('chai').assert;

describe('Calculator class', () => {

    let testClass;

    beforeEach(function () {
        testClass = new Calculator();
    });

    describe('test constructor', function () {
        it('should when is initialized should have empty array', function () {
            assert.deepEqual(testClass.expenses, []);
        });

    });

    describe('test method \'add\'', function () {

        it('expenses should increase it length when add pass item', function () {

            testClass.add('item');
            testClass.add('item2');

            assert.equal(testClass.expenses.length, 2);
        });
    });

    describe('test method \'divideNums\'', function () {

        it('should throw message if use divideNums with non-number values', function () {
            testClass.add('a');
            testClass.add('b');

            assert.throws(() => testClass.divideNums());
        });

        it('should return message if use divideNums with element equal to zero ', function () {
            testClass.add(1);
            testClass.add(0);
            testClass.add(3);

            assert.equal(testClass.divideNums(), 'Cannot divide by zero')
        });

        it('should return correct result when use divideNums with valid input', function () {
            testClass.add(1);
            testClass.add(1);
            testClass.add(1);

            let result = testClass.divideNums();

            assert.equal(result, 1);
        });
    });

    describe('test method \'toString\'', function () {
        it('should return message if expenses is empty', function () {
            const result = testClass.toString();

            assert.equal(result, 'empty array');
        });

        it('should return joined elements with ->', function () {
            testClass.add('a');
            testClass.add('b');
            testClass.add('c');

            const result = testClass.toString();

            assert.equal(result, 'a -> b -> c');
        });
    });

    describe('test method \'orderBy\'', function () {
        it('should return message if expenses is empty', function () {
            const result = testClass.orderBy();

            assert.equal(result, 'empty')
        });

        it('should return ordered non-number element of expenses joined by \', \'', function () {
            testClass.add('b');
            testClass.add('c');
            testClass.add('d');
            testClass.add('a');

            const result = testClass.orderBy();

            assert.equal(result, 'a, b, c, d')
        });

        it('should return ordered number element of expenses joined by \', \'', function () {
            testClass.add(4);
            testClass.add(2);
            testClass.add(3);
            testClass.add(1);

            const result = testClass.orderBy();

            assert.equal(result, '1, 2, 3, 4')
        });
    })
});
