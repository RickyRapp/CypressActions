import { observable } from 'mobx';
import {BaseViewStore} from 'core/stores';

class BaseTreeViewStore extends BaseViewStore {
    @observable treeData = [];

    constructor() {
        super();
    }
}

export default BaseTreeViewStore;
