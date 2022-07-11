const FONT_DARK = 20;
const FONT_BRIGHT = 240;
const boardSize = 4;
const firstValue = 2;
const secondValue = 4;
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

    game = new Game(canvasSize, boardSize, firstValue, secondValue);

    game.start();

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
            isMoveMade = game.moveVertical(false);
            break;
        case LEFT_ARROW:
            isMoveMade = game.moveHorizontal(true);
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

        const isFontBright = (tile.value >= 128 && tile.value < 2048) || tile.value === 4;

        fill(isFontBright ? FONT_BRIGHT : FONT_DARK);

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

    select('#score').html(`Score: ${game.score}`);
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
        tile.isNew = false;
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
