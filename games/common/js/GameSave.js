'use strict';

class GameSave {
    load(slot) {
        return localStorage[`slot ${slot}`];
    }

    getList() {
        const zero = this.load(0),
            one = this.load(1),
            two = this.load(2),
            def = '---'
        ;

        return [
            (typeof(zero) !== 'undefined') ? zero : def,
            (typeof(one) !== 'undefined') ? one : def,
            (typeof(two) !== 'undefined') ? two : def
        ];
    }

    save(slot, data) {
        localStorage[`slot ${slot}`] = data;
    }

    erase(slot) {
        localStorage.removeItem(`slot ${slot}`);
        return this.getList();
    }
}
