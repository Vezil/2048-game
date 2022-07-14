class P5 {
    constructor() {}

    setup() {}
    map(length) {
        return length === 1 ? 64 : 0;
    }
}

global.p5 = P5;

export default P5;
