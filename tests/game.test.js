import Game from '../utility/game.js';
import P5 from './mocks/p5';
import './mocks/mock-local-storage';

const p5 = new P5();

const game = new Game(p5, 500, 4, 2, 4);

test('Checks if all positions are loaded', () => {
    expect(game.positions.length).toBe(0);

    game.loadPositions();

    expect(game.positions.length).toBe(16);
});

test('Checks if highest value is set correctly when sketch is ready', () => {
    game.addTile();
    game.setHighestTileValue();

    const isTwoOrFour = game.highestTileValue === 2 || game.highestTileValue === 4;

    expect(isTwoOrFour).toBe(true);
});
