import { Input } from "./Input";

export class InputReceiver {
  private _keyMap = new Map();
  private _prevKeyMap = new Map();

  constructor() {
    addEventListener('keydown', (ke) => {
      this._keyMap.set(ke.key, true);
    })
    addEventListener('keyup', (ke) => {
      this._keyMap.set(ke.key, false);
    })
  }

  getInput() {
    const keyMap = new Map(this._keyMap);
    const prevKeymap = new Map(this._prevKeyMap);
    this._prevKeyMap = new Map(this._keyMap);

    return new Input(keyMap, prevKeymap);
  }
}
