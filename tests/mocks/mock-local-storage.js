global.window = {};

global.window.localStorage = {
    data: {},
    getItem: function (key) {
        const value = this.data[key];

        if (value) {
            return value;
        }

        return null;
    },
    setItem: function (key, value) {
        this.data[key] = value;
    },
    removeItem: function (key) {
        delete this.data[key];
    }
};
