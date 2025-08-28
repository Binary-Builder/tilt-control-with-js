class PhoneControls {
    constructor(game) {
        this.game = game;
        this.tiltThreshold = 25; // Tilt angle in degrees to trigger an action
        this.lastTiltTime = 0;
        this.tiltDelay = 500; // Delay in milliseconds to prevent multiple rapid triggers

        this.handleOrientation = this.handleOrientation.bind(this);
        this.addListeners();
    }

    addListeners() {
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", this.handleOrientation);
        } else {
            console.warn("Device orientation not supported on this browser.");
            alert("This game requires device orientation support. Please try a different browser or device.");
        }
    }

    handleOrientation(event) {
        const currentTime = Date.now();
        if (currentTime - this.lastTiltTime < this.tiltDelay) {
            return; // Exit if a tilt was just triggered
        }

        const { beta, gamma } = event; // beta is front-to-back tilt, gamma is side-to-side
        const { tiltThreshold } = this;

        // Check for a landscape orientation (phone held on forehead)
        // Gamma will be close to 90 or -90 when the phone is held on its side
        // Beta will be close to 0 when the phone is flat
        if (Math.abs(gamma) > 80 && Math.abs(beta) < 15) {
            // Player is holding the phone correctly in landscape mode
            if (beta > tiltThreshold) {
                // Tilt down (Correct Guess)
                this.game.correctGuess();
                this.lastTiltTime = currentTime;
            } else if (beta < -tiltThreshold) {
                // Tilt up (Skip Word)
                this.game.skipWord();
                this.lastTiltTime = currentTime;
            }
        }
    }
} //this mofo not working bruh