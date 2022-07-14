class P5 {
    constructor() {}

    setup() {}
    map(length) {
        return length === 1 ? 64 : 0;
    }
    random(value) {
        return Array.isArray(value) ? value[0] : value;
    }
}

global.p5 = P5;

export default P5;
