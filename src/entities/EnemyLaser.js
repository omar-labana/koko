import Entity from './Entity';

class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'playerLaser');
    this.destroyPoints = 400;
    this.body.velocity.y = 200;
  }
}

export default EnemyLaser;