import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class TransactionListFilter extends FilterParams {
    @observable dateCreatedFrom;
    @observable dateCreatedTo;
    @observable paymentTransactionType;

    constructor() {
        super();
        this.reset();
    }

    @action.bound
    reset() {
        super.reset();
        this.dateCreatedFrom = null;
        this.dateCreatedTo = null;
        this.paymentTransactionType = null;
    }
}

export default TransactionListFilter;
