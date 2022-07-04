const grid = [];

function setup() {
    createCanvas(400, 400);

    grid.push([0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]);

    addNumber();
    addNumber();
}

function addNumber() {
    const options = [];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                options.push({ x: i, y: j });
            }
        }
    }

    if (options.length > 0) {
        const spot = random(options);
        const randomNumber = random(1);

        grid[spot.x][spot.y] = randomNumber > 0.5 ? 2 : 4;
    }
}

function drawGrid() {
    const width = 100;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            noFill();
            strokeWeight(2);
            stroke(0);
            rect(width * i, width * j, width, width);

            spotValue = grid[i][j];

            if (spotValue !== 0) {
                textAlign(CENTER, CENTER);
                textSize(64);
                fill(0);
                noStroke();
                text(spotValue, width * i + width / 2, width * j + width / 2);
            }
        }
    }
}

function draw() {
    background(255);

    drawGrid();
}
