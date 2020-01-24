import { GameEvent } from './GameEvent';
import { Actor } from './Actor';
import { Enemy } from '../actors/sprites/Enemy';
import { Scene } from './Scene';

export enum EventName {
  hit,
  changeHp,
  changeScene,
  spawnactor,
  destroy
}

export class EventDispatcher {
  private _eventListeners = new Map<
    EventName,
    Array<(gameEven: GameEvent) => void>
  >();

  addEventListener(
    type: EventName.hit,
    callback: (gameEvent: GameEvent<Actor>) => void
  ): void;
  addEventListener(
    type: EventName.changeHp,
    callback: (gameEvent: GameEvent<Enemy>) => void
  ): void;
  addEventListener(
    type: EventName.changeScene,
    callback: (gameEvent: GameEvent<Scene>) => void
  ): void;
  addEventListener(
    type: EventName.spawnactor,
    callback: (gameEvent: GameEvent<Actor>) => void
  ): void;
  addEventListener(
    type: EventName.destroy,
    callback: (gameEvent: GameEvent<Actor>) => void
  ): void;
  addEventListener(type: EventName, callback: (gameEvent: GameEvent) => void) {
    const listener = this._eventListeners.get(type);

    if (!listener) {
      this._eventListeners.set(type, []);
    }

    const _listener = this._eventListeners.get(type);
    _listener!.push(callback);
  }

  dispatchEvent(type: EventName, event: GameEvent) {
    const listeners = this._eventListeners.get(type);
    if (listeners != undefined) listeners.forEach(callback => callback(event));
  }
}
