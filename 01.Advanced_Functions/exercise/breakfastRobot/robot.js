function solve() {
    return (function () {
        const storage = {
            protein: 0,
            carbohydrate: 0,
            fat: 0,
            flavour: 0
        };

        const recipes = {
            apple: {carbohydrate: 1, flavour: 2},
            lemonade: {carbohydrate: 10, flavour: 20},
            burger: {carbohydrate: 5, fat: 7, flavour: 3},
            eggs: {protein: 5, fat: 1, flavour: 1},
            turkey: {protein: 10, carbohydrate: 10, fat: 10, flavour: 10}
        };

        return input => {
            let [command, ...args] = input.split(/\s+/);
            let output = '';

            if (command === 'restock') {
                let [microElement, quantity] = [args[0], Number(args[1])];
                storage[microElement] += quantity;
                output = "Success";
            } else if (command === 'prepare') {
                let [recipe, quantity] = [args[0], Number(args[1])];
                let missingIngredient =
                    Object.entries(recipes[recipe])
                        .find(
                            ([name, requiredQuantity]) =>
                                storage[name] < requiredQuantity * quantity
                        );
                if (missingIngredient) {
                    output = `Error: not enough ${missingIngredient[0]} in stock`;
                } else {
                    for (const ingredient in recipes[recipe]) {
                        storage[ingredient] -= recipes[recipe][ingredient] * quantity;
                    }
                    output = 'Success';
                }

            } else if (command === 'report') {
                output = `protein=${storage.protein} carbohydrate=${storage.carbohydrate}` +
                    ` fat=${storage.fat} flavour=${storage.flavour}`;
            }
            console.log(output);
            return output;
        }

    })()

}

let manager = solve();

manager('restock carbohydrate 10');
manager('restock flavour 10');
manager('prepare apple 1');
manager('restock fat 10');
manager('prepare burger 1');
manager('report');