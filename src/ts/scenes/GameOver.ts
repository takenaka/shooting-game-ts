import { Scene } from "../engine/Scene";
import { TextLabel } from "./TextLabel";

export class GameOverScene extends Scene {
  constructor(renderingTarget: HTMLCanvasElement) {
    super('GameOver', 'black', renderingTarget);
    const text = new TextLabel(80, 200, 'Game Over!');
    this.add(text);
  }
}
