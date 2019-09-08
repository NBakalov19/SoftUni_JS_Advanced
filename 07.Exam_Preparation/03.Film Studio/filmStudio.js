class FilmStudio {

    constructor(studioName) {
        this.name = studioName;
        this.films = [];
    }

    casting(actor, role) {
        let isTheActorIsUnemployed = true;
        let output;

        if (this.films.length) {

            for (let f of this.films) {

                let roles = f.filmRoles.filter((r) => r.role === role);

                if (roles.length) {
                    let filmIndex = this.films.indexOf(f);
                    let wantedRole = this.films[filmIndex].filmRoles.filter((fR) => fR.role === role)[0];
                    let roleIndex = this.films[filmIndex].filmRoles.indexOf(wantedRole);

                    this.films[filmIndex].filmRoles[roleIndex].actor = actor;
                    isTheActorIsUnemployed = false;
                    output = `You got the job! Mr. ${actor} you are next ${role} in the ${f.filmName}. Congratz!`;
                    break;
                }
            }

            if (isTheActorIsUnemployed) {
                output = `${actor}, we cannot find a ${role} role...`;
            }

        } else {
            output = `There are no films yet in ${this.name}.`;
        }

        return output;
    }

    makeMovie(filmName, roles) {

        if (arguments.length === 2) {

            let firstArgIsString = typeof arguments[0] === 'string';
            let secondArgIsArray = arguments[1] instanceof Array;

            if (firstArgIsString && secondArgIsArray) {
                let findedFilms = this.films.filter((f) => f.filmName.includes(filmName));

                let filmRoles = roles.reduce((acc, cur) => {
                    let curFilmRole = {
                        role: cur,
                        actor: false
                    };
                    acc.push(curFilmRole);
                    return acc;
                }, []);

                let film = {
                    filmName,
                    filmRoles
                };

                if (findedFilms.length > 0) {
                    film.filmName += ` ${++findedFilms.length}`;
                }

                this.films.push(film);
                return film;
            } else {
                throw ('Invalid arguments')
            }

        } else {
            throw ('Invalid arguments count')
        }
    }

    lookForProducer(film) {

        let f = this.films.filter((f) => f.filmName === film)[0];
        let output;

        if (f) {
            output = `Film name: ${f.filmName}\n`;
            output += 'Cast:\n';
            Object.keys(f.filmRoles).forEach((role) => {
                output += `${f.filmRoles[role].actor} as ${f.filmRoles[role].role}\n`;
            });
        } else {
            throw new Error(`${film} do not exist yet, but we need the money...`)
        }

        return output;
    }
}

const assert = require('chai').assert;

describe('filmStudio', function () {

    let sampleInstance;

    beforeEach(function () {
        sampleInstance = new FilmStudio('PeshoStudio');
    });

    it('test constructor studioName property', function () {
        assert.equal(sampleInstance.name, 'PeshoStudio')
    });

    it('test constructor films property', function () {
        assert.deepEqual(sampleInstance.films, []);
    });

    it('test makeMovie filmName property', function () {
        let result = sampleInstance.makeMovie('The Avengers', ['Thor', 'Hulk', 'Iron-man']);

        assert.equal(result.filmName, 'The Avengers');
    });

    it('test makeMovie roles property', function () {
        let result = sampleInstance.makeMovie('The Avengers', ['Thor', 'Hulk', 'Iron-man']);

        let expectedResult = [
            {role: 'Thor', actor: false},
            {role: 'Hulk', actor: false},
            {role: 'Iron-man', actor: false},
        ];

        assert.deepEqual(result.filmRoles, expectedResult);
    });

    it('should makeMovie throws error message if not enough arguments', function () {

        assert.throws(() => sampleInstance.makeMovie('The Avengers'),
            'Invalid arguments count');
        assert.throws(() => sampleInstance.makeMovie(['Thor', 'Hulk', 'Iron-man']),
            'Invalid arguments count');
        assert.throws(() => sampleInstance.makeMovie(),
            'Invalid arguments count');
    });

    it('should makeMovie throws error message if arguments are not proper type', function () {
        assert.throws(() => sampleInstance.makeMovie('The Avengers', 1),
            'Invalid arguments');
        assert.throws(() => sampleInstance.makeMovie(123, ['Thor', 'Hulk', 'Iron-man']),
            'Invalid arguments');
    });


    it('should lookForProducer should throws error if film not exist', function () {

        assert.throws(() => sampleInstance.lookForProducer('Endgame'),
            'Endgame do not exist yet, but we need the money...')
    });

    it('should lookForProducer with correct arguments ', function () {
        sampleInstance.makeMovie('The Avengers', ['Thor']);

        const result = sampleInstance.lookForProducer('The Avengers');

        const expected = 'Film name: The Avengers\nCast:\nfalse as Thor\n';

        assert.equal(result, expected)
    });

    it('should casting work properly with correct arguments', function () {
        sampleInstance.makeMovie('The Avengers', ['Thor', 'Hulk']);

        const result = sampleInstance.casting('Pesho', 'Thor');

        assert.equal(result, 'You got the job! Mr. Pesho you are next Thor in the The Avengers. Congratz!');
    });


    it('should casting with non-existing role', function () {
        sampleInstance.makeMovie('The Avengers', ['Thor', 'Hulk']);
        const result = sampleInstance.casting('Pesho', 'Spider-Man');

        assert.equal(result, 'Pesho, we cannot find a Spider-Man role...');
    });

    it('should casting with non-existing film', function () {
        const result = sampleInstance.casting('Pesho', 'Spider-Man');

        assert.equal(result, 'There are no films yet in PeshoStudio.');
    });

});
