import 'phaser';
import SkyLayer from '../entities/Space';
import { checkScore } from '../utils/scoring';
import restartButton from '../assets/images/ui/restartButton.png';
import restartButtonHover from '../assets/images/ui/restartButtonHover.png';
import menuButton from '../assets/images/ui/menuButton.png';
import menuButtonHover from '../assets/images/ui/menuButtonHover.png';
import leadersBoardButton from '../assets/images/ui/leadersBoardButton.png';
import leadersBoardButtonHover from '../assets/images/ui/leadersBoardButtonHover.png';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  preload() {
    this.load.image('restartButton', restartButton);
    this.load.image('restartButtonHover', restartButtonHover);
    this.load.image('menuButton', menuButton);
    this.load.image('menuButtonHover', menuButtonHover);
    this.load.image('leadersBoardButton', leadersBoardButton);
    this.load.image('leadersBoardButtonHover', leadersBoardButtonHover);
  }

  renderLeadersBoardButton() {
    const leadersBoardButton = this.add.sprite(
      this.game.config.width * 0.5,
      190,
      'leadersBoardButton',
    );
    leadersBoardButton.setInteractive();

    leadersBoardButton.on('pointerover', () => {
      leadersBoardButton.setTexture('leadersBoardButtonHover');
    }, this);

    leadersBoardButton.on('pointerout', () => {
      leadersBoardButton.setTexture('leadersBoardButton');
    });

    leadersBoardButton.on('pointerdown', () => {
      this.scene.start('LeadersBoardScene');
    }, this);
  }

  renderBackground() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new SkyLayer(this, 'space', i * 10);
      this.backgrounds.push(bg);
    }
  }

  renderTitle() {
    const title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    title.setOrigin(0.5);
  }

  renderMenuButton() {
    const btnMenu = this.add.sprite(
      this.game.config.width * 0.5,
      (this.game.config.height * 0.8),
      'menuButton',
    );
    btnMenu.setInteractive();

    btnMenu.on('pointerover', () => {
      btnMenu.setTexture('menuButtonHover');
    }, this);

    btnMenu.on('pointerout', () => {
      btnMenu.setTexture('menuButton');
    });

    btnMenu.on('pointerup', () => {
      const inputDiv = document.getElementById('inputDiv');
      if (inputDiv) {
        inputDiv.remove();
      }
      this.scene.start('Title');
    }, this);
  }

  renderRestartButton() {
    const btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.9,
      'restartButton',
    );
    btnRestart.setInteractive();

    btnRestart.on('pointerover', () => {
      btnRestart.setTexture('restartButtonHover');
    }, this);

    btnRestart.on('pointerout', () => {
      btnRestart.setTexture('restartButton');
    });

    btnRestart.on('pointerdown', () => {
      this.scene.start('BattleScene');
    }, this);
  }

  create() {
    this.renderTitle();
    this.renderMenuButton();
    this.renderRestartButton();
    // TODO: Fix scene not found
    this.renderLeadersBoardButton();
    this.renderBackground();
    checkScore();
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}
