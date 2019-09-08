function stopwatch() {
    let interval;
    let startBtn = document.getElementById('startBtn');
    let stopBtn = document.getElementById('stopBtn');
    startBtn.addEventListener('click', startTime);
    stopBtn.addEventListener('click', stopTime);
    let seconds = 0;

    function stopTime() {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        clearInterval(interval);
        seconds = 0;
    }

    function startTime() {
        document.getElementById('time').textContent =
            ('0' + Math.floor(seconds / 60)).slice(-2) + ':' + ('0' + seconds % 60).slice(-2);
        startBtn.disabled = true;
        stopBtn.disabled = false;
        interval = setInterval(() => {
            seconds++;
            document.getElementById('time').textContent =
                ('0' + Math.floor(seconds / 60)).slice(-2) + ':' + ('0' + seconds % 60).slice(-2);
        }, 1000)
    }
}
