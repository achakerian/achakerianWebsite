const canvas = document.getElementById('flowFieldCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flowFieldAnimation;
let hue = 0;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.angle = 0;
        this.size = Math.random() * 3 + 1;
        this.hue = hue;
        this.update();
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'hsl(' + this.hue + ', 100%, 50%)';
        ctx.fill();
    }

    update() {
        this.angle = Math.cos(this.x * 0.01) * Math.sin(this.y * 0.01);
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
        this.hue += 0.5;
    }
}

const particlesArray = [];

function init() {
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    hue += 0.5;
    flowFieldAnimation = requestAnimationFrame(animate);
}

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cancelAnimationFrame(flowFieldAnimation);
    init();
    animate();
});

init();
animate();
