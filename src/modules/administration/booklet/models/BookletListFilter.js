import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';

class BookletListFilter extends FilterParams {
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
    @observable bookletStatusIds;
    @observable codes;
    @observable denominationTypeIds;

    constructor() {
        super();

        this.reset();
    }

    @action reset() {
        super.reset();
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
        this.bookletStatusIds = null;
        this.codes = null;
        this.denominationTypeIds = null;
    }
}

export default BookletListFilter;