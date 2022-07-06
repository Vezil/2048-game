function isGameOver() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                return false;
            }

            if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
                return false;
            }

            if (j !== 3 && grid[i][j] === grid[i][j + 1]) {
                return false;
            }
        }
    }

    return true;
}

function isVictory() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 2048) {
                return true;
            }
        }
    }

    return false;
}

function keyPressed() {
    let isFlipped = false;
    let isTransposed = false;

    switch (keyCode) {
        case UP_ARROW:
            break;
        case DOWN_ARROW:
            grid = flipGrid(grid);

            isFlipped = true;

            break;
        case LEFT_ARROW:
            grid = transposeGrid(grid, 1);

            isTransposed = true;

            break;
        case RIGHT_ARROW:
            grid = transposeGrid(grid, 1);
            grid = flipGrid(grid);


            isTransposed = true;
            isFlipped = true;

            break;
        default:
            return;
    }

    const previousGrid = copyGrid(grid);

    for (let i = 0; i < 4; i++) {
        grid[i] = operate(grid[i]);
    }

    if (isFlipped) {
        grid = flipGrid(grid);
    }

    if (isTransposed) {
        grid = transposeGrid(grid, -1);
    }

    const isChange = compare(previousGrid, grid);

    if (isChange) {
        addNumber();
    }

    updateCanvas();

    if (isGameOver()) {
        console.log('GAME OVER');
    }

    if (isVictory()) {
        console.log('GAME WON!');
    }
}
