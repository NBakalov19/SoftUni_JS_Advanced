class AutoService {

    constructor(garageCapacity) {
        this.garageCapacity = garageCapacity;
        this.workInProgress = [];
        this.backlogWork = [];
    }

    get availableSpace() {
        return this.garageCapacity - this.workInProgress.length;
    }

    repairCar() {

        let workingPlace = this.workInProgress.length > 0
            ? this.workInProgress
            : this.backlogWork;

        if (workingPlace.length > 0) {

            let keysForRepair = [];
            Object.keys(workingPlace[0].carInfo)
                .filter((k) => workingPlace[0].carInfo[k] === 'broken')
                .forEach((k) => keysForRepair.push(k));

            workingPlace.shift();
            if (keysForRepair.length > 0) {
                return `Your ${keysForRepair.join(' and ')} were repaired.`;
            } else {
                return 'Your car was fine, nothing was repaired.'
            }
        } else {
            return 'No clients, we are just chilling...'
        }
    }

    signUpForReview(clientName, plateNumber, carInfo) {

        let currentClient = {
            plateNumber,
            clientName,
            carInfo
        };

        if (this.availableSpace > 0) {
            this.workInProgress.push(currentClient);
        } else {
            this.backlogWork.push(currentClient);
        }
    }

    carInfo(plateNumber, clientName) {

        let checkCar =
            this.workInProgress.filter((carInfo) => carInfo.plateNumber === plateNumber && carInfo.clientName === clientName)[0] ||
            this.backlogWork.filter((carInfo) => carInfo.plateNumber === plateNumber && carInfo.clientName === clientName)[0];

        if (checkCar) {
            return checkCar;
        } else {

            return `There is no car with platenumber ${plateNumber} and owner ${clientName}.`;
        }
    }
}

const assert = require('chai').assert;

describe('unit test Auto Service class', function () {

    let testClass;

    beforeEach(function () {
        testClass = new AutoService(2);
    });

    describe('test Constructor', function () {
        it('workInProgress and backlogWork Properties are array', function () {
            assert.deepEqual(testClass.workInProgress, []);
            assert.deepEqual(testClass.backlogWork, []);
        });

        it('garageCapacity is work correct', function () {

            assert.equal(testClass.garageCapacity, 2);
        });
    });

    describe('test availableSpace', function () {

        it('should return correct empty space', function () {

            assert.equal(testClass.availableSpace, 2);
        });
    });

    describe('test signUpForReview', function () {
        it('should register car in workInProgress if have space', function () {

            testClass.signUpForReview('Peter', 'CA1234CA',
                {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});

            assert.equal(testClass.workInProgress.length, 1);
        });

        it('should register car in backlogWork if haven`t available space', function () {
            testClass.signUpForReview('Peter', 'CA1234CA',
                {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});

            testClass.signUpForReview('Ivan', 'CA1234CA',
                {'engine': 'MFRGG323', 'transmission': 'FF44118ZZ', 'doors': 'broken'});

            testClass.signUpForReview('Stamat', 'CA1234CA',
                {'engine': 'MFRGG123', 'transmission': 'FF44118ZZ', 'doors': 'broken'});

            assert.equal(testClass.backlogWork.length, 1);
        });
    });

    describe('test carInfo', function () {
        it('should return car info if car is in workInProgress or backlogWork ', function () {
            testClass.signUpForReview('Peter', 'CA1234CA',
                {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});

            assert.isObject(testClass.carInfo('CA1234CA', 'Peter'));
        });

        it('should return message if car is not in workInProgress or backlogWork', function () {

            assert.equal(testClass.carInfo('CA1234CA', 'Peter'),
                'There is no car with platenumber CA1234CA and owner Peter.')
        });
    });

    describe('test repairCar', function () {
        it('should return message if no have cars for repair', function () {

            assert.equal(testClass.repairCar(), 'No clients, we are just chilling...');
        });

        it('should return message with which part is repaired', function () {
            testClass.signUpForReview('Peter', 'CA1234CA',
                {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});

            assert.equal(testClass.repairCar(), 'Your doors were repaired.')
        });

        it('should return message if registered car noting is broken', function () {

            testClass.signUpForReview('Peter', 'CA1234CA',
                {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'ok'});

            assert.equal(testClass.repairCar(), 'Your car was fine, nothing was repaired.');
        });
    })
});