function focus() {
    const elements = document.getElementsByTagName('input');

    function focusedElement(ev) {
        ev.target.parentNode.className = 'focused';
    }

    function blurElement(ev) {
        ev.target.parentNode.className = '';
    }

    for (const element of elements) {
        element.addEventListener('focus', focusedElement);
        element.addEventListener('blur', blurElement);
    }
}