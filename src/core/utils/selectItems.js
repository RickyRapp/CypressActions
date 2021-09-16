import { action, observable } from 'mobx';

class SelectItems {
    constructor(items = []) {
        this.items = items;
    }

    @observable loading = false;
    @observable items = [];

    @action.bound suspend() {
        this.loading = true;
    }

    @action.bound resume() {
        this.loading = false;
    }

    @action.bound setItems(items) {
        this.items = items;
    }
}

export default SelectItems;
