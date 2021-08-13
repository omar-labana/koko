import 'phaser';
import GameScene from './scenes/Game';
import GameOverScene from './scenes/GameOver';
import LeaderboardScene from './scenes/Leaderboard';
import TitleScene from './scenes/Title';

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 640,
    backgroundColor: '#001',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
        },
    },
    scene: [
        TitleScene,
        GameScene,
        GameOverScene,
        LeaderboardScene,
    ],
};

export default config


