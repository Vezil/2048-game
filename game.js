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

    updateCanvas();

    if (isGameOver()) {
        console.log('GAME OVER');
    }
}
