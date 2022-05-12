import Snake, { Direction } from "./snake";
import Vector from "./vector";
import Food from "./food";
import Random from "./random";
import { EventEmitter } from "../../../../node_modules/eventemitter3";

export enum KEYS {
    ARROW_LEFT = 37,
    ARROW_UP = 38,
    ARROW_RIGHT = 39,
    ARROW_DOWN = 40
}

export interface GameSettings {
    width?: number;
    height?: number;
    scale?: number;
    speed?: number;
}

const DefaultSettings: GameSettings = {
    width: 40,
    height: 30,
    scale: 15,
    speed: 50
}

export default class Game extends EventEmitter {
    private context: CanvasRenderingContext2D;
    private settings: GameSettings;

    private snake: Snake;
    private food: Food = new Food(0, new Vector(0, 0));
    private timestamp?: number = 0;

    private nextKey: number | null = null;

    private _score: number = 0;

    constructor(canvas: HTMLCanvasElement, settings: GameSettings = {}) {
        super();

        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.settings = { ...DefaultSettings, ...settings };


        this.snake = new Snake(this.settings.scale as number, new Vector(0, 0));
    }

    start(): void {
        this.canvas.width = this.settings.width as number * (this.settings.scale as number);
        this.canvas.height = this.settings.height as number * (this.settings.scale as number);

        this.attachKeyboard();
        this.placeFood();
        this.update();
    }

    private placeFood(): void {

        const x = Random.Generate(0, this.settings.width as number - 1);
        const y = Random.Generate(0, this.settings.height as number - 1);

        this.food = new Food(this.settings.scale as number, new Vector(x, y));
    }

    private attachKeyboard(): void {
        document.addEventListener('keydown', e => {
            if (this.nextKey == null || this.nextKey != e.keyCode) {
                this.nextKey = e.keyCode;
            }
        });
    }

    update(timestamp?: number): void {
        timestamp = timestamp || 0;

        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.draw(this.context);

        if (this.timestamp && this.settings.speed && this.settings.width && this.settings.height) {

            console.log("Entro");
            if (timestamp - this.timestamp >= this.settings.speed) {
                this.timestamp = timestamp;

                this.checkKey();

                if (this.snake.move(this.settings.width - 1, this.settings.height - 1)) {
                    this.emit('over', this._score);
                    return;
                }

                this.checkFoodCollision();
            }
        }

        this.food.draw(this.context);

        requestAnimationFrame(this.update.bind(this));
    }

    private checkKey(): void {
        if (this.nextKey == null) {
            return;
        }

        switch (this.nextKey) {
            case KEYS.ARROW_LEFT:
                this.snake.direction = Direction.LEFT;
                break;
            case KEYS.ARROW_UP:
                this.snake.direction = Direction.UP;
                break;
            case KEYS.ARROW_RIGHT:
                this.snake.direction = Direction.RIGHT;
                break;
            case KEYS.ARROW_DOWN:
                this.snake.direction = Direction.DOWN;
                break;
        }

        this.nextKey = null;
    }

    private checkFoodCollision(): void {
        if (this.snake.position.equals(this.food.position)) {
            this.snake.eat(this.food);
            this.emit('score', ++this._score);
            this.placeFood();
        }
    }

    get canvas(): HTMLCanvasElement {
        return this.context.canvas;
    }
}