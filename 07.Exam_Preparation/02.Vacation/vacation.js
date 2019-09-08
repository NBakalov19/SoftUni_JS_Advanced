class Vacation {

    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.kids = {};
    }

    get numberOfChildren() {
        this._numberOfChildren = 0;

        for (const grade in this.kids) {

            this._numberOfChildren += this.kids[grade].length;
        }

        return this._numberOfChildren;
    }

    registerChild(name, grade, budget) {
        if (budget < this.budget) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        }

        if (this.kids.hasOwnProperty(grade)) {
            for (const kid of this.kids[grade]) {
                if (kid === `${name}-${budget}`) {
                    return `${name} is already in the list for this ${this.destination} vacation.`;
                }
            }
            this.kids[grade].push(`${name}-${budget}`);
        } else {
            this.kids[grade] = [];
            this.kids[grade].push(`${name}-${budget}`);
        }

        return this.kids[grade];
    }

    removeChild(name, grade) {
        if (this.kids.hasOwnProperty(grade)) {
            for (const kid of this.kids[grade]) {

                const kidInfo = kid.split('-');
                const kidName = kidInfo[0];

                if (kidName === name) {
                    let kidIndex = this.kids[grade].indexOf(kid);
                    this.kids[grade].splice(kidIndex, 1);
                    return this.kids[grade];
                }
            }
        }
        return `We couldn't find ${name} in ${grade} grade.`;
    }

    toString() {
        if (this.numberOfChildren === 0) {
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }

        let result = `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;

        Object.entries(this.kids)
            .sort((a, b) => a[0] - b[0]);

        for (const grade in this.kids) {
            result += `Grade: ${grade}\n`;

            let kidNumber = 1;
            for (const kid of this.kids[grade]) {
                result += (`${kidNumber++}. ${kid}\n`);
            }
        }

        return result;
    }
}

let vacation = new Vacation('Mr Pesho', 'San diego', 2000);
console.log(vacation.toString());