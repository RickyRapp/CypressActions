import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class BookletOrderListFilter extends FilterParams {
    @observable donorAccountId;
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable confirmationNumber;
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
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
        this.donorAccountId = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.confirmationNumber = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
        this.bookletOrderStatusIds = null;
        this.deliveryMethodTypeIds = null;
        this.trackingNumber = null;
        this.bookletCodes = null;
    }
}

export default BookletOrderListFilter;
