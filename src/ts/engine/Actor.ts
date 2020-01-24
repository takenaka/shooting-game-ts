import { EventDispatcher, EventName } from './EventDispatcher';
import { Rectangle } from './Rectangle';
import { GameEvent } from './GameEvent';
import { GameInformation } from './GameInformation';
import { Input } from './Input';

export class Actor extends EventDispatcher {
  private _hitAreaOffsetX: number;
  private _hitAreaOffsetY: number;
  private tags: string[];
  private _x = 0;
  private _y = 0;

  constructor(
    x: number,
    y: number,
    public hitArea: Rectangle,
    tags: string[] = []
  ) {
    super();
    this._hitAreaOffsetX = hitArea.x;
    this._hitAreaOffsetY = hitArea.y;
    this.tags = tags;

    this.x = x;
    this.y = y;
  }

  update(gameInfo: GameInformation, input: Input) {}

  render(target: HTMLCanvasElement) {}

  hasTag(tagName: string) {
    return this.tags.indexOf(tagName) >= 0;
  }

  spawnActor(actor: Actor) {
    this.dispatchEvent(EventName.spawnactor, new GameEvent(actor));
  }

  destroy() {
    this.dispatchEvent(EventName.destroy, new GameEvent(this));
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
    this.hitArea.x = value + this._hitAreaOffsetX;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
    this.hitArea.y = value + this._hitAreaOffsetY;
  }
}
