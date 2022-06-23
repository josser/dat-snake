import { Snake, SnakeDirection } from "./snake";
import { Food } from './food';
import { injectable } from "tsyringe";
import { fieldHeight, fieldWidth } from "../config";

const directionMap = {
  [SnakeDirection.Left]: { x: -1, y: 0 },
  [SnakeDirection.Right]: { x: 1, y: 0 },
  [SnakeDirection.Up]: { x: 0, y: -1 },
  [SnakeDirection.Down]: { x: 0, y: 1 }
}

@injectable()
export class GameState {
  score = 0;
  constructor(public snake: Snake, public food: Food) {}

  init() {
    this.snake.init({ width: fieldWidth, height: fieldHeight });
    this.food.init({ width: fieldWidth, height: fieldHeight });
    this.score = 0
  }

  move(direction: SnakeDirection) {
    const isCollision = this.isCollision(direction);
    if (isCollision) {
      return false;
    }
    this.checkFood(direction);
    this.snake.move(direction);
    return true;
  }

  isCollision(direction: SnakeDirection) {
    const delta = directionMap[direction];
    const head = this.snake.body[0];
    const newHead = { x: head.x + delta.x, y: head.y + delta.y };
    if (newHead.x <= 0 || newHead.x >= fieldWidth - 1 || newHead.y <= 0 || newHead.y >= fieldHeight - 1) {
      return true;
    }
    if (this.snake.body.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      return true;
    }
  }

  checkFood(direction: SnakeDirection) {
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
