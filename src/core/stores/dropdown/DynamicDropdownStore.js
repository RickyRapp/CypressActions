import _ from 'lodash';
import { action, observable } from 'mobx';

class DynamicDropdownStore {
    @observable value = null;
    @observable visible = false;

    config = {
        placeholder: 'Select...',
        valueMap: (value) => value
    }

    constructor(rootStore, config) {
        this.rootStore = rootStore;
        _.merge(this.config, config);
    }

    get placeholder() { return this.config.placeholder; }

    @action.bound
    setValue(value) {
        this.value = this.config.valueMap(value);
    }

    // function getValue() {
    //     const value = props.value || store.value;
    //     return _.isString(value)
    //             ? store.items.find(i => i[store.options.dataItemKey] === value)
    //             : value;
    // }

    @action.bound 
    setVisible(visible) {
        this.visible = visible;
    }

    @action.bound
    toggleVisibility() {
        this.setVisible(!this.visible);
    }
}

export default DynamicDropdownStore;