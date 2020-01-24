import { EnemyBullet } from './EnemyBullet';
import { GameInformation } from '../../engine/GameInformation';
import { Input } from '../../engine/Input';

export class FireworksBullet extends EnemyBullet {
  private _eplasedTime: number;
  public explosionTime: number;

  constructor(x: number, y: number, velocityX: number, velocityY: number, explosionTime: number) {
    super(x, y, velocityX, velocityY);

    this._eplasedTime = 0;
    this.explosionTime = explosionTime;
  }

  // degree度の方向にspeedの速さで弾を発射する
  shootBullet(degree: number, speed: number) {
    const rad = (degree / 180) * Math.PI;
    const velocityX = Math.cos(rad) * speed;
    const velocityY = Math.sin(rad) * speed;

    const bullet = new EnemyBullet(this.x, this.y, velocityX, velocityY);
    this.spawnActor(bullet);
  }

  // num個の弾を円形に発射する
  shootCircularBullets(num: number, speed: number) {
    const degree = 360 / num;
    for (let i = 0; i < num; i++) {
      this.shootBullet(degree * i, speed);
    }
  }

  update(gameInfo: GameInformation, input: Input) {
    super.update(gameInfo, input);

    // 経過時間を記録する
    this._eplasedTime++;

    // 爆発時間を超えたら弾を生成して自身を破棄する
    if (this._eplasedTime > this.explosionTime) {
      this.shootCircularBullets(10, 2);
      this.destroy();
    }
  }
}
