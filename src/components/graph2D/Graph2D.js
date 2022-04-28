import React from 'react';
import UI from './UI/UI';
import Canvas from '../../modules/canvas/Canvas.js';

class Graph2D extends React.Component {
    constructor(props) {
        super(props);
        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
        };
        this.funcs = [];
        this.canMove = false;
    }


    render() {
        return(
            <div>
                <div>
                    <canvas 
                        id='canvas'
                        onWheel={ (event) => this.wheel(event) }
                        onMouseMove={ (event) => this.move(event) }
                        onMouseDown={ () => this.down() }
                        onMouseUp={ () => this.up() }
                    />
                </div>
                <UI
                    draw={ () => this.draw() }
                    funcs={ this.funcs }
                ></UI>
            </div>
        );
    }

    componentDidMount(){
        this.canvas = new Canvas({
            id: 'canvas',
            WIN: this.WIN,
            width: 600,
            height: 600,
        });
        this.draw();
    }

    printFunction(f, color, width) {
        let x = this.WIN.LEFT;
        let dx = this.WIN.WIDTH / 100;
        while (x < this.WIN.WIDTH + this.WIN.LEFT) {
            this.canvas.line(x, f(x), x + dx, f(x + dx), color, width);
            x += dx;
        }

    }
    osi() {
        const { LEFT, BOTTOM, WIDTH, HEIGHT } = this.WIN;
        const lineLenght = 0.2;
        for (let i = 1; i < WIDTH + LEFT; i++) {
            this.canvas.line(i, BOTTOM, i, BOTTOM + HEIGHT, '#AAA', 1);
            this.canvas.line(i, -lineLenght, i, lineLenght, 'black');
        }
        for (let i = -1; i > LEFT; i--) {
            this.canvas.line(i, BOTTOM, i, BOTTOM + HEIGHT, '#AAA', 1);
            this.canvas.line(i, -lineLenght, i, lineLenght, 'black');
        }
        for (let i = 1; i < HEIGHT + BOTTOM; i++) {
            this.canvas.line(LEFT, i, WIDTH + LEFT, i, '#AAA', 1);
            this.canvas.line(-lineLenght, i, lineLenght, i, 'black');
        }
        for (let i = -1; i > BOTTOM; i--) {
            this.canvas.line(LEFT, i, WIDTH + LEFT, i, '#AAA', 1);
            this.canvas.line(-lineLenght, i, lineLenght, i, 'black');
        }
        this.canvas.line(LEFT, 0, WIDTH + LEFT, 0, 'BLACK');//ось х
        this.canvas.line(0, BOTTOM, 0, BOTTOM + HEIGHT, 'BLACK');//ось у
    }

    arrows() {
        const { LEFT, BOTTOM, WIDTH, HEIGHT } = this.WIN;
        this.canvas.line(WIDTH + LEFT, 0, WIDTH + LEFT - WIDTH / 50, WIDTH / 125, 'black', 2);
        this.canvas.line(WIDTH + LEFT, 0, WIDTH + LEFT - WIDTH / 50, -WIDTH / 125, 'black', 2);
        this.canvas.line(0, HEIGHT + BOTTOM, WIDTH / 125, HEIGHT + BOTTOM - WIDTH / 50, 'black', 2);
        this.canvas.line(0, HEIGHT + BOTTOM, -WIDTH / 125, HEIGHT + BOTTOM - WIDTH / 50, 'black', 2);
    }



    getDerivative(f, x0, dx = 0.0001) {
        return ((f(x0 + dx) - f(x0)) / dx);
    }

    printIntegral(f, a, b, n = 100) {
        const dx = (b - a) / n;
        let x = a;
        const points = [];
        points.push({ x, y: 0 });
        while (x <= b) {
            points.push({ x, y: f(x) });
            x += dx;
        }
        points.push({ x: b, y: 0 });
        this.canvas.polygon(points);
    }

    getIntegral(f, a, b, n = 100) {
        const dx = (b - a) / n;
        let x = a;
        let S = 0;
        while (x <= b) {
            S += f(x) + f(x + dx) / 2 * dx;
            x += dx;
        }
    }

    printDerivative(f, x0, dx) {
        const k = this.getDerivative(f, x0, dx);
        const b = f(x0) - k * x0;
        const x1 = this.WIN.LEFT;
        const x2 = this.WIN.LEFT + this.WIN.WIDTH;

        this.canvas.line(
            x1, k * x1 + b,
            x2, k * x2 + b,
            '#00a', 1, true
        );

    }

    wheel(event) {
        const delta = (event.deltaY > 0) ? 1 : -1;
        this.WIN.WIDTH += delta;
        this.WIN.HEIGHT += delta;
        this.WIN.LEFT -= delta / 2;
        this.WIN.BOTTOM -= delta / 2;
        this.draw();
    }


    

    down() {
        this.canMove = true;
    }

    up() {
        this.canMove = false;
    }

    move(event) {
        if (this.canMove) {
            this.WIN.LEFT -= this.canvas.sx(event.movementX);
            this.WIN.BOTTOM -= this.canvas.sy(event.movementY);
        }
        this.draw();
    }

    draw() {
        this.canvas.clear();
        this.osi();
        this.arrows();
        this.funcs.forEach((func) => {
            if (func) {
                // this.printIntegral(func.f, 1, 5);
                this.printFunction(func.f, func.color, func.width);
                // this.printDerivative(func.f, this.derivativeX);
            }
        });
    }

}

export default Graph2D