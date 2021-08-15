import Phaser from 'phaser';

import config from './config';

export default class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.points = 0;
    this.playerName = '';
    this.health = 100;
    this.scene.start('Title');
  }
}

window.game = new Game();