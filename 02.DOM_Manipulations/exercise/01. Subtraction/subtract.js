function subtract() {
    const firstInputField = document.getElementById('firstNumber').value;
    const secondInputField = document.getElementById('secondNumber').value;

    let resultElement = document.getElementById('result');

    resultElement.textContent = Number(firstInputField) - Number(secondInputField);
}