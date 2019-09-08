function addItem() {
    const input = document.getElementById('newText');
    const itemsElements = document.getElementById('items');
    const newLi = createElement('li', input.value + ' ');

    const aElementAttributes = {name: 'href', value: '#'};
    const aElementEventListener = {type: 'click', func: deleteItem};
    const deleteLink = createElement('a', '[Delete]', aElementAttributes, aElementEventListener);

    appendChildren(newLi, [deleteLink]);
    appendChildren(itemsElements, [newLi]);

    clearText(input);

    function deleteItem() {
        itemsElements.removeChild(this.parentNode);
    }

    function createElement(tagElement, text, attributes, eventListener) {
        const element = document.createElement(tagElement);
        element.textContent = text;
        if (attributes) {
            element.setAttribute(attributes.name, attributes.value);
        }

        if (eventListener) {
            element.addEventListener(eventListener.type, eventListener.func);
        }
        return element;
    }

    function clearText(element) {
        element.value = ''
    }

    function appendChildren(parent, children) {
        children.forEach((child) => parent.appendChild(child));
    }
}
