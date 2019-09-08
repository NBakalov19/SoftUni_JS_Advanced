function solve() {
    const elements = {
        bookTitle: document.querySelector('body > form > input[type=text]:nth-child(2)'),
        bookYear: document.querySelector('body > form > input[type=number]:nth-child(4)'),
        bookPrice: document.querySelector('body > form > input[type=number]:nth-child(6)'),
        totalProfit: document.querySelector('body > h1:nth-child(3)'),
        oldBooksSection: document.querySelector('#outputs > section:nth-child(1) > div'),
        newBooksSection: document.querySelector('#outputs > section:nth-child(2) > div'),
    };

    const addBookBtn = document.querySelector('body > form > button');
    addBookBtn.addEventListener('click', (ev) => {

        ev.preventDefault();

        function buyBook(ev) {
            const parentDiv = ev.target.parentNode;

            let buttonTextContent = parentDiv.children[1].textContent;
            let tokens = buttonTextContent.split(' ');
            let price = Number(tokens[tokens.length - 2]);

            let totalProfitTokens = elements.totalProfit.textContent.split(' ');
            let totalProfitPrice = Number(totalProfitTokens[totalProfitTokens.length - 2]);

            totalProfitPrice += price;

            elements.totalProfit.textContent = `Total Store Profit: ${totalProfitPrice.toFixed(2)} BGN`

            parentDiv.remove();
        }

        let bookTitle = elements.bookTitle.value;
        let bookYear = elements.bookYear.value;
        let bookPrice = bookYear >= 2000 ? Number(elements.bookPrice.value) : 0.85 * Number(elements.bookPrice.value);
        const isNumber = !isNaN(bookYear) && !isNaN(bookPrice) && bookYear > 0 && bookPrice > 0;


        elements.bookTitle.value = '';
        elements.bookYear.value = '';
        elements.bookPrice.value = '';

        if (bookTitle && isNumber) {
            const bookInfo = `${bookTitle} [${bookYear}]`;
            let priceInfo = `Buy it only for ${bookPrice.toFixed(2)} BGN`;

            let buyButton = createHtmlElement('button', '', priceInfo);
            buyButton.addEventListener('click', buyBook);

            if (bookYear >= 2000) {

                let div = createHtmlElement('div', 'book');
                let p = createHtmlElement('p', '', bookInfo);
                const moveToOldSectionBtn =
                    createHtmlElement('button', '', 'Move to old section');

                moveToOldSectionBtn.addEventListener('click', function () {
                    elements.newBooksSection.removeChild(div);
                    div.removeChild(moveToOldSectionBtn);
                    div.removeChild(buyButton);
                    buyButton = createHtmlElement('button', '',
                        `Buy it only for ${(bookPrice * 0.85).toFixed(2)} BGN`);
                    buyButton.addEventListener('click', buyBook);
                    div.appendChild(buyButton);
                    elements.oldBooksSection.appendChild(div);
                });

                div.appendChild(p);
                div.appendChild(buyButton);
                div.appendChild(moveToOldSectionBtn);

                elements.newBooksSection.appendChild(div);

            } else {
                let div = createHtmlElement('div', 'book');
                let p = createHtmlElement('p', '', bookInfo);
                div.appendChild(p);
                div.appendChild(buyButton);

                elements.oldBooksSection.appendChild(div);
            }
        }
    });

    function createHtmlElement(tagName, className, textContent) {
        let currElement = document.createElement(tagName);

        if (className) {
            if (typeof className === 'string') {
                currElement.classList.add(className);
            } else if (typeof className === 'object') {
                currElement.classList.add(...className);
            }
        }

        if (textContent) {
            currElement.textContent = textContent;
        }

        return currElement;
    }
}