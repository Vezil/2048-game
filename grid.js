function emptyGrid() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
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
    const gridCopy = emptyGrid();

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

            score += row[i];

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

            spotValue = grid[i][j];

            
            stroke(0);
            
        

            if (spotValue !== 0) {
                fill(customStyles[spotValue].color);
            } else {
                noFill();
            }

     

            rect(width * i, width * j, width, width);

            if (spotValue !== 0) {
                const fontSize = map(log(spotValue), 0, log(2048), 64, 16);

                textAlign(CENTER, CENTER);
                noStroke();
                fill(0);
                textSize(fontSize);

                if(spotValue >= 128){
                    fill(255);
                }

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
    const newGrid = emptyGrid();

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newGrid[i][j] = grid[j][i];
        }
    }

    return newGrid;
}

function operate(row) {
    row = slideGrid(row);
    row = combineGrid(row);
    row = slideGrid(row);

    return row;
}
