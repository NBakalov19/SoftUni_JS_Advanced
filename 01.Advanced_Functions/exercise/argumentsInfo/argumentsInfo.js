function argumentInfo() {

    let argumentsInfo = {};

    for (const arg of arguments) {
        let type = typeof arg;

        if (type === 'object') {
            console.log(`${type}: `);
        } else {
            console.log(`${type}: ${arg}`);
        }

        if (argumentsInfo.hasOwnProperty(type)) {
            argumentsInfo[type]++;
        } else {
            argumentsInfo[type] = 1;
        }
    }

    argumentsInfo = Object.entries(argumentsInfo)
        .sort((a, b) => b[1] - a[1])
        .forEach(element =>
            console.log(`${element[0]} = ${element[1]}`));


}

argumentInfo('cat', 42, function () {
    console.log('Hello world!');
});