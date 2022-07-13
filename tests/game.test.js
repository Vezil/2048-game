import './mocks/mock-local-storage';
import Game from '../utility/game';

const game = new Game(500, 4, 2, 4);

test('game test setup', () => {
    expect(true).toBe(true);
});
