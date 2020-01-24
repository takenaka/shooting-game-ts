import { Scene } from "../engine/Scene";
import { GameInformation } from "../engine/GameInformation";
import { Input } from "../engine/Input";
import { MainScene } from "./main";
import { TextLabel } from "./TextLabel";

export class TitleScene extends Scene {
  constructor (renderingTarget: HTMLCanvasElement) {
    super('Title', 'black', renderingTarget);
    const title = new TextLabel(100, 200, 'Danmaku');

    this.add(title);
  }

  update(gameInfo: GameInformation, input: Input) {
    super.update(gameInfo, input);

    if(input.getKeyDown(' ')) {
      const mainScene = new MainScene(this.renderingTarget);
      this.changeScene(mainScene);
    }
  }
}
