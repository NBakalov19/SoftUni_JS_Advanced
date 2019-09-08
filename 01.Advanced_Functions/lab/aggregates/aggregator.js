function aggregator(input) {

    let arr = input;

    console.log('Sum = ', reducer(arr, (a, b) => a + b, 0));
    console.log('Min = ', reducer(arr, (a, b) => a < b ? a : b, Number.MAX_SAFE_INTEGER));
    console.log('Max = ', reducer(arr, (a, b) => a > b ? a : b, Number.MIN_SAFE_INTEGER));
    console.log('Product = ', reducer(arr, (a, b) => a * b, 1));
    console.log('Join = ', reducer(arr, (a, b) => `${a}${b}`, ''));

    function reducer(arr, operator, initialValue) {
        let result = initialValue;
        const tempArr = arr.slice(0);

        if (result === undefined) {
            result = tempArr.shift();
        }

        for (let element of tempArr) {
            result = operator(result, element);
        }

        return result;
    }
}

aggregator([2, 3, 10, 5]);