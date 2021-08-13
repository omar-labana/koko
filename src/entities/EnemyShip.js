import 'phaser';
import Entity from './Entity';
import EnemyLaser from './EnemyLaser';

class EnemyShip extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, 'basicEnemy', 'basicEnemy');
        this.destroyPoints = 100;
        this.body.velocity.y = Phaser.Math.Between(50, 100);

        this.shootTimer = this.scene.time.addEvent({
            delay: 2000,
            callback() {
                const laser = new EnemyLaser(
                    this.scene,
                    this.x,
                    this.y,
                );
                laser.setScale(this.scaleX);
                this.scene.enemyLasers.add(laser);
            },
            callbackScope: this,
            loop: true,
        });
    }

    onDestroy() {
        if (this.shootTimer !== undefined) {
            if (this.shootTimer) this.shootTimer.remove(false);
        }
    }
}

export default EnemyShip