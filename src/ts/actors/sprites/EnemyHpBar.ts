import { Actor } from "../../engine/Actor";
import { Enemy } from "./Enemy";
import { Rectangle } from "../../engine/Rectangle";
import { GameEvent } from "../../engine/GameEvent";
import { EventName } from "../../engine/EventDispatcher";

export class EnemyHpBar extends Actor {
  private _width: number;
  private _height: number;
  private _innerWidth: number;

  constructor(x: number, y: number, enemy: Enemy) {
    const hieArea = new Rectangle(0, 0, 0, 0);
    super(x, y, hieArea);

    this._width = 200;
    this._height = 10;
    this._innerWidth = this._width;

    enemy.addEventListener(EventName.changeHp, e => {
      const maxHp = e.target.maxHp;
      const hp = e.target.currentHp;

      this._innerWidth = this._width * (hp / maxHp);
    })
  }

  render(target: HTMLCanvasElement) {
    const context = target.getContext('2d');
    if(!context) {
      return;
    }

    context.strokeStyle = 'white';
    context.fillStyle = 'white';

    context.strokeRect(this.x, this.y, this._width, this._height);
    context.fillRect(this.x, this.y, this._innerWidth, this._height);
  }
}
