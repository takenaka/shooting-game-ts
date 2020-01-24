export class Rectangle {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  hitTest(other: Rectangle) {
    const horizontal =
      other.x < this.x + this.width && this.x < other.x + other.width;
    const vertical =
      other.y < this.y + this.height && this.y < other.y + other.height;
    return horizontal && vertical;
  }
}
