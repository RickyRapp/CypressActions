import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';

class CharityListFilter extends FilterParams {
    @observable nameOrTaxId;
    @observable address;
    @observable emails;
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
    @observable charityStatusIds;
    @observable charityTypeIds;
    @observable exportLimit;
    @observable exportFields;

    constructor() {
        super();

        this.reset();
    }

    @action reset() {
        super.reset();
        this.nameOrTaxId = null;
        this.address = null;
        this.emails = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
        this.charityStatusIds = null;
        this.charityTypeIds = null;
        this.exportLimit = null;
        this.exportFields = null;
    }
}

export default CharityListFilter;