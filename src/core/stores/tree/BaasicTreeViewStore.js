import { observable, computed, action } from 'mobx';
import * as _ from 'lodash';
import {loop, ROOT_KEY} from 'core/utils/tree';

class BaasicTreeViewStore {
    config = {
        alwaysVisible: false,
        insideContent: false,
        autoExpandParent: false,
        autoShowFiltered: true,
        showIcon: false,

        isSelectable: true, // can be defined as boolean or function ({ item, depth }) => true,
        isCheckable: true, // can be defined as boolean or function ({ item, depth }) => false,
        searchDepth: null,

        actions: {
            onCheck: () => {
            },
            onSearch: (item) => {
                return this.state.searchTerm && item.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1;
            },
            onSelect: () => {
            },
        }
    };

    @observable data = [];

    //TODO if baasic tree view store is needed, please test code, for now it is commented
    // @observable state = {
    //     @observable.ref filterKeys: [],
    //     @observable.ref checkedKeys: [],
    //     @observable.ref selectedKeys: [],
    //     searchTerm: '',
    //     treeVisible: false
    // };

    @observable _searchDebounce = 500
    @observable _searchTimeoutId;

    constructor(rootStore, config = {}, initialState = null) {
        this.rootStore = rootStore;
        this.config = _.merge(this.config, config);

        if (initialState != null) {
            this.state = _.merge(this.state, initialState);
        }
    }

    // @observable.ref filterKeys = [];
    @observable.ref _expandedKeys = [];
    // @observable.ref checkedKeys = [];
    // @observable.ref selectedKeys = [];
    // @observable.ref searchTerm = '';
    @observable treeVisible = false;

    @computed get autoExpandParent() {
        return this.state.filterKeys.length > 0 ? this.config.autoShowFiltered : this.config.autoExpandParent;
    }

    @computed get expandedKeys() {
        return this.state.filterKeys.length > 0 ? _.uniq([...this.state.filterKeys, ...this._expandedKeys]) : this._expandedKeys;
    }

    @computed get checkable() {
        return typeof this.config.isCheckable === 'function' ? true : this.config.isCheckable;
    }

    @computed get selectable() {
        return typeof this.config.isSelectable === 'function' ? true : this.config.isSelectable;
    }

    @action.bound
    setData(data) {
        this.data = data;
    }

    @action.bound
    setFiltered(filterKeys) {
        this.state.filterKeys = filterKeys;
    }

    @action.bound
    setSelected(keys) {
        if(!keys)
            this.state.selectedKeys = [];
        else
            this.state.selectedKeys = keys;
    }

    @action.bound
    setExpanded(keys) {
        this.state.filterKeys = [];

        this._expandedKeys = keys;
    }

    @action.bound
    onExpand(expandedKeys) {
        this.setExpanded(expandedKeys);
    }

    @action.bound
    setChecked(keys) {
        if(!keys) {
            this.state.checkedKeys = [];
        }
        else {
            this.state.checkedKeys = keys;
        }
    }

    @action.bound
    onCheck(checkedKeys, event) {
        this.state.checkedKeys = checkedKeys;
        const indexOfRootKey = checkedKeys.indexOf(ROOT_KEY);
        if (indexOfRootKey !== -1) {
            checkedKeys.splice(indexOfRootKey, 1);
        }
        this.config.actions.onCheck({
            keys: checkedKeys,
            nodes: _.map(event.checkedNodesPositions, n => ({
                pos: n.pos,
                id: n.node.key
            }))
        });
    }

    @action.bound
    onSelect (keys, data) {
        this.config.actions.onSelect(keys, data);
    }

    @action.bound
    onSearch(searchTerm) {
        this.state.searchTerm = searchTerm;
        this.state.filterKeys = [];

        clearTimeout(this._searchTimeoutId)
        this._searchTimeoutId = setTimeout(()=>
            loop(this.data, ({ item, depth }) => {
                item.isFilterMatch = false;

                const updateFunc = () => {
                    item.isFilterMatch = this.config.actions.onSearch(item, searchTerm);
                    if (item.isFilterMatch) {
                        this.setFiltered([...this.state.filterKeys, item.id]);
                    }
                };

                const { searchDepth } = this.config;

                if (searchDepth) {
                    if (searchDepth === depth) {
                        updateFunc();
                    }
                } else {
                    updateFunc();
                }
            })
        , this._searchDebounce)
    }

    @action.bound
    toggleTreeVisibility() {
        this.state.treeVisible = !this.state.treeVisible;
    }
}

export default BaasicTreeViewStore;
