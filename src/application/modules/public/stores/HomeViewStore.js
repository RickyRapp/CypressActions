import { BaseViewStore } from 'core/stores';
import { action } from 'mobx';

class HomeViewStore extends BaseViewStore {
    constructor(rootStore) {
        super(rootStore);
    }
}

export default HomeViewStore;
