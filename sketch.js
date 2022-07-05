let grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

function setup() {
    createCanvas(400, 400);

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

function copyGrid(grid) {
    const gridCopy = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            gridCopy[i][j] = grid[i][j];
        }
    }

    return gridCopy;
}

function combineGrid(row) {
    for (let i = 3; i >= 1; i--) {
        const firstElement = row[i];
        const secondElement = row[i - 1];

        if (firstElement === secondElement) {
            row[i] = firstElement + secondElement;
            row[i - 1] = 0;

            break;
        }
    }

    return row;
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

function slideGrid(row) {
    const spotsInRowWithValues = row.filter(value => value);
    const spotsInRowWithoutValues = 4 - spotsInRowWithValues.length;
    const zeros = Array(spotsInRowWithoutValues).fill(0);

    return spotsInRowWithValues.concat(zeros);
}

function compare(previousGrid, grid) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (previousGrid[i][j] !== grid[i][j]) {
                return true;
            }
        }
    }

    return false;
}

function flipGrid(grid) {
    for (let i = 0; i < 4; i++) {
        grid[i].reverse();
    }

    return grid;
}

function rotateGrid(grid) {
    const newGrid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newGrid[i][j] = grid[j][i];
        }
    }

    return newGrid;
}

function keyPressed() {
    let isFlipped = false;
    let isRotated = false;

    if (keyCode === UP_ARROW) {
        //
    } else if (keyCode === DOWN_ARROW) {
        grid = flipGrid(grid);

        isFlipped = true;
    } else if (keyCode === LEFT_ARROW) {
        grid = rotateGrid(grid);

        isRotated = true;
    } else if (keyCode === RIGHT_ARROW) {
        grid = rotateGrid(grid);
        grid = flipGrid(grid);

        isRotated = true;
        isFlipped = true;
    } else return;

    const previousGrid = copyGrid(grid);

    for (let i = 0; i < 4; i++) {
        grid[i] = operate(grid[i]);
    }

    if (isFlipped) {
        flipGrid(grid);
    }

    if (isRotated) {
        grid = rotateGrid(grid);
        grid = rotateGrid(grid);
        grid = rotateGrid(grid);
    }

    const isChange = compare(previousGrid, grid);

    if (isChange) {
        addNumber();
    }
}

function operate(row) {
    row = slideGrid(row);
    row = combineGrid(row);
    row = slideGrid(row);

    return row;
}

function draw() {
    background(255);

    drawGrid();
}
