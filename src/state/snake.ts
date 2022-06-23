import { injectable } from "tsyringe";

export enum SnakeDirection {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

export enum SnakeBodyTypes {
  HeadV = 'Ö',
  HeadH = 'Ü',
  Body = 'O',
}

export interface SnakeBody {
  x: number;
  y: number;
  t: SnakeBodyTypes;
}

const directionMap = {
  [SnakeDirection.Left]: { x: -1, y: 0, t: SnakeBodyTypes.HeadH },
  [SnakeDirection.Right]: { x: 1, y: 0, t: SnakeBodyTypes.HeadH },
  [SnakeDirection.Up]: { x: 0, y: -1, t: SnakeBodyTypes.HeadV },
  [SnakeDirection.Down]: { x: 0, y: 1, t: SnakeBodyTypes.HeadV },
}

@injectable()
export class Snake {
  public body: SnakeBody[] = [];
  public direction = SnakeDirection.Up;

  init(screenSize: { width: number; height: number }) {
    const initialX = Math.floor(screenSize.width / 2);
    const initialY = Math.floor(screenSize.height / 2);

    this.body = [{ x: initialX, y: initialY, t: SnakeBodyTypes.HeadV }, { x: initialX, y: initialY + 1, t: SnakeBodyTypes.Body }, { x: initialX, y: initialY + 2, t: SnakeBodyTypes.Body }];
  }

  grow(direction: SnakeDirection) {
    const delta = directionMap[direction];
    this.body.push({ x: this.body[this.body.length - 1].x + delta.x, y: this.body[this.body.length - 1].y + delta.y, t: SnakeBodyTypes.Body });
  }

  move(direction: SnakeDirection) {
    const delta = directionMap[direction];
    this.direction = direction;
    this.body = this.body.reduce((acc: SnakeBody[], segment, idx, prevBody): SnakeBody[] => {
      if (idx === 0) {
        acc.push({ x: segment.x + delta.x, y: segment.y + delta.y, t: delta.t })
      } else {
        acc.push({ x: prevBody[idx - 1].x, y: prevBody[idx - 1].y, t: SnakeBodyTypes.Body });
      }
      return acc;
    }, []);
  }
}
