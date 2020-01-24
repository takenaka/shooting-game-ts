import { Rectangle } from './Rectangle';

export class GameInformation {
  constructor(
    private title: string,
    public screenRectangle: Rectangle,
    private maxFps: number,
    private currentFps: number
  ) {}
}
