import { Actor } from "../engine/Actor";
import { Rectangle } from "../engine/Rectangle";

export class TextLabel extends Actor {
  private text: string;

  constructor(x: number, y: number, text: string) {
    const hitArea = new Rectangle(0, 0, 0, 0);
    super(x, y, hitArea);

    this.text = text;
  }

  render (target: HTMLCanvasElement) {
    const context = target.getContext('2d');
    if(!context) {
      return;
    }

    context.font = '25px sans-serif';
    context.fillStyle = 'white';
    context.fillText(this.text, this.x, this.y);
  }
}
