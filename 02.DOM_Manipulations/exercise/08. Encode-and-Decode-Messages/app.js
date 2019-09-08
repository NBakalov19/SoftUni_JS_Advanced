function encodeAndDecodeMessages() {
    const encodeButton = document.querySelectorAll('#main div > button')[0];
    const decodeButton = document.querySelectorAll('#main div > button')[1];

    const sendMessageTextArea = document.querySelectorAll('#main div > textarea')[0];
    const decodedMessageTextArea = document.querySelectorAll('#main div > textarea')[1];


    encodeButton.addEventListener('click', function encryptMessage() {
        const messageToEncode = sendMessageTextArea.value;
        let encryptedMessage = '';

        for (const symbol of messageToEncode) {
            encryptedMessage += String.fromCharCode(symbol.charCodeAt(0) + 1)
        }

        decodedMessageTextArea.value = encryptedMessage;
        sendMessageTextArea.value = '';

    });

    decodeButton.addEventListener('click', function () {
        let decodedMessage = '';
        let encryptedMessage = decodedMessageTextArea.value;
        for (let symbol of encryptedMessage) {
            decodedMessage += String.fromCharCode(symbol.charCodeAt(0) - 1)
        }
        decodedMessageTextArea.value = decodedMessage;
    })
}
