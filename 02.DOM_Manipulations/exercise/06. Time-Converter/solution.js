function attachEventsListeners() {
    const daysTextElement = document.getElementById('days');
    const hoursTextElement = document.getElementById('hours');
    const minutesTextElement = document.getElementById('minutes');
    const secondsTextElement = document.getElementById('seconds');

    Array.from(document.querySelectorAll('input[type="button"]'))
        .forEach(b => b.addEventListener('click', convert));

    function convert(ev) {
        let totalSeconds = secondsTextElement.value;

        switch (ev.target.id) {
            case 'daysBtn':
                totalSeconds = daysTextElement.value * 86400;
                break;
            case 'hoursBtn':
                totalSeconds = hoursTextElement.value * 3600;
                break;
            case 'minutesBtn':
                totalSeconds = minutesTextElement.value * 60;
                break;
        }

        daysTextElement.value = totalSeconds / 86400;
        hoursTextElement.value = totalSeconds / 3600;
        minutesTextElement.value = totalSeconds / 60;
        secondsTextElement.value = totalSeconds;
    }
}