import { action, observable } from 'mobx';
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { LookupService } from "common/data";
import _ from 'lodash';

class BaseCharityListViewStore extends BaseListViewStore {
    @observable charityTypeDropdownStore = null;
    @observable charityStatusDropdownStore = null;
    charityStatuses = null;
    charityTypes = null;
    @observable reviewId = null;

    setColumns = null;
    setActions = null;
    setRenderActions = null;
    setSelectedExportColumnsName = null;
    setAdditionalExportColumnsName = null;

    constructor(rootStore, config) {
        super(rootStore, config.listViewStore);

        this.charityStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'charity-status');
        this.charityTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'charity-type');

        this.selectedExportColumnsName = _.union(['Amount', 'Payment Type'], this.setSelectedExportColumnsName);
        this.additionalExportColumnsName = _.union(['Payer Name', 'Status', 'Created By', 'Date Created'], this.setAdditionalExportColumnsName);

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        this.setStores();

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: this.setColumns,
                actions: _.merge(this.defaultActions, this.setActions),
                actionsRender: _.merge(this.defaultRenderActions, this.setRenderActions)
            })
        );
    }

    @action.bound async loadLookups() {
        let charityTypeModels = await this.charityTypeLookup.getAll();
        this.charityTypes = charityTypeModels.data;

        let charityStatusModels = await this.charityStatusLookup.getAll();
        this.charityStatuses = charityStatusModels.data;
    }

    @action.bound async setStores() {
        this.charityTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: 'Choose Charity Type',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: (options) => this.queryUtility.filter.charityTypeIds = (options ? _.map(options, item => { return item.id }) : null)
            },
            _.map(_.orderBy(this.charityTypes, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );

        this.charityStatusDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: 'Choose Charity Status',
                textField: 'name',
                dataItemKey: 'id',
                clearable: true
            },
            {
                onChange: (options) => this.queryUtility.filter.charityStatusIds = (options ? _.map(options, item => { return item.id }) : null)
            },
            _.map(_.orderBy(this.charityStatuses, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );
    }
}


export default BaseCharityListViewStore;