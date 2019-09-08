class BookStore {
    constructor(name) {
        this.name = name;
        this.books = [];
        this._workers = [];
    }

    get workers() {
        return this._workers;
    }

    stockBooks(newBooks) {
        newBooks.forEach((book) => {
            let [title, author] = book.split('-');
            this.books.push({title, author});
        });

        return this.books;
    }

    hire(name, position) {
        let worker = this.workers.filter(w => w.name === name)[0];
        if (!worker) {
            worker = {
                name: name,
                position: position,
                booksSold: 0
            };
            this.workers.push(worker);
        } else {
            throw new Error('This person is our employee');
        }
        return `${name} started work at ${this.name} as ${position}`
    }

    fire(name) {
        let worker = this.workers.filter(w => w.name === name)[0];
        if (!worker) {
            throw new Error(`${name} doesn't work here`);
        }
        let index = this.workers.indexOf(worker);
        this.workers.splice(index, 1);
        return `${name} is fired`;
    }

    sellBook(title, workerName) {
        let book = this.books.filter(b => b.title === title)[0];
        if (!book) {
            throw new Error('This book is out of stock');
        }

        let worker = this.workers.filter((w) => w.name === workerName)[0];
        if (!worker) {
            throw new Error(`${workerName} is not working here`)
        }

        this.books = this.books.filter(b => b.title !== title);
        this.workers.filter(w => w.name === workerName).map(w => w.booksSold++);
    }

    printWorkers() {
        let result = "";
        this.workers.forEach(w => {
            result += `Name:${w.name} Position:${w.position} BooksSold:${w.booksSold}\n`;
        });
        return result.trim();
    }
}

const assert = require('chai').assert;

describe('test bookStore', () => {

    let testClass;

    beforeEach(function () {
        testClass = new BookStore('Store');
    });

    describe('test constructor', function () {
        it('should name be correct', function () {
            assert.equal(testClass.name, 'Store');
        });
        it('should books be empty array', function () {
            assert.deepEqual(testClass.books, []);
        });
        it('should workers be empty array', function () {
            assert.deepEqual(testClass._workers, []);
        });
    });

    describe('test getWorkers', function () {
        it('should return correct workers property length', function () {
            assert.deepEqual(testClass.workers, []);
        });
    });

    describe('test stockBooks', function () {
        it('should return added books', function () {

            assert.deepEqual(testClass.stockBooks((['Inferno-Dan Braun', 'Harry Potter-J.Rowling'])),
                [{author: 'Dan Braun', title: 'Inferno'}, {author: 'J.Rowling', title: 'Harry Potter'}]);
        });
    });

    describe('test hire', function () {

        it('should add worker if is not hired', function () {
            testClass.hire('Pesho', 'seller');

            assert.deepEqual(testClass.workers, [{name: 'Pesho', position: 'seller', booksSold: 0}]);
        });

        it('should return message if is added worker', function () {
            let result = testClass.hire('Pesho', 'seller');

            assert.equal(result, 'Pesho started work at Store as seller');
        });

        it('should throw error if employee work in book store', function () {
            testClass.hire('Pesho', 'seller');

            assert.throws(() => testClass.hire('Pesho'), 'This person is our employee');
        });
    });

    describe('test fire', function () {
        it('should remove worker if is already hired', function () {
            testClass.hire('Pesho', 'seller');
            testClass.fire('Pesho');

            assert.deepEqual(testClass.workers, []);
        });

        it('should return message if is fired worker', function () {
            let result = testClass.hire('Pesho', 'seller');

            assert.equal(testClass.fire('Pesho'), 'Pesho is fired');
        });

        it('should throw error if not work in book store', function () {
            assert.throws(() => testClass.fire('Pesho'), 'Pesho doesn\'t work here');
        });
    });

    describe('test sellBook', function () {
        it('should throw error if book is not in book store', function () {
            testClass.hire('Pesho', 'seller');

            assert.throws(() => testClass.sellBook('testBook', 'Pesho')
                , 'This book is out of stock');
        });

        it('should throw error if worker not work in book store', function () {
            testClass.hire('Pesho', 'seller');
            testClass.stockBooks((['Inferno-Dan Braun']));

            assert.throws(() =>
                testClass.sellBook('Inferno', 'Ivan'), 'Ivan is not working here');
        });

        it('should increase soldBooks property of workers if params are correct', function () {
            testClass.hire('Pesho', 'seller');
            testClass.stockBooks((['Inferno-Dan Braun']));
            testClass.sellBook('Inferno', 'Pesho');

            assert.deepEqual(testClass.workers, [{name: 'Pesho', position: 'seller', booksSold: 1}]);
        });
    });

    describe('test printWorkers', function () {
        it('should return correct result', function () {
            testClass.hire('Pesho', 'Seller');
            testClass.stockBooks((['Inferno-Dan Braun']));
            testClass.sellBook('Inferno', 'Pesho');

            assert.equal(testClass.printWorkers(), 'Name:Pesho Position:Seller BooksSold:1');
        });
    })
});

