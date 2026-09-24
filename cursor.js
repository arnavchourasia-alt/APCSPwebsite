
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = [];

document.addEventListener("mousemove", function(e) {
    points.push([e.clientX, e.clientY, Date.now()]);

    if (points.length > 20) {
        points.shift();
    }
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let now = Date.now();

    points = points.filter(function(point) {
        return now - point[2] < 500;
    });

    if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);

        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
        }

        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.shadowColor = "red";
        ctx.shadowBlur = 15;
        ctx.lineCap = "round";

        ctx.stroke();
    }

    requestAnimationFrame(draw);
}

draw();

