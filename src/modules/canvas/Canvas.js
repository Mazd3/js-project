class Canvas {
    constructor({ 
        WIN,
        id,
        width = 100,
        height = 100,
        callbacks = {}
    }) {

        this.WIN = WIN;
        this.canvas = document.getElementById(id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
    }
    
    sx(x) {
        return x * this.WIN.WIDTH / this.canvas.width;
    }
    sy(y) {
        return -y * this.WIN.HEIGHT / this.canvas.height;
    }

    xs(x) {
        return (x - this.WIN.LEFT) * this.canvas.width / this.WIN.WIDTH;
    }
    ys(y) {
        return this.canvas.height - ((y - this.WIN.BOTTOM) * this.canvas.height / this.WIN.HEIGHT);
    }
    clear() {
        this.context.fillStyle = '#EEEEEE'; // background 
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#A00"; // цвет названия оси
        this.context.font = "italic 15pt Arial";
        this.context.fillText("x", this.xs(this.WIN.WIDTH + this.WIN.LEFT - this.WIN.WIDTH / 35), this.ys(-this.WIN.WIDTH / 25));
        this.context.fillText("y", this.xs(-this.WIN.WIDTH / 25), this.ys(this.WIN.BOTTOM + this.WIN.HEIGHT - this.WIN.WIDTH / 35));
    }
    line(
        x1, y1, x2, y2,
        color = '#000', width = 2, isDash) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.lineWidth = width;
        if (isDash) {
            this.context.setLineDash([5, 3]);
        } else {
            this.context.setLineDash([]);
        }
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
    }

    point(x, y, color = '#00f', size = 1) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.context.arc(this.xs(x), this.ys(y), size, 0, Math.PI * 2);
        this.context.stroke();
        this.context.fill();
    }

    polygon(points, color = '#f805') {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
        for (let i = 1; i < points.length; i++) {
            this.context.lineTo(
                this.xs(points[i].x),
                this.ys(points[i].y)
            );
        }
        this.context.lineTo(
            this.xs(points[0].x),
            this.ys(points[0].y)
        );
        this.context.closePath();
        this.context.fill();
    }

    text(str, x, y, color) {
        this.context.font = "20px serif";
        this.context.fillStyle = color || 'black';
        this.context.fillText(str, this.xs(x), this.ys(y));
    }

    draw(){
        console.log('asdsad');
    }


    /*tangent(x, y,color = 'f80000', dash=true) {  //касательная
        this.context.moveTo(0, 0);
        this.context.strokeStyle = color;
        this.context.lineWidth = 5; // толщина линии
        this.canvas.onclick = function () {
            const x = this.sx.event.movementX;
            const y = this.sy.event.movementY;
            this.context.lineTo(x, y); //рисуем линию
            this.context.stroke();
        }
    }*/
}

export default Canvas;