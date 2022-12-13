const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const title = document.getElementById("title");

const score = document.getElementById("score");

let animationId;
let pastTime;

let y1 = screen.height / 2;
let y2 = screen.height / 2;

let score1 = 0;
let score2 = 0;

let x = canvas.width / 2;
let y = canvas.height / 2;

let game = false;

let speedX = -5;
let speedY = 5;

let secondPlayer = false;

// let gameOver = document.getElementById("text");
// gameOver.innerHTML = "Start";


window.onload = startAnimation;


function startAnimation() {
	frame();
	pastTime = 0;
}

function frame() {
	animationId = requestAnimationFrame(frame);

	let time = Date.now();
	let delta = time - pastTime;
	let fps = Math.floor(1000 / delta);

	if (fps <= 30) {
		draw();
		pastTime = Date.now();
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "white";
    ctx.fillRect(50, y1 - 50, 20, 100);
    ctx.fillRect(canvas.width - 70, y2 - 50, 20, 100);

    ctx.fillRect(x-10, y-10, 20, 20);

    x += speedX;
    y += speedY;

    if (x <= 70 && x >= 50 && y1 - 50 <= y && y1 + 50 >= y) {
        speedX *= -1;
        speedX += 1;
        speedY += (y - y1) * 0.1;
    }
    if (x <= canvas.width - 50 && x >= canvas.width - 70 && y2 - 50 <= y && y2 + 50 >= y) {
        speedX *= -1;
        speedX -= 1;
        speedY += (y - y2) * 0.1;
    }
    if (y <= 0) {
        speedY *= -1;
    }
    if (y >= canvas.height) {
        speedY *= -1;
    }
    if (x <= 0) {
        score2 += 1;
        score.innerHTML = score1 + ":" + score2;
        x = canvas.width / 2;
        y = canvas.height / 2;
        speedX = 5;
        speedY = 5;
        
    }
    if (x >= canvas.width) {
        score1 += 1;
        score.innerHTML = String(score1) + ":" + String(score2);
        x = canvas.height / 2;
        y = canvas.height / 2;
        speedX = 5;
        speedY = 5;
    }

    if (!secondPlayer) {
        if (Math.abs(y - y2) >= 100) {
            y2 = y;
        }
    }
}

canvas.addEventListener('mousemove', function (e) {
    y1 = e.pageY - e.target.offsetTop;
    // y2 = y1;
})

document.addEventListener('keydown', function (event) {
    if (secondPlayer) {
        if (event.key == "ArrowUp") {
            y2 -= 30;
        }
        if (event.key == "ArrowDown") {
            y2 += 30;
        }
    }
})