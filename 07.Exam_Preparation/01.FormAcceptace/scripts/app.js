function acceptance() {
    const warehouseElement = document.getElementById('warehouse');

    const shippingCompanyElement = document.querySelector('input[name="shippingCompany"]');
    const productNameElement = document.querySelector('input[name="productName"]');
    const productQuantityElement = document.querySelector('input[name="productQuantity"]');
    const productScrapeElement = document.querySelector('input[name="productScrape"]');

    const acceptanceButton = document.getElementById('acceptance');

    acceptanceButton.addEventListener('click', addStock);

    function addStock() {
        let shippingCompany = shippingCompanyElement.value;
        let productName = productNameElement.value;
        let productQuantity = Number(productQuantityElement.value);
        let productScrape = Number(productScrapeElement.value);

        if (shippingCompany && productName && productQuantity && productScrape) {
            const quantityInStock = productQuantity - productScrape;

            if (quantityInStock > 0) {
                const div = document.createElement('div');
                const p = document.createElement('p');
                p.textContent = `[${shippingCompany}] ${productName} - ${quantityInStock} pieces`;

                const outOfStockBtn = document.createElement('button');
                outOfStockBtn.textContent = 'Out of stock';
                outOfStockBtn.addEventListener('click', () => div.remove());

                div.appendChild(p);
                div.appendChild(outOfStockBtn);

                warehouseElement.appendChild(div);
            }
        }

        shippingCompanyElement.value = '';
        productNameElement.value = '';
        productQuantityElement.value = '';
        productScrapeElement.value = '';
    }
}