function GameSave() {
    return {
        load: function (slot) {
            return localStorage["slot" + slot];
        },

        getList: function () {
            return list = [
                this.load(0),
                this.load(1),
                this.load(2)
            ];
        },

        store: function (slot, data) {
            localStorage["slot" + slot] = data;
        },


        update: function () {
            // GameSaveView
        }
    };
}