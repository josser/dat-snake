export enum FoodType {
  RedApple = '',
}
export class Food {
  public x = 0;
  public y = 0;
  public t = FoodType.RedApple;

  init(screenSize: { width: number; height: number }) {
    this.x = Math.floor(Math.random() * screenSize.width);
    this.y = Math.floor(Math.random() * screenSize.height);
    this.t = FoodType.RedApple;
  }
}
