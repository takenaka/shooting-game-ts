import { Scene } from "../engine/Scene";
import { Fighter } from "../actors/sprites/Fighter";
import { Enemy } from "../actors/sprites/Enemy";
import { EnemyHpBar } from "../actors/sprites/EnemyHpBar";
import { EventName } from "../engine/EventDispatcher";
import { GameOverScene } from "./GameOver";
import { ClearScene } from "./Clear";

export class MainScene extends Scene {
  constructor(renderingTarget: HTMLCanvasElement) {
    super('Main', 'black', renderingTarget);
    const fighter = new Fighter(150, 300);
    const enemy = new Enemy(150, 100);
    const hpBar = new EnemyHpBar(50, 20, enemy);

    this.add(fighter);
    this.add(enemy);
    this.add(hpBar);

    fighter.addEventListener(EventName.destroy, e => {
      const scene = new GameOverScene(this.renderingTarget);
      this.changeScene(scene);
    })

    enemy.addEventListener(EventName.destroy, e => {
      const scene = new ClearScene(this.renderingTarget);
      this.changeScene(scene);
    })
  }
}
