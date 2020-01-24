import { Scene } from "../engine/Scene";
import { TextLabel } from "./TextLabel";

export class ClearScene extends Scene {
  constructor(renderingTarget: HTMLCanvasElement) {
    super('Clear', 'black', renderingTarget);
    const text = new TextLabel(80, 200, 'Game Clear!');
    this.add(text);
  }
}
