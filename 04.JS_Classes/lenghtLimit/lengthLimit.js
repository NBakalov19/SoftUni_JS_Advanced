class Stringer {
    constructor(innerString, innerLength) {
        this.innerString = innerString;
        this.innerLength = innerLength;
    }

    increase(length) {
        this.innerLength += length;
    }

    decrease(length) {
        this.innerLength -= length;
        if (this.innerLength < 0) {
            this.innerLength = 0;
        }
    }

    toString() {
        let output = this.innerString;
        const countOfDots = Math.abs(this.innerString.length - this.innerLength);

        if (this.innerLength === 0) {
            output = '...';
        } else if (this.innerString.length > this.innerLength) {
            const cut = this.innerString.length - this.innerLength;
            output = output.substr(0, cut) + '...';
        }

        return output;
    }
}

let test = new Stringer("Test", 5);
console.log(test.toString()); // Test

test.decrease(3);
console.log(test.toString()); // Te...

test.decrease(5);
console.log(test.toString()); // ...

test.increase(4);
console.log(test.toString()); // Test
