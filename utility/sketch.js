import Game from './game.js';

const FONT_DARK = 20;
const FONT_BRIGHT = 240;

const boardSize = 4;
const canvasSize = 500;
const firstValue = 2;
const secondValue = 4;
const newTiles = [];

let tileSpeed = 20;
let isUpdate = true;
let tileBackgroundImage = null;
let game = null;
let canvas = null;

new p5(function (p5) {
    p5.preload = function () {
        tileBackgroundImage = p5.loadImage('./images/tile-background-image.png');
    };

    p5.setup = function () {
        resetGame();

        const resetButton = p5.createButton('NEW GAME');

        resetButton.id('reset-game-button');

        resetButton.mousePressed(resetGame);
    };

    p5.keyPressed = function () {
        if (p5.keyCode === 82) {
            resetGame();

            return;
        }

        if (isUpdate) {
            return;
        }

        let isMoveMade = false;

        switch (p5.keyCode) {
            case p5.UP_ARROW:
                isMoveMade = game.moveVertical(true);
                break;
            case p5.RIGHT_ARROW:
                isMoveMade = game.moveHorizontal(false);
                break;
            case p5.DOWN_ARROW:
                isMoveMade = game.moveVertical(false);
                break;
            case p5.LEFT_ARROW:
                isMoveMade = game.moveHorizontal(true);
                break;
            default:
                return;
        }

        isUpdate = isMoveMade;
    };

    p5.draw = function () {
        if (!isUpdate) {
            return;
        }

        p5.background(76);
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
            game.setBestScore();

            endGameStyling('GAME', 'OVER!');
        }

        if (game.highestTileValue >= 2048) {
            game.setBestScore();

            endGameStyling('YOU', 'WON!');
        }
    };

    function resetGame() {
        if (!p5.isLooping()) {
            p5.loop();
        }

        const zoom = (500 / canvasSize) * 100;
        tileSpeed = 4000 / zoom;

        canvas = p5.createCanvas(canvasSize, canvasSize);
        canvas.parent('game-wrapper');
        canvas.style('zoom', zoom + '%');

        p5.noStroke();

        game = new Game(p5, canvasSize, boardSize, firstValue, secondValue);

        game.start();

        isUpdate = true;
    }

    function updateBoard() {
        p5.textAlign(p5.CENTER, p5.CENTER);

        let offset = game.tileSize / 2;

        newTiles.length = 0;

        p5.fill(153);

        game.positions.forEach(position => {
            p5.image(tileBackgroundImage, position.x - offset, position.y - offset, game.tileSize, game.tileSize);
        });

        isUpdate = false;

        game.tiles.forEach(tile => {
            p5.fill(tile.color());
            p5.rect(tile.x - offset, tile.y - offset, tile.width, tile.height);

            const isFontBright = (tile.value >= 128 && tile.value < 2048) || tile.value === 4;

            p5.fill(isFontBright ? FONT_BRIGHT : FONT_DARK);

            p5.textStyle(p5.NORMAL);
            p5.textSize(tile.textSize());
            p5.text(tile.value, tile.x, tile.y);

            if (tile.isNew) {
                newTiles.push(tile);
            }

            if (tile.setNewPosition(tileSpeed)) {
                isUpdate = true;
            }
        });

        p5.select('#score').html(`Score: ${game.score}`);
        p5.select('#best-score').html(`Best Score: ${game.bestScore}`);
    }

    function endGameStyling(firstText, secondText) {
        p5.background(76, 76, 76, 170);
        p5.fill(0, 102, 153);
        p5.textStyle(BOLD);
        p5.stroke(0, 255, 255);
        p5.strokeWeight(3);
        p5.textSize(72);
        p5.text(firstText, canvasSize / 2, canvasSize / 2 - 35);
        p5.text(secondText, canvasSize / 2, canvasSize / 2 + 35);

        p5.noLoop();
    }
});
