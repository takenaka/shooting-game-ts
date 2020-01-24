import { InputReceiver } from "./InputReceiver";
import { Scene } from "./Scene";
import { GameEvent } from "./GameEvent";
import { Rectangle } from "./Rectangle";
import { GameInformation } from "./GameInformation";
import { EventName } from "./EventDispatcher";

export class Game {
  private currentFps = 0;
  public screenCanvas = document.createElement('canvas');
  private _inputReceiver = new InputReceiver();
  private _prevTimestamp = 0;
  private currentScene = new Scene('init', '#fff', this.screenCanvas);

  constructor(private title: string, private width: number, private height: number, private maxFps: number){
    this.screenCanvas.height = height;
    this.screenCanvas.width = width;
    console.log(`${title} is reset`);
  }

  changeScene(newScene: Scene) {
    this.currentScene = newScene;
    this.currentScene.addEventListener(EventName.changeScene, e => {
      this.changeScene(e.target);
    })
    console.log(`Scene is ${newScene.name}`);
  }

  start() {
    requestAnimationFrame(this._loop.bind(this));
  }

  _loop(timestamp: number) {
    const elapsedSec = (timestamp - this._prevTimestamp) / 1000;
    const frameTime = 1 / this.maxFps;

    if (elapsedSec <= frameTime) {
      requestAnimationFrame(this._loop.bind(this));
      return;
    }

    this._prevTimestamp = timestamp;
    this.currentFps = 1 / elapsedSec;

    const screenRectangle = new Rectangle(0, 0, this.width, this.height);
    const info = new GameInformation(this.title, screenRectangle, this.maxFps, this.currentFps);

    const input = this._inputReceiver.getInput();
    this.currentScene.update(info, input);

    requestAnimationFrame(this._loop.bind(this));
  }
}
