import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class BookletListFilter extends FilterParams {
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
    @observable bookletStatusIds;
    @observable codes;
    @observable denominationTypeIds;
    @observable trackingNumber;
    @observable deliveryMethodTypeIds;
    @observable donorId;

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
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
        this.bookletStatusIds = null;
        this.codes = null;
        this.denominationTypeIds = null;
        this.trackingNumber = null;
        this.deliveryMethodTypeIds = null;
    }
}

export default BookletListFilter;
