export class GameEvent<T = any> {
  constructor(public target: T) {}
}
