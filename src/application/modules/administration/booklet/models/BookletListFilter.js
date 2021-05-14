import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class BookletListFilter extends FilterParams {
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
    @observable bookletStatusIds;
    @observable bookletTypeIds;
    @observable codes;
    @observable denominationTypeIds;
    @observable donorId;
    @observable trackingNumber;
    @observable deliveryMethodTypeIds;
    @observable donorsName;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
        this.bookletStatusIds = null;
        this.bookletTypeIds = null;
        this.codes = null;
        this.denominationTypeIds = null;
        this.trackingNumber = null;
        this.deliveryMethodTypeIds = null;
        this.donorsName = null;
    }
}

export default BookletListFilter;
