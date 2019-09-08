function addItem() {
    const input = document.getElementById('newItemText');
    const ulElement = document.getElementById('items');

    let newLiElement = document.createElement('li');
    newLiElement.textContent = input.value;
    ulElement.appendChild(newLiElement);

    input.value = '';
}