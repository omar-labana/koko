import 'phaser';
import Player from '../entities/Player';
import EnemyShip from '../entities/EnemyShip';
import Space from '../entities/Space';
import TracerShip from '../entities/TracerShip';
import HoloShip from '../entities/HoloShip';


import {
    renderScore,
    addPoints,
    renderHealth,
    renderPoints,
} from '../utils/scoring';




import laserEnemy from '../assets/images/ui/laserEnemy.png';
import holoShip from '../assets/images/ui/boldEnemy.png';
import playerLaser from '../assets/images/ui/laserPlayer.png';
import explosionAlien from '../assets/audio/explosionAlien.wav';
import laser from '../assets/audio/laser.wav';
import playerShip from '../assets/images/ui/playerShip.png';
import tracerShip from '../assets/images/ui/tracerEnemy.png';
import enemyShip from '../assets/images/ui/basicEnemy.png';
import space from '../assets/images/space.png'
import explosion from '../assets/images/ui/explosion.png'
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleScene' });
        this.alienShipDelay = 1000;
        this.dogShipDelay = 1000;
        this.motherShipDelay = 1000;
    }

    preload() {
        this.load.image('space', space);

        this.load.spritesheet('explosion', explosion, {
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.image('basicEnemy', enemyShip);
        this.load.image('enemyLaser', laserEnemy);
        this.load.image('playerLaser', playerLaser);
        this.load.image('tracerShip', tracerShip);
        this.load.image('holoShip', holoShip);
        this.load.image('playerShip', playerShip);

        this.load.audio('explosionAlien', explosionAlien);

        this.load.audio('laser', laser);

    }

    prepareAnimations() {


        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers('explosion'),
            frameRate: 20,
            repeat: 0,
        });
    }

    renderPlayer() {
        this.player = new Player(
            this,
            1280 * 0.5,
            640 * 0.9,
            'playerShip',
        );
    }

    renderInstructions() {
        const style = {
            fontFamily: 'monospace',
            fontSize: 16,
            color: 'gray',
            align: 'center',
        };
        const tip1 = 'Use keyboard arrow keys to move your character';
        const tip2 = 'Shoot using the space bar';
        const xPos = this.game.config.width * 0.5;
        const yPos = this.game.config.height - 40;
        this.tips1 = this.add.text(xPos, yPos, tip1, style);
        this.tips1.setOrigin(0.5);
        this.tips2 = this.add.text(xPos, yPos + 30, tip2, style);
        this.tips2.setOrigin(0.5);
    }

    prepareSoundFX() {
        this.sfx = {
            explosionAlien: this.sound.add('explosionAlien'),
            laser: this.sound.add('laser'),
        };
    }

    prepareBackground() {
        this.backgrounds = [];
        for (let i = 0; i < 5; i += 1) {
            const bg = new Space(this, 'space', i * 10);
            this.backgrounds.push(bg);
        }
    }

    prepareKeyboard() {
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    prepareGroups() {
        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();
    }

    addTimers() {
        this.time.addEvent({
            delay: this.alienShipDelay,
            callback: () => {
                const enemy = new EnemyShip(
                    this,
                    Phaser.Math.Between(0, this.game.config.width),
                    0,
                );
                enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
                this.enemies.add(enemy);
            },
            callbackScope: this,
            loop: true,
        });
        this.time.addEvent({
            delay: this.dogShipDelay,
            callback: () => {
                const enemy = new TracerShip(
                    this,
                    Phaser.Math.Between(0, this.game.config.width),
                    0,
                );
                enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
                this.enemies.add(enemy);
            },
            callbackScope: this,
            loop: true,
        });
        this.time.addEvent({
            delay: this.motherShipDelay,
            callback: () => {
                const enemy = new HoloShip(
                    this,
                    Phaser.Math.Between(0, this.game.config.width),
                    0,
                );
                enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
                this.enemies.add(enemy);
            },
            callbackScope: this,
            loop: true,
        });
    }

    addCollisions() {
        this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
            if (enemy) {
                if (enemy.onDestroy !== undefined) {
                    enemy.onDestroy();
                }

                enemy.explode(true);
                playerLaser.destroy();

                window.game.points = addPoints(window.game, enemy.destroyPoints);
                renderPoints();
            }
        });

        this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
            if (!player.getData('isDead') && !enemy.getData('isDead')) {
                if (window.game.health <= 0) {
                    player.explode(false);
                    player.onDestroy();
                }
                enemy.explode(true);
                window.game.health -= 20;
                renderHealth();
            }
        });

        this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
            if (!player.getData('isDead') && !laser.getData('isDead')) {
                if (window.game.health <= 0) {
                    player.explode(false);
                    player.onDestroy();
                }
                laser.destroy();
                window.game.health -= 10;
                renderHealth();
            }
        });

        this.physics.add.overlap(this.playerLasers, this.enemyLasers, (playerLasers, laser) => {
            playerLasers.explode(false);
            laser.destroy();
            window.game.points = addPoints(window.game, laser.destroyPoints);
            renderPoints();
        });
    }

    create() {
        window.game.points = 0;
        window.game.health = 100;

        this.prepareAnimations();
        this.renderPlayer();
        this.renderInstructions();
        this.prepareKeyboard();
        this.prepareSoundFX();
        this.prepareBackground();

        this.prepareGroups();

        this.addTimers();

        this.addCollisions();

        renderScore();
        renderHealth();
    }

    updatePlayer() {
        if (this.player) {
            if (!this.player.getData('isDead')) {
                this.player.update();

                if (this.keyUP.isDown) {
                    this.player.moveUp();
                } else if (this.keyDOWN.isDown) {
                    this.player.moveDown();
                }

                if (this.keyLEFT.isDown) {
                    this.player.moveLeft();
                } else if (this.keyRIGHT.isDown) {
                    this.player.moveRight();
                }

                if (this.keySpace.isDown) {
                    this.player.setData('isShooting', true);
                } else {
                    this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
                    this.player.setData('isShooting', false);
                }
            }
        }
    }

    updateEnemies() {
        for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
            const enemy = this.enemies.getChildren()[i];

            enemy.update();

            if (enemy.x < -enemy.displayWidth
                || enemy.x > this.game.config.width + enemy.displayWidth
                || enemy.y < -enemy.displayHeight * 4
                || enemy.y > this.game.config.height + enemy.displayHeight) {
                if (enemy) {
                    if (enemy.onDestroy !== undefined) {
                        enemy.onDestroy();
                    }
                    enemy.destroy();
                }
            }
        }
    }

    updateEnemiesLasers() {
        for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
            const laser = this.enemyLasers.getChildren()[i];
            laser.update();

            if (laser.x < -laser.displayWidth
                || laser.x > this.game.config.width + laser.displayWidth
                || laser.y < -laser.displayHeight * 4
                || laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }
    }

    updatePlayerLasers() {
        for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
            const laser = this.playerLasers.getChildren()[i];
            laser.update();

            if (laser.x < -laser.displayWidth
                || laser.x > this.game.config.width + laser.displayWidth
                || laser.y < -laser.displayHeight * 4
                || laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }
    }

    updateBackground() {
        for (let i = 0; i < this.backgrounds.length; i += 1) {
            this.backgrounds[i].update();
        }
    }

    update() {
        this.updatePlayer();
        this.updateEnemies();
        this.updateEnemiesLasers();
        this.updatePlayerLasers();
        this.updateBackground();
    }
}

export default GameScene