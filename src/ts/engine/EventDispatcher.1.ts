import { GameEvent } from './GameEvent';

export class EventDispatcher {
  private _eventListeners: {
    [key: string]: Function[];
  } = {};

  addEventListener(type: string, callback: Function) {
    if (this._eventListeners[type] == undefined) {
      this._eventListeners[type] = [];
    }

    this._eventListeners[type].push(callback);
  }

  dispatchEvent(type: string, event: GameEvent) {
    const listeners = this._eventListeners[type];
    if (listeners != undefined) listeners.forEach(callback => callback(event));
  }
}
