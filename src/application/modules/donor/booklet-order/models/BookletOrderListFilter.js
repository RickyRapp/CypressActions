import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class BookletOrderListFilter extends FilterParams {
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable confirmationNumber;
    @observable dateCreatedTo;
    @observable dateCreatedFrom;
    @observable bookletOrderStatusIds;
    @observable deliveryMethodTypeIds;
    @observable trackingNumber;
    @observable bookletCodes;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.confirmationNumber = null;
        this.dateCreatedTo = null;
        this.dateCreatedFrom = null;
        this.bookletOrderStatusIds = null;
        this.deliveryMethodTypeIds = null;
        this.trackingNumber = null;
        this.bookletCodes = null;
    }
}

export default BookletOrderListFilter;
