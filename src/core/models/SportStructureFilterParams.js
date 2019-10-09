import {action, observable} from 'mobx';
import {FilterParams} from 'core/models/index';

class SportStructureFilterParams extends FilterParams {
    @observable sportIds = [];
    @observable sportCategoryIds = [];
    @observable tournamentIds = [];

    constructor() {
        super();

        this.reset();
    }

    @action
    reset() {
        super.reset();

        this.sportIds = [];
        this.sportCategoryIds = [];
        this.tournamentIds = [];
    }
}

export default SportStructureFilterParams;
