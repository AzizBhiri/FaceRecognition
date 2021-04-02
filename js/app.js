function atomsTracker() {
    const canvas = document.getElementById('atoms');
    const ctx = canvas.getContext('2d');
    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;

    let particleArray = [];
    const nbr = window.innerWidth / 5;

    let mouse = {
        x: null, y: null, radius: (canvas.width / 150) * (canvas.height / 150)
    };

    window.addEventListener('mousemove', function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.fill();
            ctx.strokeStyle = this.color;
            ctx.stroke();
        }

        update() {
            if (this.x + this.size * 2 > canvas.width || this.x - this.size * 2 < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y + this.size * 2 > canvas.height || this.y - this.size * 2 < 0) {
                this.directionY = -this.directionY;
            }

            //mouse interactivity
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 5) {
                    this.x += 2;
                    this.size += 0.15;
                }
                if (mouse.x > this.x && this.x > this.size * 5) {
                    this.x -= 2;
                    this.size += 0.15;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 5) {
                    this.y += 2;
                    this.size += 0.15;
                }
                if (mouse.y > this.y && this.y > this.size * 5) {
                    this.y -= 2;
                    this.size += 0.15;
                }
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();

        }
    }

    function init() {
        particleArray = [];
        for (let i = 0; i < nbr; i++) {
            // let size = Math.random() * 10;
            let size = Math.random() * 20;
            let x = (Math.random() * ((innerWidth - size * 2) - size * 2)) + size * 2;
            let y = (Math.random() * ((innerHeight - size * 2) - size * 2)) + size * 2;
            let directionX = (Math.random() - 0.5) * 2;
            let directionY = (Math.random() - 0.5) * 2;
            let color = '#ffffff';
            particleArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        let opacityValue = 1;
        let pattern = [10, 20];
        for (let a = 0; a < particleArray.length; a++) {
            for (let b = a; b < particleArray.length; b++) {
                let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x)) + ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y));
                if (distance < (canvas.height / 7) * (canvas.width / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(0,0,0,' + opacityValue + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particleArray[a].x, particleArray[a].y);
                    ctx.lineTo(particleArray[b].x, particleArray[b].y);
                    ctx.stroke();
                    ctx.setLineDash(pattern);
                }

            }

        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
        }
        //connect();
    }

    window.addEventListener('resize', function () {
        canvas.height = innerHeight;
        canvas.width = innerWidth;
    })

    window.addEventListener('mouseout', function () {
        mouse.x = undefined;
        mouse.y = undefined;
    })

    init();
    animate();

}

atomsTracker();
console.log('success 1!');