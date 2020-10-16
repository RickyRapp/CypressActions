import { merge } from 'lodash';
import { action, observable } from 'mobx';
import { BaasicDropdownStore } from 'core/stores';

class DateRangeQueryPickerStore {
    options = {
        advancedSearch: false,
        fromPropertyName: 'dateCreatedFrom',
        toPropertyName: 'dateCreatedTo'
    };

    constructor(options = null) {
        if (options) merge(this.options, options);

        this.timePeriodDropdownStore = new BaasicDropdownStore(
            {
                clearable: true,
                placeholder: 'DATEPICKER.CHOOSE_A_TIME_PERIOD_PLACEHOLDER'
            },
            {
                fetchFunc: () => {
                    return [
                        {
                            id: 0,
                            name: 'This week'
                        },
                        {
                            id: 1,
                            name: 'This month'
                        },
                        {
                            id: 2,
                            name: 'Last week'
                        },
                        {
                            id: 3,
                            name: 'Last month'
                        }
                    ]
                }
            })
    }

    @observable value = {
        start: null,
        end: null
    }
    @observable errors = {
        fromError: null,
        toError: null
    }

    @action.bound
    setValue = (v) => {
        this.value = v;
    }

    @action.bound
    setError = e => {
        this.errors = e;
    }

    @action.bound
    reset = () => {
        this.value = {
            start: null,
            end: null
        }
        this.errors = {
            fromError: null,
            toError: null
        }
        this.timePeriodDropdownStore.setValue(null);
    }
}

export default DateRangeQueryPickerStore;
