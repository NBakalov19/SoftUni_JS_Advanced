class BookCollection {

    constructor(shelfGenre, room, shelfCapacity) {
        this.shelfGenre = shelfGenre;
        this.room = room;
        this.shelf = [];
        this.shelfCapacity = shelfCapacity;
    }

    set room(newRoom) {

        const validRooms = ['livingRoom', 'bedRoom', 'closet'];

        if (!validRooms.includes(newRoom)) {
            throw `Cannot have book shelf in ${newRoom}`;
        }

        this._room = newRoom;
    }

    set shelfCapacity(newCapacity) {
        if (newCapacity <= 0) {
            throw 'Shelf capacity must be a valid positive number.'
        }
        this._shelfCapacity = newCapacity;
    }

    addBook(bookName, bookAuthor) {
        const bookGenre = arguments[2] ? arguments[2] : '';

        if (this.shelf.length === this._shelfCapacity) {
            this.shelf.splice(0, 1);
        }

        this.shelf.push(`${bookAuthor} - "${bookName}" - ${bookGenre}`);

        return this.shelf.sort();
    }

    throwAwayBook(bookName) {
        let bookIndex = -1;

        bookName = `"${bookName}"`;
        for (let i = 0; i < this.shelf.length; i++) {
            const currBookName = this.shelf[i].split(' - ')[1];

            if (currBookName === bookName) {
                bookIndex = i;
            }
        }

        return this.shelf.splice(bookIndex, 1);
    }

    showBooks(genre) {
        let output = '';
        output += `Results for search "${genre}":\n`;

        for (let book of this.shelf) {
            const bookInfo = book.split(' - ');
            const bookAuthor = bookInfo[0];
            const bookName = bookInfo[1];
            const bookGenre = bookInfo[2];

            if (bookGenre === genre) {
                output += (`\uD83D\uDCD6 ${bookAuthor} - ${bookName}\n`);
            }
        }


        return output.trim();
    }

    shelfCondition() {
        return this._shelfCapacity - this.shelf.length;
    }

    toString() {
        let output = '';
        if (this.shelf.length === 0) {
            output += `It's an empty shelf`;
        } else {
            output += `"${this.shelfGenre}" shelf in ${this._room} contains:\n`;
            for (const book of this.shelf) {
                const bookInfo = book.split(' - ');
                const bookAuthor = bookInfo[0];
                const bookName = bookInfo[1];
                output += `\uD83D\uDCD6 ${bookName} - ${bookAuthor}\n`;
            }
        }
        return output.trim();
    }
}

//42/100