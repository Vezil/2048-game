import Tile from './tile.js';
export default class Game {
    constructor(p5,canvasSize, boardSize, firstValue, secondValue) {
        this.p5 = p5;
        this.tiles = [];
        this.positions = [];
        this.canvasSize = canvasSize;
        this.boardSize = boardSize;
        this.tileSize = (0.8 * canvasSize) / boardSize;
        this.spacing = (0.2 * canvasSize) / (boardSize + 1);
        this.firstValue = firstValue;
        this.secondValue = secondValue;
        this.valueRatio = 0.9;
        this.score = 0;
        this.bestScore = window.localStorage.getItem('best-score') || 0;
        this.highestTileValue = 0;
    }

    start() {
        this.loadPositions();
        this.addTile();
    }

    loadPositions() {
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                const positionX = this.spacing + i * this.spacing + this.tileSize / 2 + i * this.tileSize;
                const positionY = this.spacing + j * this.spacing + this.tileSize / 2 + j * this.tileSize;

                this.positions.push({ x: positionX, y: positionY, isOpen: true });
            }
        }
    }

    addTile() {
        this.updatePositions();

        const value = this.p5.random(1) < this.valueRatio ? this.firstValue : this.secondValue;
        const position = this.p5.random(this.positions.filter(position => position.isOpen === true));

        if (!position) {
            return;
        }

        position.isOpen = false;

        const newTile = new Tile(this.p5, this.tileSize, this.tileSize, value, position.x, position.y);

        this.tiles.push(newTile);
    }

    moveHorizontal(isLeft) {
        const newTilesY = new Set(this.tiles.map(tile => tile.y));
        const tilesPositionY = Array.from(newTilesY);
        let gap = this.tileSize + this.spacing;
        let isMoveMade = false;

        if (isLeft) {
            gap *= -1;
        }

        const firstTilePositionX = isLeft
            ? this.spacing + this.tileSize / 2
            : this.canvasSize - this.spacing - this.tileSize / 2;

        tilesPositionY.forEach(tilePositionY => {
            const tilesRow = this.tiles.filter(tile => tile.y === tilePositionY);
            let tilesMergedCount = 0;

            if (isLeft) {
                tilesRow.sort((tileA, tileB) => tileA.x - tileB.x);
            } else {
                tilesRow.sort((tileA, tileB) => tileB.x - tileA.x);
            }

            for (let i = 0; i < tilesRow.length; i++) {
                const tile = tilesRow[i];

                tile.newX = firstTilePositionX - gap * i + gap * tilesMergedCount;

                if (tile.x !== tile.newX) {
                    isMoveMade = true;
                }

                if (i === 0) {
                    continue;
                }

                const previousTile = tilesRow[i - 1];

                if (previousTile.isMerged || previousTile.value !== tile.value) {
                    continue;
                }

                previousTile.isRemoved = true;
                tile.value *= 2;
                this.score += tile.value;

                this.newScoreAnimation(tile.value);

                tile.isMerged = true;
                tile.newX = previousTile.newX;

                tilesMergedCount++;
                isMoveMade = true;
            }
        });

        return isMoveMade;
    }

    moveVertical(isUp) {
        const newTilesX = new Set(this.tiles.map(tile => tile.x));
        const tilesPositionX = Array.from(newTilesX);
        let gap = this.tileSize + this.spacing;
        let isMoveMade = false;

        if (isUp) {
            gap *= -1;
        }

        const firstTilePositionY = isUp
            ? this.spacing + this.tileSize / 2
            : this.canvasSize - this.spacing - this.tileSize / 2;

        tilesPositionX.forEach(x => {
            const tileRow = this.tiles.filter(tile => tile.x === x);
            let tilesMergedCount = 0;

            if (isUp) {
                tileRow.sort((tileA, tileB) => tileA.y - tileB.y);
            } else {
                tileRow.sort((tileA, tileB) => tileB.y - tileA.y);
            }

            for (let i = 0; i < tileRow.length; i++) {
                let tile = tileRow[i];

                tile.newY = firstTilePositionY - gap * i + gap * tilesMergedCount;

                if (tile.y !== tile.newY) {
                    isMoveMade = true;
                }

                if (i === 0) {
                    continue;
                }

                const previousTile = tileRow[i - 1];

                if (previousTile.isMerged || previousTile.value !== tile.value) {
                    continue;
                }

                previousTile.isRemoved = true;
                tile.value *= 2;
                this.score += tile.value;

                this.newScoreAnimation(tile.value);

                tile.isMerged = true;
                tile.newY = previousTile.newY;

                tilesMergedCount++;
                isMoveMade = true;
            }
        });

        return isMoveMade;
    }

    setHighestTileValue() {
        const highestTileValue = this.tiles.sort((tileA, tileB) => tileB.value - tileA.value)[0];

        if (highestTileValue) {
            this.highestTileValue = highestTileValue.value;
        }
    }

    updatePositions() {
        this.setHighestTileValue();

        this.tiles = this.tiles.filter(tile => tile.isRemoved === false);
        this.tiles.forEach(tile => {
            tile.isMerged = false;
        });

        for (let i = 0; i < this.positions.length; i++) {
            const position = this.positions[i];
            position.isOpen = true;

            for (let j = 0; j < this.tiles.length; j++) {
                let tile = this.tiles[j];

                if (tile.x !== position.x || tile.y !== position.y) {
                    continue;
                }

                position.isOpen = false;
                break;
            }
        }
    }

    hasValidMove() {
        const tilesX = new Set(this.tiles.map(tile => tile.x));
        const tilesPositionX = Array.from(tilesX);

        if (tilesPositionX.length !== this.boardSize) {
            return true;
        }

        for (let i = 0; i < tilesPositionX.length; i++) {
            const tilePositionX = tilesPositionX[i];

            const tilesRow = this.tiles.filter(tile => tile.x === tilePositionX);

            tilesRow.sort((tileA, tileB) => tileA.y - tileB.y);

            if (tilesRow.length !== this.boardSize) {
                return true;
            }

            for (let i = 1; i < tilesRow.length; i++) {
                if (tilesRow[i].value === tilesRow[i - 1].value) {
                    return true;
                }
            }
        }

        const tilesY = new Set(this.tiles.map(tile => tile.y));
        const tilesPositionY = Array.from(tilesY);

        for (let i = 0; i < tilesPositionY.length; i++) {
            const tileY = tilesPositionY[i];
            const tilesRow = this.tiles.filter(tile => tile.y === tileY);

            tilesRow.sort((tileA, tileB) => tileA.x - tileB.x);

            if (tilesRow.length !== this.boardSize) {
                return true;
            }

            for (let i = 1; i < tilesRow.length; i++) {
                if (tilesRow[i].value === tilesRow[i - 1].value) {
                    return true;
                }
            }
        }

        return false;
    }

    setBestScore() {
        if (!this.bestScore) {
            window.localStorage.setItem('best-score', this.score);

            this.p5.select('#best-score').html(`Best Score: ${this.score}`);

            return;
        }

        if (this.score > this.bestScore) {
            window.localStorage.setItem('best-score', this.score);

            this.p5.select('#best-score').html(`Best Score: ${this.score}`);
        }
    }

    newScoreAnimation(value) {
        const newScoreDiv = this.p5.createDiv('RESET');

        newScoreDiv.class('new-score');

        newScoreDiv.html(`+${value}`);
        newScoreDiv.style('opacity', 1);
        newScoreDiv.style('transform', 'translateY(-42px)');

        setTimeout(() => {
            newScoreDiv.remove();
        }, 600);
    }
}
