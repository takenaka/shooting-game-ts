import { Game } from './engine/Game';
import { TitleScene } from './scenes/Title';
import { AssetLoader } from './engine/AssetLoader';

class DanmakuStgGame extends Game {
  constructor() {
    super('弾幕STG', 300, 400, 60);
    const titleScene = new TitleScene(this.screenCanvas);
    this.changeScene(titleScene);
  }
}

(async () => {
  AssetLoader.addImage('sprite', './src/img/sprite.png');
  await AssetLoader.loadAll();

  const game = new DanmakuStgGame();
  document.body.appendChild(game.screenCanvas);
  game.start();
})();
