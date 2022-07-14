import Tile from '../utility/tile';
import P5 from './mocks/p5';

const p5 = new P5();
const tileValue = 2;
const tile = new Tile(p5, 100, 100, tileValue, 310, 430);

test('It checks if the text size is set correctly', () => {
    const expectedTextSize = 64;
    const textSize = tile.textSize();

    expect(textSize).toBe(expectedTextSize);
});

test('It checks if color is set correctly', () => {
    const expectedTextColor = '#FFA822';
    const color = tile.color();

    expect(color).toBe(expectedTextColor);
});
