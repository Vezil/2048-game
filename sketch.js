let score = 0;
let grid = emptyGrid();

function setup() {
    createCanvas(400, 400);
    noLoop();

    addNumber();
    addNumber();

    updateCanvas();
}

function updateCanvas() {
    background(255);
    drawGrid();

    select('#score').html(`Score: <b>${score}</b>`);
}
