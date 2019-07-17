import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';

class BookletOrderListFilter extends FilterParams {
    @observable donorAccountId;
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable confirmationNumber;
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
    @observable bookletOrderStatusIds;
    @observable deliveryMethodTypeIds;
    @observable exportLimit;
    @observable exportFields;

    constructor() {
        super();

        this.reset();
    }

    @action reset() {
        super.reset();
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.confirmationNumber = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
        this.bookletOrderStatusIds = null;
        this.deliveryMethodTypeIds = null;
        this.exportLimit = null;
        this.exportFields = null;
    }
}

export default BookletOrderListFilter;