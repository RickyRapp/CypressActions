import _ from 'lodash';
import { merge } from 'lodash';
import { observable, action, computed, runInAction } from 'mobx';
import { LoaderStore } from 'core/stores';

class BaasicDropdownStore {
  @observable.ref items = [];
  @observable _value = null;

  filterTimeout = null;
  loaderStore = new LoaderStore();

  options = {
    placeholder: null,
    filterable: false,
    textField: 'label',
    dataItemKey: 'value',
    filterDebounce: 500,
    multi: false,
    defaultItem: null,
    clearable: true,
    disabled: false,
    initFetch: true
  };

  actions = {
    onFilter: this.defaultFilter,
    fetchFunc: null,
    onChange: selected => selected,
    onOpen: () => { }
  };

  constructor(options = null, actions = null, initialState = null) {
    if (options) merge(this.options, options);
    if (actions) merge(this.actions, actions);
    if (initialState) this.items = initialState;

    this.onOpen = this.onOpen.bind(this);

    this.onFilter = this.onFilter.bind(this);
    this.onChange = this.onChange.bind(this);
    this.filterAsync = this.filterAsync.bind(this);
    this.filterInMemory = this.filterInMemory.bind(this);

    if (this.actions.fetchFunc && this.options.initFetch) {
      this.onFilter();
    }
  }

  @computed get loading() {
    return this.loaderStore.loading;
  }
  @computed get value() {
    const { _value, options } = this;

    const resolveValue = val => {
      return _.isString(val) ? _.find(this.items, i => i[options.dataItemKey] === val) : val;
    };

    return options.multi ? _.map(_value, i => resolveValue(i)) : resolveValue(_value);
  }

  @computed get defaultValue() {
    const { options, items } = this;

    const item =
      !_.isNull(options.defaultItem) && !_.isUndefined(options.defaultItem)
        ? options.defaultItem
        : _.find(items, i => i.default === true);

    return item
      ? {
        ...item,
        [options.textField]: t(item[options.textField]),
        [options.dataItemKey]: item[options.dataItemKey] || null
      }
      : undefined;
  }

  set value(value) {
    runInAction(() => {
      this._value = value;
    });
  }

  @action.bound
  async defaultFilter(filterTerm) {
    return this.actions.fetchFunc
      ? this.filterAsync(filterTerm)
      : this.filterInMemory(filterTerm);
  }

  @action.bound
  filterInMemory(filterTerm) {
    const items = _.filter(
      this.items.slice(),
      i => filterTerm && i[this.options.textField] === filterTerm
    );
    this.setItems(items);
  }

  @action.bound
  async filterAsync(filterTerm) {
    const { options, actions } = this;

    this.setLoading(true);
    const response = await actions.fetchFunc(filterTerm);

    runInAction(() => {
      const items = _.map(response, t => ({
        [options.textField]: t[options.textField],
        [options.dataItemKey]: t[options.dataItemKey]
      }));

      this.setItems(items);
      this.setLoading(false);
    });
  }

  @action.bound
  setLoading(value) {
    if (value === true) {
      this.loaderStore.suspend();
    } else {
      this.loaderStore.resume();
    }
  }

  @action.bound
  setItems(items) {
    this.items = items;
  }

  onFilter(event) {
    const { actions, options } = this;

    clearTimeout(this.filterTimeout);
    return new Promise(resolve => {
      this.filterTimeout = setTimeout(() => {
        let filterValue = null;

        if (event && event.value && event.value !== '') {
          filterValue = event.value;
        }

        actions.onFilter(filterValue).then(() => {
          resolve();
        });
      }, options.filterDebounce);
    });
  }

  onChange(value) {
    this.value = value;
    this.actions.onChange(value);
  }

  onOpen(value) {
    this.actions.onOpen(value);
  }
}

export default BaasicDropdownStore;
