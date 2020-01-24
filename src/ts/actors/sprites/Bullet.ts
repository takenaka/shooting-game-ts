import { SpriteActor } from "../../engine/SpriteActor";
import { Sprite } from "../../engine/Sprite";
import { AssetLoader } from "../../engine/AssetLoader";
import { Rectangle } from "../../engine/Rectangle";
import { GameInformation } from "../../engine/GameInformation";
import { Input } from "../../engine/Input";
import { GameEvent } from "../../engine/GameEvent";
import { Actor } from "../../engine/Actor";
import { EventName } from "../../engine/EventDispatcher";

export class Bullet extends SpriteActor {
  private speed: number;

  constructor(x: number, y: number) {
    const sprite = new Sprite(AssetLoader.get('sprite'), new Rectangle(0, 16, 16, 16));
    const hitArea = new Rectangle(4, 0, 8, 16);
    super(x, y, sprite, hitArea, ['playerBullet']);

    this.speed = 6;

    this.addEventListener(EventName.hit, e => {
      if (e.target.hasTag('enemy')) {
        this.destroy();
      }
    })
  }

  update(gameInfo: GameInformation, input: Input) {
    this.y -= this.speed;

    if(this.isOutOfBounds(gameInfo.screenRectangle)) {
      this.destroy();
    }
  }
}
