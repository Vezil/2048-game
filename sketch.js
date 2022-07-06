let score = 0;
let grid = emptyGrid();

function setup() {
    createCanvas(400, 400);
    noLoop();

    for (let i = 0; i < 7; i++) {
        addNumber(i);
    }

    updateCanvas();
}

function updateCanvas() {
    background(255);
    drawGrid();

    select('#score').html(`Score: <b>${score}</b>`);
}
