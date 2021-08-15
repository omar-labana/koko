import { addPoints, gotScores } from '../src/utils/scoring'
// checkScore, fetchScores, 


describe('Points system', () => {
    const game = {
        points: 0
    }
    game.points = addPoints(game, 100)
    it('checks the created instance', () => {
        expect(game).not.toBeNull();
        expect(game.points).not.toBeNull();
        expect(game).toBeDefined();
        expect(game.points).toBeDefined();
    });
    it('checks the type of created instance', () => {
        expect(typeof game).toBe('object');
    });
    it('checks the function execution', () => {
        expect(game.points).toEqual(100);
        expect(typeof game.points).toEqual('number');
    });

});

describe('Fetching scores from API for top 9 players', () => {
    const playerScores = {
        result: [
            {
                user: 'Low',
                score: 13
            },
            {
                user: 'High',
                score: 15
            },
            {
                user: 'Medium',
                score: 14
            },
        ]
    }

    const result = gotScores(playerScores)

    it('checks the created instance', () => {
        expect(result).not.toBeNull();
        expect(result).toBeDefined();
    });

    it('checks the type of created instance', () => {
        expect(typeof result).toBe('object');
    });

    it('checks the type of instance members', () => {
        expect(typeof result[0].user).toBe('string');
        expect(typeof result[0].score).toBe('number');
    });

    it('checks the sorting function execution', () => {
        expect(result[0].user).toEqual('High');
        expect(result[1].user).toEqual('Medium');
        expect(result[2].user).toEqual('Low');
    });

});