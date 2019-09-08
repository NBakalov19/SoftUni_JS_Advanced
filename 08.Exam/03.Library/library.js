class Library {
    constructor(libraryName) {
        this.libraryName = libraryName;
        this.subscribers = [];
        this.subscriptionTypes = {
            normal: libraryName.length,
            special: libraryName.length * 2,
            vip: Number.MAX_SAFE_INTEGER,
        }
    }

    subscribe(name, type) {
        if (!this.subscriptionTypes.hasOwnProperty(type)) {
            return `The type ${type} is invalid`;
        }

        const isExistSubscriber = this.subscribers.find(s => s.name === name);

        if (isExistSubscriber === undefined) {
            let subscriber = {
                name,
                type,
                books: [],
            };

            this.subscribers.push(subscriber);

            return subscriber;
        } else {
            isExistSubscriber.type = type;

            return isExistSubscriber;
        }
    }

    unsubscribe(name) {
        const subscriberIndex = this.subscribers.findIndex(s => s.name === name);

        if (subscriberIndex === -1) {
            throw new Error(`There is no such subscriber as ${name}`);
        } else {
            this.subscribers.splice(subscriberIndex, 1);
        }

        return this.subscribers;
    }

    receiveBook(subscriberName, bookTitle, bookAuthor) {
        const subscriber = this.subscribers.find(s => s.name === subscriberName);

        if (subscriber === undefined) {
            throw  new Error(`There is no such subscriber as ${subscriberName}`);
        } else {
            const subscriberType = subscriber.type;
            const subscriberLimit = this.subscriptionTypes[subscriberType];

            if (subscriber.books.length < subscriberLimit) {
                const book = {
                    title: bookTitle,
                    author: bookAuthor,
                };

                subscriber.books.push(book);
            } else {
                throw new Error(`You have reached your subscription limit ${this.subscriptionTypes[subscriberType]}!`);
            }

            return subscriber;
        }
    }

    showInfo() {

        let output = '';

        if (this.subscribers.length > 0) {

            for (const subscriber of this.subscribers) {

                output += `Subscriber: ${subscriber.name}, Type: ${subscriber.type}\n`;
                output += 'Received books:';


                for (let i = 0; i < subscriber.books.length; i++) {
                    const book = subscriber.books[i];

                    if (i < subscriber.books.length - 1) {
                        output += ` ${book.title} by ${book.author},`;
                    } else {
                        output += ` ${book.title} by ${book.author}\n`;
                    }
                }

            }
        } else {
            return `${this.libraryName} has no information about any subscribers`;
        }

        return output;
    }
}

let lib = new Library('Lib');

lib.subscribe('Peter', 'normal');
lib.subscribe('John', 'special');

lib.receiveBook('John', 'A Song of Ice and Fire', 'George R. R. Martin');
lib.receiveBook('Peter', 'Lord of the rings', 'J. R. R. Tolkien');
lib.receiveBook('John', 'Harry Potter', 'J. K. Rowling');

console.log(lib.showInfo());

