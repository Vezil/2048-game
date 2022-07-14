import Game from '../utility/game.js';
import P5 from './mocks/p5';
import './mocks/mock-local-storage';

const p5 = new P5();

const game = new Game(p5, 500, 4, 2, 4);

test('game test setup', () => {
    expect(true).toBe(true);
});
