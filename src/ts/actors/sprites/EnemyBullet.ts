import { SpriteActor } from '../../engine/SpriteActor';
import { Sprite } from '../../engine/Sprite';
import { AssetLoader } from '../../engine/AssetLoader';
import { Rectangle } from '../../engine/Rectangle';
import { GameInformation } from '../../engine/GameInformation';
import { Input } from '../../engine/Input';

export class EnemyBullet extends SpriteActor {
  private velocityX: number;
  private velocityY: number;
  public isFrozen: boolean;

  constructor(
    x: number,
    y: number,
    velocityX: number,
    velocityY: number,
    isFrozen = false
  ) {
    const sprite = new Sprite(
      AssetLoader.get('sprite'),
      new Rectangle(16, 16, 16, 16)
    );
    const hitArea = new Rectangle(4, 4, 8, 8);
    super(x, y, sprite, hitArea, ['enemyBullet']);

    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.isFrozen = isFrozen;
  }

  update(gameInfo: GameInformation, input: Input) {
    if (!this.isFrozen) {
      this.x += this.velocityX;
      this.y += this.velocityY;
    }

    if (this.isOutOfBounds(gameInfo.screenRectangle)) {
      this.destroy;
    }
  }
}
