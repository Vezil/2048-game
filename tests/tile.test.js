import Tile from '../utility/tile';
import P5 from './mocks/p5';

const p5 = new P5();
const tileValue = 2;
const expectedTextSize = 64;
const tile = new Tile(p5, 100, 100, tileValue, 310, 430);

test('It returns correct text size', () => {
    expect(tile.textSize()).toBe(expectedTextSize);
});
