import { Actor } from './Actor';
import { Rectangle } from './Rectangle';
import { Sprite } from './Sprite';

export class SpriteActor extends Actor {
  public width = 0;
  public height = 0;

  constructor(
    x: number,
    y: number,
    private sprite: Sprite,
    hitArea: Rectangle,
    tags: string[] = []
  ) {
    super(x, y, hitArea, tags);
    this.width = sprite.rectangle.width;
    this.height = sprite.rectangle.height;
  }

  render(target: HTMLCanvasElement) {
    const context = target.getContext('2d');
    const rect = this.sprite.rectangle;

    if (!context) {
      return;
    }

    context.drawImage(
      this.sprite.image,
      rect.x,
      rect.y,
      rect.width,
      rect.height,
      this.x,
      this.y,
      rect.width,
      rect.height
    );
  }

  isOutOfBounds(boundRect: Rectangle) {
    const actorLeft = this.x;
    const actorRight = this.x + this.width;
    const actorTop = this.y;
    const actorBottom = this.y + this.height;

    const horizontal = actorRight < boundRect.x || actorLeft > boundRect.width;
    const vertical = actorBottom < boundRect.y || actorTop > boundRect.height;

    return horizontal || vertical;
  }
}
