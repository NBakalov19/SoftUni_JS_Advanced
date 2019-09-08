let functionalSum = (function () {
    let sum = 0;

    return function add(number) {
        sum += number;
        add.toString = function () {
            return sum
        };
        return add;
    }
})();

console.log(functionalSum(1)(3)(15).toString());