export class FlowTimer {
    interruptTime = 0;

    constructor(params) {
        this.outputElement = params.output;
        this.startButton = params.startButton;
        this.interruptButton = params.interruptButton;
        this.continueButton = params.continueButton;
        this.stopButton = params.stopButton;
        this.defaultButtonDisplay = params.defaultButtonDisplay;
        this.setState('default');

        this.startButton.addEventListener("click", () => this.start())
        this.interruptButton.addEventListener("click", () => this.interrupt())
        this.continueButton.addEventListener("click", () => this.continue())
        this.stopButton.addEventListener("click", () => this.stop())
    }

    start() {
        if (this.state === "default" || this.state === "stopped") {
            this.startTime = new Date().getTime();
            this.setState('running');
            this.updateTimer();
        }
    }

    interrupt() {
        if (this.state === 'running') {
            this.startInterruptTime = new Date().getTime();
            this.setState('interrupted');
            this.clearTimeoutTimer();
        }
    }

    continue() {
        if (this.state === 'interrupted') {
            this.interruptTime += this.startInterruptTime - new Date().getTime();
            this.setState('running');
            this.updateTimer();
        }
    }

    stop() {
        if (this.state !== 'stopped') {
            this.setState('stopped');
            this.clearTimeoutTimer();
        }
    }

    setState(state) {
        this.state = state;
        this.updateUI();
    }

    updateTimer() {
        const timeDifference = (this.startTime - new Date().getTime() - this.interruptTime) / 1000;
        const timeDifferenceMilliseconds = Math.floor(timeDifference + 1) - timeDifference;

        this.updateTimerOutputElement(timeDifference);

        this.timeoutTimer = setTimeout(() => this.updateTimer(), 1000 - (timeDifferenceMilliseconds * 1000));
    }

    updateTimerOutputElement(timeDifference) {
        timeDifference = Math.abs(Math.floor(timeDifference + 1));

        const seconds = timeDifference % 60;
        const minutes = Math.floor(timeDifference / 60) % 60;
        const hours = Math.floor(timeDifference / 3600);

        const padSeconds = String(seconds).padStart(2, '0');
        const padMinutes = String(minutes).padStart(2, '0');
        const padHours = String(hours).padStart(2, '0');

        this.outputElement.innerText = `${padHours}:${padMinutes}:${padSeconds}`;
    }

    updateUI() {
        if (this.state === 'default') {
            this.showButton(this.startButton)
            this.hideButton(this.interruptButton)
            this.hideButton(this.continueButton)
            this.hideButton(this.stopButton)
        }

        else if (this.state === 'running') {
            this.showButton(this.interruptButton)
            this.showButton(this.stopButton)
            this.hideButton(this.continueButton)
            this.hideButton(this.startButton)
        }

        else if (this.state === 'interrupted') {
            this.showButton(this.continueButton)
            this.showButton(this.stopButton)
            this.hideButton(this.startButton)
            this.hideButton(this.interruptButton)
        }

        else if (this.state === 'stopped') {
            this.showButton(this.startButton)
            this.hideButton(this.stopButton)
            this.hideButton(this.continueButton)
            this.hideButton(this.interruptButton)
        }
    }

    clearTimeoutTimer() {
        window.clearTimeout(this.timeoutTimer);
    }

    hideButton(button) {
        button.style.display = 'none';
    }

    showButton(button) {
        button.style.display = this.defaultButtonDisplay;
    }
}
