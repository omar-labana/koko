import 'phaser';
import Space from '../entities/Space'


import playButton from '../assets/images/ui/playButton.png';
import playButtonHover from '../assets/images/ui/playButtonHover.png';
import leadersBoardButton from '../assets/images/ui/leadersBoardButton.png';
import leadersBoardButtonHover from '../assets/images/ui/leadersBoardButtonHover.png';
import playerShip from '../assets/images/ui/playerShip.png';

import space from '../assets/images/space.png'

class Title extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    this.load.image('playButton', playButton);
    this.load.image('playButtonHover', playButtonHover);
    this.load.image('leadersBoardButton', leadersBoardButton);
    this.load.image('leadersBoardButtonHover', leadersBoardButtonHover);
    this.load.image('space', space);
    this.load.image('playerShip', playerShip);

  }



  renderTitle() {
    this.title = this.add.text(this.game.config.width * 0.5, 55, 'Welcome to koko', {
      fontFamily: 'monospace',
      fontSize: 30,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);
  }
  renderDesc() {
    this.title = this.add.text(this.game.config.width * 0.5, 85, 'A space shooter game with a meme flavor', {
      fontFamily: 'monospace',
      fontSize: 30,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);
  }

  renderInstructions() {
    const style = {
      fontFamily: 'monospace',
      fontSize: 24,
      color: 'white',
      align: 'center',
    };
    const instruction1 = 'Use keyboard arrows to move your plane';
    const instruction2 = 'Shoot using the space bar';
    const xPos = this.game.config.width * 0.25;
    const yPos = this.game.config.height * 0.5;
    this.instructions1 = this.add.text(xPos, yPos + 20, instruction1, style);
    this.instructions1.setOrigin(0.5);
    this.instructions2 = this.add.text(xPos + this.game.config.width * 0.5, yPos + 20, instruction2, style);
    this.instructions2.setOrigin(0.5);
  }

  renderPlayerName() {
    this.title = this.add.text(this.game.config.width * 0.5, 140, window.game.playerName, {
      fontFamily: 'monospace',
      fontSize: 22,
      color: 'yellow',
      align: 'center',
    });
    this.title.setOrigin(0.5);
  }

  renderPlayButton() {
    const playButton = this.add.sprite(
      this.game.config.width * 0.5,
      (this.game.config.height * 0.5) - 100,
      'playButton',
    );
    playButton.setInteractive();

    playButton.on('pointerover', () => {
      playButton.setTexture('playButtonHover');
    }, this);

    playButton.on('pointerout', () => {
      playButton.setTexture('playButton');
    });

    playButton.on('pointerdown', () => {
      this.scene.start('BattleScene');
    }, this);
  }

  renderTopPlayers() {
    const leadersBoardButton = this.add.sprite(
      this.game.config.width * 0.5,
      (this.game.config.height * 0.5) - 30,
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
      const bg = new Space(this, 'space', i * 10);
      this.backgrounds.push(bg);
    }
  }

  renderPlayerShip() {

    this.playerShip = this.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5 * 1.7,
      'playerShip',
    );
    this.playerShip.scale = 2.0;
  }


  create() {
    this.renderTitle();
    this.renderInstructions();
    this.renderDesc();
    this.renderPlayerName();
    this.renderPlayButton();
    this.renderTopPlayers();
    this.renderPlayerShip();
    this.renderBackground()


  }
}
export default Title