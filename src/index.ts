import 'reflect-metadata';
import './providers';
import { SnakeGame } from "./game";
import { container } from 'tsyringe';

const gameInstance = container.resolve(SnakeGame);

gameInstance.start();
