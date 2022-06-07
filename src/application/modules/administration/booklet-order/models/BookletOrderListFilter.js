import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class BookletOrderListFilter extends FilterParams {
    @observable donorId;
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable confirmationNumber;
    @observable dateCreatedTo;
    @observable dateCreatedFrom;
    @observable bookletOrderStatusIds;
    @observable deliveryMethodTypeIds;
    @observable trackingNumber;
    @observable bookletCodes;
    @observable sendTo;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.donorId = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.confirmationNumber = null;
        this.dateCreatedTo = null;
        this.dateCreatedFrom = null;
        this.bookletOrderStatusIds = null;
        this.deliveryMethodTypeIds = null;
        this.trackingNumber = null;
        this.bookletCodes = null;
        this.sendTo = null;
    }
}

export default BookletOrderListFilter;
