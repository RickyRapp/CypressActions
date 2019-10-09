import {action, observable} from 'mobx';

class DateRangeQueryPickerStore{
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
    }
}

export default DateRangeQueryPickerStore;
