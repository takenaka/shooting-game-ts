import { Actor } from '../engine/Actor';
import { Rectangle } from '../engine/Rectangle';
import { GameInformation } from '../engine/GameInformation';
import { Input } from '../engine/Input';
import { EnemyBullet } from './sprites/EnemyBullet';

export class SpiralBulletSpawner extends Actor {
  private _rotations: number;
  private _interval: number;
  private _timeCount: number;
  private _angle: number;
  private _radius: number;
  private _bullets: EnemyBullet[];

  constructor(x: number, y: number, rotations: number) {
    const hitArea = new Rectangle(0, 0, 0, 0);
    super(x, y, hitArea);

    this._rotations = rotations;
    this._interval = 2;
    this._timeCount = 0;
    this._angle = 0;
    this._radius = 10;
    this._bullets = [];
  }

  update(gameInfo: GameInformation, input: Input) {
    // 指定回数後ストップ
    const rotation = this._angle / 360;
    if (rotation >= this._rotations) {
      this._bullets.forEach(b => {
        // 停止解除
        b.isFrozen = false;
      });
      this.destroy();
      return;
    }

    // インターバル経過までは何もしない
    this._timeCount++;
    if (this._timeCount < this._interval) {
      return;
    }
    this._timeCount = 0;

    // 角度と半径の増加
    this._angle += 10;
    this._radius += 1;

    // 発車
    const rad = (this._angle / 180) * Math.PI;
    const bX = this.x + Math.cos(rad) * this._radius;
    const bY = this.y + Math.sin(rad) * this._radius;
    const bSpdX = Math.random() * 2 - 1;
    const bSpdY = Math.random() * 2 - 1;
    const bullet = new EnemyBullet(bX, bY, bSpdX, bSpdY, true);
    this._bullets.push(bullet);

    this.spawnActor(bullet);
  }
}
