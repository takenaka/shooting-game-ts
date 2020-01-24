import { SpriteActor } from "../../engine/SpriteActor";
import { Sprite } from "../../engine/Sprite";
import { AssetLoader } from "../../engine/AssetLoader";
import { Rectangle } from "../../engine/Rectangle";
import { GameEvent } from "../../engine/GameEvent";
import { GameInformation } from "../../engine/GameInformation";
import { Input } from "../../engine/Input";
import { EnemyBullet } from "./EnemyBullet";
import { EventName } from "../../engine/EventDispatcher";
import { SpiralBulletSpawner } from "../SpiralBulletsSpawner";
import { FireworksBullet } from "./FireworksBullet";

export class Enemy extends SpriteActor {
  public maxHp: number;
  public currentHp: number;
  private _fireworksInterval: number;
  private _spiralInterval: number;
  private _fireworksTimeCount: number;
  private _spiralTimeCount: number;
  private _velocityX: number;

  constructor(x: number, y: number) {
    const sprite = new Sprite(AssetLoader.get('sprite'), new Rectangle(16, 0, 16, 16));
    const hitArea = new Rectangle(0, 0, 16, 16);
    super(x, y, sprite, hitArea, ['enemy']);

    this.maxHp = 50;
    this.currentHp = this.maxHp;

    this._fireworksInterval = 50;
    this._spiralInterval = 500;
    this._fireworksTimeCount = this._fireworksInterval;
    this._spiralTimeCount = this._spiralInterval;
    this._velocityX = 0.3;

    this.addEventListener(EventName.hit, e => {
      if(e.target.hasTag('playerBullet')) {
        this.currentHp--;
        this.dispatchEvent(EventName.changeHp, new GameEvent(this));
      }
    });
  }

  update(gameInfo: GameInformation, input: Input) {
    // 左右移動
    this.x += this._velocityX;
    if(this.x <= 100 || this.x >= 200) {
      this._velocityX *= -1;
    }

    // インターバルを待って発弾
    this._spiralTimeCount++;
    if(this._spiralTimeCount > this._spiralInterval) {
      const spawner = new SpiralBulletSpawner(this.x, this.y, 4);
      this.spawnActor(spawner);
      this._spiralTimeCount = 0;
    }


    this._fireworksTimeCount++;
    if(this._fireworksTimeCount > this._fireworksInterval) {
        const spdX = Math.random() * 4 - 2; // -2〜+2
        const spdY = Math.random() * 4 - 2;
        const explosionTime = 50;
        const bullet = new FireworksBullet(this.x, this.y, spdX, spdY, explosionTime);
        this.spawnActor(bullet);
        this._fireworksTimeCount = 0;
    }

    //死亡処理
    if(this.currentHp <= 0) {
      this.destroy();
    }
  }
}
