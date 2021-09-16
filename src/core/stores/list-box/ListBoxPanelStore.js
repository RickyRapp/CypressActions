import _ from 'lodash';
import { action, extendObservable, observable } from 'mobx';

class ListBoxPanelItem {
    constructor(json, selected = false) {
        extendObservable(this, {
            ...json,
            selected,
            visible: false,
            setSelected(s) {
                this.selected = s;
            },
            toggleSelected() {
                this.setSelected(!this.selected);
            },
            setVisible(visible) {
                this.visible = visible;
            }
        }, {
            setSelected: action,
            toggleSelected: action,
            setVisible: action
        });
    }
}

class ListBoxPager {
    @observable pageSize = 10;
    @observable pageNumber = 1;
    @observable total = 0;
    @observable skip = 0;
    
    @action.bound
    setSkip(skip) {
        this.skip = skip;
    }

    @action.bound
    setPageSize(pageSize) {
        this.pageSize = pageSize;
    }

    @action.bound
    setTotal(total) {
        this.total = total;
    }

    @action.bound
    setPageNumber(pageNumber) {
        this.pageNumber = pageNumber;
    }
}

class ListBoxPanelStore {
    @observable items = [];
    @observable lastSelected = null;
    @observable loading = false;
    @observable lastVisible = false;

    options = {
        selectionKey: 'value',
        columns: [],
        paging: null,
        rowHeight: 25,
        tableHeight: 300
    }

    actions = {
        onSelect: () => {},
        onSearch: () => {},
        onPageChange: null,
    }

    paging = new ListBoxPager();
    
    constructor({ options, actions, items }) {
        if (options) _.merge(this.options, options);
        if (actions) _.merge(this.actions, actions);

        if (this.options.paging) {
            const { pageNumber, pageSize } = this.options.paging;
            
            if (pageNumber) {
                this.paging.setPageNumber(pageNumber);
            }
            
            if (pageSize) {
                this.paging.setPageSize(this.options.paging.pageSize);
            }            
        }
    
        this.setItems(items || []);
    }

    mapItems(items) {
         return _.map(items, i => new ListBoxPanelItem(i, false));
    }

    @action.bound
    setItems(items) {
        this.items = this.mapItems(items);
        this.paging.setTotal(this.items.length);
    }

    @action.bound
    appendItems(items) {
        this.items = [
            ...this.items, 
            ...this.mapItems(items)
        ];
        this.paging.setTotal(this.items.length);
    }

    @action.bound
    onSelect(event) {
        const { dataItem, nativeEvent: { shiftKey, ctrlKey } } = event;
        
        const { selectionKey } = this.options;
        const current = _.findIndex(this.items, item => item[selectionKey] === dataItem[selectionKey]);
        let last = _.findIndex(this.items, item => item[selectionKey] === this.lastSelected);

        if (!shiftKey) {
            this.lastSelected = this.items[current][selectionKey];
            last = current;
        }

        if (!ctrlKey) {
            _.each(this.items, i => i.setSelected(false));
        }

        let selected = [];
        for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
            const item = this.items[i];
            if (item) {
                item.setSelected(!item.selected);
                if (item.selected) {
                    selected.push(item);
                }
            }
        }

        this.actions.onSelect(selected.slice());
    }

    @action.bound onSearch() {

    }

    @action.bound
    setLoading(loading) {
        this.loading = loading;
    }

    @action.bound
    async onPageChange(event) {
        const { page: { skip, take } } = event;
        this.paging.setSkip(skip);    
        
        if (this.actions.onPageChange) {
            const { containerHeight, tableTranslate } = event.target.vs;
            const scrolledToBottom = tableTranslate >= containerHeight - this.options.tableHeight - this.options.rowHeight;                        
            if (!this.loading && scrolledToBottom) {    
                this.paging.setPageNumber(this.paging.pageNumber + 1);
                this.actions.onPageChange({ 
                    pageNumber: this.paging.pageNumber, 
                    pageSize: take 
                });                
            }
        }        
    }

    @action.bound
    cutSelected() {
        const removed = _.remove(this.items, i => i.selected);
        _.each(removed, r => r.setSelected(false));

        this.paging.setTotal(this.items.length);

        const newSkip = (this.paging.skip + this.paging.pageSize) >= this.paging.total ? 
            (this.paging.total - this.paging.pageSize) : this.paging.skip;

        setTimeout(() => {
            // since telerik grid scrolls to top when datasource count changes,
            // user timeout to scroll back where user was before
            this.paging.setSkip(newSkip > 0 ? newSkip : 0);
        }, 1);        

        return removed.slice();
    }

    @action.bound
    setLastVisible(visible) {
        this.lastVisible = visible;
    }

    @action.bound
    clearSelection() {
        _.each(this.items, (i) => i.setSelected(false));
    }
}

export default ListBoxPanelStore;