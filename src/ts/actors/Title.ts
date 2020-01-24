import { Actor } from "../engine/Actor";
import { Rectangle } from "../engine/Rectangle";

export class Title extends Actor {
  constructor(x: number, y: number) {
    const hitArea = new Rectangle(0, 0, 0, 0);
    super(x, y, hitArea);
  }

  render(target: HTMLCanvasElement) {
    const context = target.getContext('2d');

    if (!context) {
      return;
    }

    context.font = '25px sans-serif';
    context.fillStyle = 'white';
    context.fillText('Shooting', this.x, this.y);
  }
}
