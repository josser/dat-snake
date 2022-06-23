import { Snake, SnakeDirection } from "./snake";
import { Food } from './food';
import { injectable } from "tsyringe";
import { fieldHeight, fieldWidth } from "../config";

@injectable()
export class GameState {
  score: number;
  constructor(public snake: Snake, public food: Food) {
    this.score = 0;
  }

  init() {
    this.snake.init({ width: fieldWidth, height: fieldHeight });
    this.food.init({ width: fieldWidth, height: fieldHeight });
  }

  move(direction: SnakeDirection) {
    this.checkCollision(direction);
    this.checkFood(direction);
    this.snake.move(direction);
  }

  checkCollision(direction: SnakeDirection) {

  }

  checkFood(direction: SnakeDirection) {
    const directionMap = {
      [SnakeDirection.Left]: { x: -1, y: 0 },
      [SnakeDirection.Right]: { x: 1, y: 0 },
      [SnakeDirection.Up]: { x: 0, y: -1 },
      [SnakeDirection.Down]: { x: 0, y: 1 }
    }
    const delta = directionMap[direction];
    const head = this.snake.body[0];
    const newHead = { x: head.x + delta.x, y: head.y + delta.y };
    if (this.food.x === newHead.x && this.food.y === newHead.y) {
      this.score++;
      this.food.init({ width: fieldWidth, height: fieldHeight });
      this.snake.grow(direction);
    }
  }
}
