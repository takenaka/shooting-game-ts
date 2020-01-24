import { SpriteActor } from '../../engine/SpriteActor';
import { Sprite } from '../../engine/Sprite';
import { Rectangle } from '../../engine/Rectangle';
import { AssetLoader } from '../../engine/AssetLoader';
import { GameInformation } from '../../engine/GameInformation';
import { Input } from '../../engine/Input';
import { Bullet } from './Bullet';
import { GameEvent } from '../../engine/GameEvent';
import { EventName } from '../../engine/EventDispatcher';

export class Fighter extends SpriteActor {
  private speed: number;
  private _interval: number;
  private _timeCount: number;
  private _velocityX: number;
  private _velocityY: number;

  constructor(x: number, y: number) {
    const sprite = new Sprite(AssetLoader.get('sprite'), new Rectangle(0, 0, 16, 16));
    const hitArea = new Rectangle(8, 8, 2, 2);
    super(x, y, sprite, hitArea);

    this.speed = 2;
    this._interval = 5;
    this._timeCount = 0;
    this._velocityX = 0;
    this._velocityY = 0;

    this.addEventListener(EventName.hit, e => {
      if (e.target.hasTag('enemyBullet')) {
        this.destroy();
      }
    })
  }

  update(gameInfo: GameInformation, input: Input) {
    this._velocityX = 0;
    this._velocityY = 0;

    if (input.getKey('w')) {
      this._velocityY -= this.speed;
    }
    if (input.getKey('s')) {
      this._velocityY += this.speed;
    }
    if (input.getKey('d')) {
      this._velocityX += this.speed;
    }
    if (input.getKey('a')) {
      this._velocityX -= this.speed;
    }

    this.x += this._velocityX;
    this.y += this._velocityY;

    const boundWidth = gameInfo.screenRectangle.width - this.width;
    const boundHeight = gameInfo.screenRectangle.height - this.height;
    const bound = new Rectangle(this.width, this.height, boundWidth, boundHeight);

    if(this.isOutOfBounds(bound)) {
      this.x -= this._velocityX;
      this.y -= this._velocityY;
    }

    this._timeCount++;
    const isFireReady = this._timeCount > this._interval;

    if (isFireReady && input.getKey(' ')) {
      const bullet = new Bullet(this.x, this.y);
      this.spawnActor(bullet);
      this._timeCount = 0;
    }
  }
}
