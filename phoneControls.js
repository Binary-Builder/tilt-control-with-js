class PhoneControls {
    constructor(canvas) {
        this.canvas = canvas;
        this.tilt = 0;
        this.#addListeners();
    }

    #addListeners() {
        window.addEventListener("deviceorientation", (e) => {
            this.tilt = e.gamma * Math.PI / 180;
            const canvasAngle = -this.tilt;
            this.canvas.style.transform = 
                "translate(-50%,-50%) rotate("+ canvasAngle + "rad)";

        });
    }
}