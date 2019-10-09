import _ from 'lodash';
import {merge} from 'lodash';
import {observable, action, computed, runInAction, reaction } from 'mobx';
import {LoaderStore} from 'core/stores';

class BaasicDropdownStore {
    @observable.ref originalItems = [];
    @observable.ref filteredItems = [];
    @observable.ref value = null;
    @observable filterTerm;
    loaderStore = new LoaderStore();
    initValueLoaderStore = new LoaderStore();

    @computed get loading() {
        return this.loaderStore.loading || this.initValueLoaderStore.loading;
    }

    @computed get items() {
        let items = this.filteredItems.length > 0 ? this.filteredItems : this.originalItems;
        if (_.isString(this.value)) {
            return items.slice();
        }
        else if (_.isArray(this.value)) {
            return [
                ...items,
                ..._.map(this.value, v => ({
                    ...v,
                    hideInDropdown: true
                }))
            ];
        }
        else if (_.isObject(this.value)) {
            return [
                ...items,
                {
                    ...this.value,
                    hideInDropdown: true
                }
            ];
        }

        return items.slice();
    }

    options = {
        placeholder: null,
        filterable: false,
        textField: 'name',
        dataItemKey: 'id',
        filterDebounce: 500,
        multi: false,
        autoClose: false,
        defaultItem: null,
        initFetch: true,
        virtualized: false,
        virtual: null,
        disabled: false,
        popupSettings: {
            animate: false
        }
    };

    actions = {
        onFilter: this.defaultFilter,
        fetchFunc: null,
        initValueFunc: null,
        onChange: (selected) => selected,
        onOpen: () => {
        },
        onClose: () => {
        }
    };

    constructor(options = null, actions = null, initialState = null) {
        if (options) merge(this.options, options);
        if (actions) merge(this.actions, actions);
        if (initialState) this.originalItems = initialState;
        this.onOpen = this.onOpen.bind(this);

        if (this.actions.fetchFunc && this.options.initFetch) {
            this.onFilter();
            this.actions.onFilter();
        }

        if (this.actions.initValueFunc) {
            this.initValueLoaderStore.suspend();
            this.actions.initValueFunc()
                .then((value) => {
                    this.setValue(value);
                    this.initValueLoaderStore.resume();
                })
                .catch(() => {
                    this.initValueLoaderStore.resume();
                })
        }

        reaction(() => this.filterTerm, term => {
            //console.log('filter reaction');
            this.actions.onFilter(term);
        }, {
            delay: this.options.filterDebounce,
            // fireImmediately: true
        });
    }

    @action.bound
    setValue(value) {
        this.value = value;
    }

    @action.bound
    defaultFilter(filterTerm) {
        return this.actions.fetchFunc ? this.filterAsync(filterTerm) : this.filterInMemory(filterTerm);
    }

    @action.bound
    filterInMemory(filterTerm) {
        const items = _.filter(this.originalItems.slice(), i => {
            if(filterTerm) {
                return i[this.options.textField].toLowerCase().indexOf(filterTerm.toLowerCase()) !== -1;
            }
            return true;
        });

        this.setFilteredItems(items);

        return Promise.resolve();
    }

    @action.bound
    async filterAsync(filterTerm) {
        if(filterTerm == ''){
            filterTerm = undefined;
        }
        
        this.setLoading(true);
        const response = await this.actions.fetchFunc(filterTerm);
        runInAction(() => {
            const items = _.map(response, t => ({
                ...t,
                [this.options.textField]: t[this.options.textField],
                [this.options.dataItemKey]: t[this.options.dataItemKey],
            }));

            this.setItems(items);
            this.setLoading(false);
        });
        return response;
    }

    @action.bound
    setLoading(value) {
        if (value) {
            this.loaderStore.suspend();
        } else {
            this.loaderStore.resume();
        }
    }

    @action.bound
    setItems(items) {
        this.originalItems = items;
    }

    @action.bound
    setFilteredItems(items) {
        this.filteredItems = items;
    }

    @action.bound
    onFilter(value) {
        this.filterTerm = value;
        // this.actions.onFilter(value);
    }

    onChange(value) {
        this.setValue(value);

        let returnValue = null;
        if (!_.isNil(value)) {
            if (this.options.multi) {
                returnValue = value;
            } else {
                returnValue = value[this.options.dataItemKey];
            }
        }
        this.actions.onChange(returnValue);
    }

    @action.bound
    onOpen(event) {
        this.actions.onOpen(event);
    }

    @action.bound
    onClose(event) {
        this.actions.onClose(event);
    }

    has(itemOrId) {
        if (!itemOrId) return false;

        const keyName = this.options.dataItemKey;
        if (_.isString(itemOrId)) {
            return _.some(this.items, i => i[keyName] === itemOrId);
        }

        return _.some(this.items, i => i[keyName] === itemOrId[keyName]);
    }
}

export default BaasicDropdownStore;
