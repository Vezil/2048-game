export default class Tile {
    constructor(p5, height, width, value, x, y) {
        this.p5 = p5;
        this.height = height;
        this.width = width;
        this.value = value;
        this.x = x;
        this.y = y;
        this.newX = x;
        this.newY = y;
        this.isMerged = false;
        this.isNew = true;
        this.isRemoved = false;
    }

    textSize() {
        const { length } = this.value.toString();

        return Math.floor(this.p5.map(length, 1, 4, 64, 34));
    }

    color() {
        const colors = [
            '#FFA822',
            '#134E6F',
            '#FF6150',
            '#1AC0C6',
            '#DEE0E6',
            '#95ADBE',
            '#574F7D',
            '#503A65',
            '#3C2A4D',
            '#272643',
            '#F6CD61'
        ];
        const values = ['2', '4', '8', '16', '32', '64', '128', '256', '512', '1024', '2048'];
        const index = values.indexOf(this.value.toString());

        if (index < 0) {
            index = 11;
        }

        return colors[index];
    }

    setNewPosition(speed) {
        if (this.x === this.newX && this.y === this.newY) {
            return false;
        }

        if (this.x + speed < this.newX) {
            this.x += speed;
        } else if (this.x - speed > this.newX) {
            this.x -= speed;
        } else {
            this.x = this.newX;
        }

        if (this.y + speed < this.newY) {
            this.y += speed;
        } else if (this.y - speed > this.newY) {
            this.y -= speed;
        } else {
            this.y = this.newY;
        }

        return true;
    }
}
