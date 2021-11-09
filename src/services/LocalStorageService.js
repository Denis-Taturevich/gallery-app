export default class LoacalStorageService {
    static addValue(value) {
        if (value && !localStorage.getItem(value)) {
            localStorage.setItem(value, value);
            return true;
        }

        return false;
    }

    static getValues() {
        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            values.push({
                key: i,
                value: localStorage.getItem(keys[i]),
            });
        }

        return values;
    }
}
