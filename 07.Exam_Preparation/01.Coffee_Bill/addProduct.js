function addProduct() {
    let productElement = document.getElementsByTagName('input')[0];
    let priceElement = document.querySelector('#add-product > label:nth-child(3) > input[type=number]');
    let table = document.getElementById('product-list');

    let product = productElement.value;
    let price = priceElement.value;

    if (product && Number(price) > 0) {

        const row = document.createElement('tr');
        let productColumn = document.createElement('td');
        let priceColumn = document.createElement('td');

        productColumn.textContent = product;
        priceColumn.textContent = price;

        row.appendChild(productColumn);
        row.appendChild(priceColumn);

        table.appendChild(row);

        let totalSumElement = document.querySelector('#bill > tfoot > tr > td:nth-child(2)');

        totalSumElement.textContent = Number(totalSumElement.textContent) + Number(price);
    }

    document.getElementsByTagName('input')[0].value = '';
    document.getElementsByTagName('input')[1].value = '';
}