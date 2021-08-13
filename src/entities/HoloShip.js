import 'phaser';
import Entity from './Entity';

class HoloShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'holoShip', 'HoloShip');
    this.destroyPoints = 300;
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}

export default HoloShip