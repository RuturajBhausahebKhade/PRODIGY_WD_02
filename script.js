let timer;
let isRunning = false;
let startTime;
let lapTimes = [];

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - (lapTimes.length > 0 ? lapTimes[lapTimes.length - 1] : 0);
        timer = setInterval(updateDisplay, 10);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    document.getElementById("milliseconds").innerText = "000";
    lapTimes = [];
    updateLapList();
}

function lapTime() {
    if (isRunning) {
        const lap = Date.now() - startTime;
        lapTimes.push(lap);
        updateLapList();
    }
}

function updateLapList() {
    const lapList = document.getElementById("lapList");
    lapList.innerHTML = "";
    lapTimes.forEach((lap, index) => {
        const lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapList.appendChild(lapItem);
    });
}

function updateDisplay() {
    const elapsedMilliseconds = Date.now() - startTime;
    const formattedTime = formatTime(elapsedMilliseconds);
    const [minutes, seconds, milliseconds] = formattedTime.split(":");
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
    document.getElementById("milliseconds").innerText = milliseconds;
}

function formatTime(milliseconds) {
    const mins = Math.floor(milliseconds / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    const ms = milliseconds % 1000;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}:${ms.toString().padStart(3, "0")}`;
}
