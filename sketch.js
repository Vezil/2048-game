const boardSize = 4;
const value1 = 2;
const value2 = 4;
const valRatio = 0.9;
const newTiles = [];
let canvasSize = 500;
let tileSpeed = 20;
let game;
let canvas;
let isUpdate = true;

function setup() {
    resetGame();

    const resetButton = createButton('RESET');

    resetButton.mousePressed(resetGame);
}

function setCanvasSize() {
    const sizes = [660, 500, 750, 1050, 1400, 1350, 1350, 1650, 500];
    const values = ['3', '4', '5', '6', '7', '8', '9', '10'];

    const index = values.indexOf(boardSize.toString());

    if (index < 0) {
        index = 8;
    }

    canvasSize = sizes[index];
}

function resetGame() {
    setCanvasSize();

    const zoom = (500 / canvasSize) * 100;
    tileSpeed = 4000 / zoom;

    canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent('game-wrapper');
    canvas.style('zoom', zoom + '%');

    noStroke();

    game = new Game(canvasSize, boardSize, value1, value2, valRatio);

    game.start();

    console.log(game,'game')

    isUpdate = true;
}

function keyPressed() {
    if (isUpdate) {
        return;
    }

    let isMoveMade = false;

    switch (keyCode) {
        case UP_ARROW:
            isMoveMade = game.moveVertical(true);
            break;
        case RIGHT_ARROW:
            isMoveMade = game.moveHorizontal(false);
            break;
        case DOWN_ARROW:
            isMoveMade =  game.moveVertical(false);
            break;
        case LEFT_ARROW:
            isMoveMade =  game.moveHorizontal(true);
            break;
        default:
            return;
    }

    isUpdate = isMoveMade;
}

function updateBoard() {
    textAlign(CENTER, CENTER);

    let offset = game.tileSize / 2;

    newTiles.length = 0;

    fill(153);

    game.positions.forEach(position => {
        rect(position.x - offset, position.y - offset, game.tileSize, game.tileSize);
    });

    isUpdate = false;

    game.tiles.forEach(tile => {
        fill(tile.color());
        rect(tile.x - offset, tile.y - offset, tile.width, tile.height);

        fill(76);
        textStyle(tile.isNew ? BOLD : NORMAL);
        textSize(tile.textSize());
        text(tile.value, tile.x, tile.y);

        if (tile.isNew) {
            newTiles.push(tile);
        }

        if (tile.setNewPosition(tileSpeed)) {
            isUpdate = true;
        }
    });

    select('#score').html(game.score);
}

function draw() {
    if (!isUpdate) {
        return;
    }

    background(76);
    updateBoard();

    if (isUpdate) {
        return;
    }

    newTiles.forEach(tile => {
        tile.isNew = false
    });

    game.addTile();

    updateBoard();


    if (!game.hasValidMove()) {
        console.log('GAME OVER');
    }

    if (game.highestValue >= 2048) {
        console.log('YOU WON!');
    }
}
