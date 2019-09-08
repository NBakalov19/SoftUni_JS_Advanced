class CheckingAccount {
    constructor(id, email, firstName, lastName) {
        this.clientId = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    set clientId(value) {
        if (value.length !== 6) {
            throw new TypeError('Client ID must be a 6-digit number');
        }

        this._clientId = value;
    }

    set email(newEmail) {
        if (!/^\w+@[A-Za-z.]+$/.test(newEmail)) {
            throw new TypeError('Invalid e-mail');
        }
        this._email = newEmail
    }

    set firstName(value) {
        if (value.length < 3 || value.length > 20) {
            throw new TypeError('First name must be between 3 and 20 characters long');
        } else if (!/^[A-Za-z]{3,20}$/.test(value)) {
            throw new TypeError('First name must contain only Latin characters');
        }
        this._firstName = value;
    }

    set lastName(value) {
        if (value.length < 3 || value.length > 20) {
            throw new TypeError('Last name must be between 3 and 20 characters long');
        } else if (!/^[A-Za-z]{3,20}$/.test(value)) {
            throw new TypeError('Last name must contain only Latin characters');
        }

        this._lastName = value;
    }
}
