function toggle() {
    const button = document.querySelector('.button');
    const elementToDisplay = document.querySelector('#extra');

    if (elementToDisplay.style.display === 'none') {
        elementToDisplay.style.display = 'block';
        button.textContent = 'Less';
    } else {
        elementToDisplay.style.display = 'none';
        button.textContent = 'More';
    }
}