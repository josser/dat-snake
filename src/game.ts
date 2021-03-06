import { GameState } from "./state/game";
import { Rect, ScreenBuffer, Terminal } from "terminal-kit";
import { autoInjectable, inject } from "tsyringe";
import { SnakeDirection } from "./state/snake";
import { IConfig } from "./config";

@autoInjectable()
export class SnakeGame {
  constructor(
    private gameState: GameState,
    @inject('term') private term: Terminal,
    @inject('screenbuffer') private screen: ScreenBuffer,
    @inject('config') private config: IConfig,
  ) { }

  resetField() {
    this.screen.fill({
      attr: {
        bgColor: 0,
      }
    });
    this.screen.fill({
      // @ts-ignore
      region: new Rect({
        x: 0,
        y: this.config.fieldHeight - 1,
        width: this.config.fieldWidth,
        height: 1
      }),
      attr: {
        bgColor: 8,
     },
    })
  }

  start() {
    this.gameState.init();
    this.term.grabInput({});

    this.term.on('key', (key: string) => {
      let result = true;
      switch (key) {
        case 'CTRL_C':
          this.exit(0);
          break;
        case 'LEFT':
          result = this.moveLeft()
          break;
        case 'RIGHT':
          result = this.moveRight()
          break;
        case 'UP':
          result = this.moveUp()
          break;
        case 'DOWN':
          result = this.moveDown()
          break;
        case 'q':
          this.exit(0);
          break;
        default:
          result = this.idle();
      }

      if (!result) {
        this.gameState.init();
      }

      this.redraw();
    });

    this.redraw();
  }

  moveLeft() {
   return this.gameState.move(SnakeDirection.Left);
  }

  moveRight() {
    return this.gameState.move(SnakeDirection.Right);
  }
  moveUp() {
    return this.gameState.move(SnakeDirection.Up);
  }
  moveDown() {
    return this.gameState.move(SnakeDirection.Down);
  }

  idle() {
    this.redraw();
    return true;
  }

  redraw() {
    this.resetField();
    this.gameState.snake.body.forEach(segment => {
      this.screen.put({
        x: segment.x,
        y: segment.y,
        attr: {
          bgColor: 0,
        },
        wrap: false,
        dx: 0,
        dy: 0
      }, segment.t);
    });

    this.screen.put({
      x: this.gameState.food.x,
      y: this.gameState.food.y,
      attr: {
        color: 2,
        bgColor: 0,
      },
      wrap: false,
      dx: 0,
      dy: 0,
    }, this.gameState.food.t);

    this.screen.put({
      x: 0,
      y: this.config.fieldHeight - 1,
      attr: {
        color: 2,
        bgColor: 8,
      },
      wrap: false,
      dx: 1,
      dy: 0
    }, `Score: ${this.gameState.score}`);

    this.screen.draw();
  }

  exit(code: number) {
    this.term.processExit(code);
  }
}
