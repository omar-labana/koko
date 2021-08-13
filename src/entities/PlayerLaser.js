import Entity from './Entity';

class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'playerLaser');
    this.body.velocity.y = -2000;
  }
}

export default PlayerLaser