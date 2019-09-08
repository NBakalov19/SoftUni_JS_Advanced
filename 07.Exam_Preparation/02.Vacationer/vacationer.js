class Vacationer {

    constructor(fullName, creditCard) {
        this.fullName = fullName;

        this.idNumber = this.generateIDNumber();

        this.creditCard = {
            cardNumber: 1111,
            expirationDate: '',
            securityNumber: 111,
        };

        if (creditCard !== undefined) {
            this.addCreditCardInfo(creditCard);
        }

        this.wishList = [];
    }

    get fullName() {
        return this._fullName;
    };

    set fullName(newFullName) {
        if (newFullName.length !== 3) {
            throw new Error('Name must include first name, middle name and last name');
        }

        for (const name of newFullName) {
            if (!/\b[A-Z][a-z]+\b/gm.test(name)) {
                throw Error('Invalid full name');
            }
        }

        let fullName = {};

        fullName.firstName = newFullName[0];
        fullName.middleName = newFullName[1];
        fullName.lastName = newFullName[2];

        this._fullName = fullName;
    };

    generateIDNumber() {
        let vowel = ['a', 'e', 'i', 'o', 'u'];

        let idNumber = (231 * this.fullName.firstName.charCodeAt(0) + 139 * this.fullName.middleName.length).toString();

        if (vowel.includes(this.fullName.lastName.charAt(this.fullName.lastName.length - 1))) {
            idNumber += 8;
        } else {
            idNumber += 7;
        }

        return idNumber;
    }

    addCreditCardInfo(creditCard) {
        if (creditCard.length !== 3) {
            throw new Error('Missing credit card information')
        }

        if (typeof creditCard[0] !== 'number' || typeof creditCard[2] !== 'number') {
            throw new Error('Invalid credit card details')
        }

        this.creditCard.cardNumber = creditCard[0];
        this.creditCard.expirationDate = creditCard[1];
        this.creditCard.securityNumber = creditCard[2];
    }

    addDestinationToWishList(destination) {
        if (this.wishList.includes(destination)) {
            throw new Error('Destination already exists in wishlist');
        }

        this.wishList.push(destination);

        this.wishList.sort(((a, b) => a.length - b.length));
    }

    getVacationerInfo() {
        let output = 'Name: ' +
            this.fullName.firstName + ' ' + this.fullName.middleName + ' ' + this.fullName.lastName + '\n';

        output += 'ID Number: ' + this.idNumber + '\n';
        output += 'Wishlist:\n' + (this.wishList.length === 0 ? 'empty' : this.wishList.join(', ')) + '\n';
        output += 'Credit Card:\n';
        output += 'Card Number: ' + this.creditCard.cardNumber + '\n';
        output += 'Expiration Date: ' + this.creditCard.expirationDate + '\n';
        output += 'Security Number: ' + this.creditCard.securityNumber;

        return output;
    }
}

// Initialize vacationers with 2 and 3 parameters
let vacationer1 = new Vacationer(["Vania", "Ivanova", "Zhivkova"]);
let vacationer2 = new Vacationer(["Tania", "Ivanova", "Zhivkova"],
    [123456789, "10/01/2018", 777]);

// Should throw an error (Invalid full name)
try {
    let vacationer3 = new Vacationer(["Vania", "Ivanova", "ZhiVkova"]);
} catch (err) {
    console.log("Error: " + err.message);
}

// Should throw an error (Missing credit card information)
try {
    let vacationer3 = new Vacationer(["Zdravko", "Georgiev", "Petrov"]);
    vacationer3.addCreditCardInfo([123456789, "20/10/2018"]);
} catch (err) {
    console.log("Error: " + err.message);
}

vacationer1.addDestinationToWishList('Spain');
vacationer1.addDestinationToWishList('Germany');
vacationer1.addDestinationToWishList('Bali');

// Return information about the vacationers
console.log(vacationer1.getVacationerInfo());
console.log(vacationer2.getVacationerInfo());
