import { GameState } from "./state/game";
import { ScreenBufferHD, Terminal } from "terminal-kit";
import { autoInjectable, inject } from "tsyringe";
import { SnakeDirection } from "./state/snake";
import { fieldHeight, fieldWidth } from "./config";

@autoInjectable()
export class SnakeGame {
  private screen: ScreenBufferHD;

  constructor(private gameState: GameState, @inject('term') private term: Terminal) {
    this.screen = new ScreenBufferHD({ dst: term, width: fieldWidth, height: fieldHeight });
  }

  async start() {
    this.gameState.init();
    this.term.grabInput({});

    this.term.on('key', (key: string) => {
      switch (key) {
        case 'CTRL_C':
          this.exit(0);
          break;
        case 'LEFT':
          this.moveLeft()
          break;
        case 'RIGHT':
          this.moveRight()
          break;
        case 'UP':
          this.moveUp()
          break;
        case 'DOWN':
          this.moveDown()
          break;
        case 'q':
          this.exit(0);
          break;
        default:
          this.idle();
      }
      this.redraw();
    });

    this.redraw();
  }

  moveLeft() {
    this.gameState.move(SnakeDirection.Left);
  }

  moveRight() {
    this.gameState.move(SnakeDirection.Right);
  }
  moveUp() {
    this.gameState.move(SnakeDirection.Up);
  }
  moveDown() {
    this.gameState.move(SnakeDirection.Down);
  }

  idle() {
    this.redraw();
  }

  redraw() {
    this.screen.clear();
    this.gameState.snake.body.forEach(segment => {
      this.screen.put({
        x: segment.x,
        y: segment.y,
        attr: {},
        wrap: false,
        dx: 0,
        dy: 0
      }, segment.t);
    });

    this.screen.put({
      x: this.gameState.food.x,
      y: this.gameState.food.y,
      attr: {
        color: 255,
        bgColor: 0,
      },
      wrap: false,
      dx: 0,
      dy: 0,
    }, this.gameState.food.t);

    this.screen.put({
      x: 0,
      y: fieldHeight - 1,
      attr: {
        color: 255,
        bgColor: 0,
      },
      wrap: false,
      dx: 1,
      dy: 0
    }, `Score: ${this.gameState.score}`);

    this.screen.draw();
  }

  exit(code: number) {
    console.log('Bye!');
    this.term.processExit(code);
  }
}
