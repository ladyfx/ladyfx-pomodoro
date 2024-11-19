let timer;
let isRunning = false;
let isWorkMode = true;
let timeLeft = 25 * 60; // Default work time: 25 minutes
const workTime = 25 * 60; // Work time in seconds
const breakTime = 5 * 60; // Break time in seconds

const timeDisplay = document.getElementById("time");
const modeDisplay = document.getElementById("mode");
const startStopBtn = document.getElementById("start-stop");
const resetBtn = document.getElementById("reset");

// Convert seconds to MM:SS format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update the timer display
function updateDisplay() {
    timeDisplay.textContent = formatTime(timeLeft);
    modeDisplay.textContent = isWorkMode ? "work" : "break";
}

// Start the timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                // Switch between work and break modes
                isWorkMode = !isWorkMode;
                timeLeft = isWorkMode ? workTime : breakTime;
                updateDisplay();
            }
        }, 1000);
    }
}

// Pause the timer
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

// Reset the timer
function resetTimer() {
    pauseTimer();
    isWorkMode = true;
    timeLeft = workTime;
    updateDisplay();
}

// Event listeners for buttons
startStopBtn.addEventListener("click", () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener("click", resetTimer);

// Initialize display
updateDisplay();
