import _ from 'lodash';
import { action, observable, computed } from 'mobx';
import { ListBoxPanelStore } from 'core/stores';

class ListBoxStore {
    rawItems = [];
    rawSelected = [];
    @observable leftPanelStore = null;
    @observable rightPanelStore = null;

    @computed get isDirty() {
        const result = this.getResult();

        return result.added.length > 0 || result.removed.length > 0;
    }

    options = {
        selectionKey: 'value',
        columns: [
            {
                key: 'value',
            }
        ],
        leftHeader: 'LISTBOX.LEFT_HEADER',
        rightHeader: 'LISTBOX.RIGHT_HEADER',
        paging: null,
        rowHeight: 25,
        tableHeight: 300
    };

    actions = {
        onChange: () => {},
    };

    constructor({
        options = {},
        actions = {},
        items = [],
        selected = []
    }) {
        if (options) _.merge(this.options, options);
        if (actions) _.merge(this.actions, actions);

        this.leftPanelStore = new ListBoxPanelStore({
            options: this.options,
            actions: { onSelect: this.onLeftSelect },
        });

        this.rightPanelStore = new ListBoxPanelStore({
            options: this.options,
            actions: { onSelect: this.onRightSelect },
        });

        this.initialize(items, selected);
    }

    @computed get loading() {
        return this.leftPanelStore.loading || this.rightPanelStore.loading;
    }

    async initialize(leftSource, rightSource) {
        this.leftPanelStore.setLoading(true);
        this.rightPanelStore.setLoading(true);

        const responses = await Promise.all([
            resolve(rightSource),
            resolve(leftSource)
        ]);

        const [ selected, items ] = responses;

        this.rawItems = items.slice();
        this.rawSelected = selected.slice();

        let leftItems = [];
        let rightItems = [];

        const { selectionKey } = this.options;

        const comparer = (item, selected) => {
            return _.isString(selected) ?
                selected === item[selectionKey] : selected[selectionKey] === item[selectionKey];
        };

        _.each(items, (item) => {
            if (_.some(selected, s => comparer(item, s))) {
                rightItems.push(item);
            } else {
                leftItems.push(item);
            }
        });

        this.leftPanelStore.setItems(leftItems);
        this.rightPanelStore.setItems(rightItems);

        this.leftPanelStore.setLoading(false);
        this.rightPanelStore.setLoading(false);
    }

    getResult() {
        const selectionKey = this.options.selectionKey;
        const compareSelected = (s1, s2) => _.isString(s1) ? s1 === s2 : s1[selectionKey] === s2[selectionKey];
        return {
            added: _.filter(this.rightPanelStore.items, i => !_.some(this.rawSelected, s => compareSelected(i, s))),
            removed: _.filter(this.rawSelected, i => !_.some(this.rightPanelStore.items, s => compareSelected(i, s))),
            same: _.filter(this.rawSelected, i => _.some(this.rightPanelStore.items, s => compareSelected(i, s)))
        }
    }

    @action.bound
    onLeftSelect() {
        this.rightPanelStore.clearSelection();
    }

    @action.bound
    onRightSelect() {
        this.leftPanelStore.clearSelection();
    }

    @action.bound
    moveRight() {
        const leftSelected = this.leftPanelStore.cutSelected();
        this.rightPanelStore.items = [...this.rightPanelStore.items, ...leftSelected];
        this.rightPanelStore.paging.setTotal(this.rightPanelStore.items.length);
        this.actions.onChange(leftSelected);
    }

    @action.bound
    moveLeft() {
        const rightSelected = this.rightPanelStore.cutSelected();
        this.leftPanelStore.items = [...this.leftPanelStore.items, ...rightSelected];
        this.leftPanelStore.paging.setTotal(this.leftPanelStore.items.length);
        this.actions.onChange(rightSelected);
    }
}

function resolve(data, params) {
    return typeof data === 'function' ? data(params) : Promise.resolve(data);
}

export default ListBoxStore;
