function solve(arr) {

    let getManipulator = (function () {
        let string = '';
        return {
            append: (str) => string = string + str,
            removeStart: count => string = string.substr(count),
            removeEnd: count => string = string.substr(0, string.length - count),
            print: () => console.log(string)
        };
    })();

    for (let element of arr) {
        let [command, value] = element.split(/\s+/);
        getManipulator[command](value);
    }
}

solve(['append 123',
    'append 45',
    'removeStart 2',
    'removeEnd 1',
    'print']
);