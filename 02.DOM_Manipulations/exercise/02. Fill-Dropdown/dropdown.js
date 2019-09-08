function addItem() {
    const itemText = document.getElementById('newItemText');
    const itemValue = document.getElementById('newItemValue');

    const dropDownMenu = document.getElementById('menu');

    let newOptionElement = document.createElement('option');

    newOptionElement.textContent = itemText.value;
    newOptionElement.value = itemValue.value;

    dropDownMenu.appendChild(newOptionElement);

    itemText.value = '';
    itemValue.value = '';
}