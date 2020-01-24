import { EventDispatcher, EventName } from './EventDispatcher';
import { Rectangle } from './Rectangle';
import { Actor } from './Actor';
import { GameEvent } from './GameEvent';
import { GameInformation } from './GameInformation';
import { Input } from './Input';

export class Scene extends EventDispatcher {
  private actors: Actor[] = [];
  private _destroyedActors: Actor[] = [];

  constructor(
    public name: string,
    private backgroundColor: string,
    protected renderingTarget: HTMLCanvasElement
  ) {
    super();
  }

  add(actor: Actor) {
    this.actors.push(actor);
    actor.addEventListener(EventName.spawnactor, e => this.add(e.target));
    actor.addEventListener(EventName.destroy, e => {
      this._addDestroyedActor(e.target);
    });
  }

  remove(actor: Actor) {
    const index = this.actors.indexOf(actor);
    this.actors.splice(index, 1);
  }

  changeScene(newScene: Scene) {
    const event = new GameEvent(newScene);
    this.dispatchEvent(EventName.changeScene, event);
  }

  update(gameInfo: GameInformation, input: Input) {
    this._updateAll(gameInfo, input);
    this._hitTest();
    this._disposeDestroyedActors();
    this._clearScreen(gameInfo);
    this._renderAll();
  }

  _updateAll(gameInfo: GameInformation, input: Input) {
    this.actors.forEach(actor => {
      actor.update(gameInfo, input);
    });
  }

  _hitTest() {
    const length = this.actors.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = i + 1; j < length; j++) {
        const obj1 = this.actors[i];
        const obj2 = this.actors[j];
        const hit = obj1.hitArea.hitTest(obj2.hitArea);
        if (hit) {
          obj1.dispatchEvent(EventName.hit, new GameEvent(obj2));
          obj2.dispatchEvent(EventName.hit, new GameEvent(obj1));
        }
      }
    }
  }

  _clearScreen(gameInfo: GameInformation) {
    const context = this.renderingTarget.getContext('2d');
    const width = gameInfo.screenRectangle.width;
    const height = gameInfo.screenRectangle.height;

    if (!context) {
      return;
    }

    context.fillStyle = this.backgroundColor;
    context.fillRect(0, 0, width, height);
  }

  _renderAll() {
    this.actors.forEach(obj => {
      obj.render(this.renderingTarget);
    });
  }

  _addDestroyedActor(actor: Actor) {
    this._destroyedActors.push(actor);
  }

  _disposeDestroyedActors() {
    this._destroyedActors.forEach(actor => {
      this.remove(actor);
    });

    this._destroyedActors = [];
  }
}
