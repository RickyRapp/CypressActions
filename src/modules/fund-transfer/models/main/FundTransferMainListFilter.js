import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';

class FundTransferMainListFilter extends FilterParams {
    @observable donorAccountId;
    @observable senderDonorAccountId;
    @observable recipientDonorAccountId;
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;

    constructor(rootStore) {
        super();

        if (rootStore.authStore.hasPermission('theDonorsFundDonorSection.read')) {
            this.donorAccountId = rootStore.authStore.user.id;
        }
        else {
            //TODO:
            //reporter role, fetch user id from local storage
        }

        this.reset();
    }

    @action reset() {
        super.reset();
        this.senderDonorAccountId = null;
        this.recipientDonorAccountId = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
    }
}

export default FundTransferMainListFilter;