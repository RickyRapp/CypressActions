import { action, observable } from 'mobx';
import { LookupService } from "common/data";
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { ModalParams } from 'core/models';
import _ from 'lodash';

class BaseContributionListViewStore extends BaseListViewStore {
    @observable paymentTypeDropdownStore = null;
    @observable contributionStatusDropdownStore = null;
    @observable contributionStatuses = null;
    @observable paymentTypes = null;
    @observable contributionId = null;

    setColumns = null;
    setActions = null;
    setRenderActions = null;
    setSelectedExportColumnsName = null;
    setAdditionalExportColumnsName = null;

    constructor(rootStore, config) {
        super(rootStore, config.listViewStore);

        this.contributionStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'contribution-status');
        this.paymentTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-type');

        this.selectedExportColumnsName = _.union(['Amount', 'Payment Type'], config.setSelectedExportColumnsName);
        this.additionalExportColumnsName = _.union(['Payer Name', 'Status', 'Created By', 'Date Created'], config.setAdditionalExportColumnsName);

        this.detailsModalParams = new ModalParams({
            onClose: () => { this.contributionId = null; this.onClose },
            notifyOutsideClick: true
        });

        this.defaultActions = {
            onDetails: contribution => { this.contributionId = contribution.id; this.detailsModalParams.open(); }
        };

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        this.setStores();

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: this.columns,
                actions: _.merge(this.defaultActions, this.setActions),
                actionsRender: _.merge(this.defaultRenderActions, this.setRenderActions)
            })
        );
    }

    @action.bound async loadLookups() {
        let paymentTypeModels = await this.paymentTypeLookup.getAll();
        this.paymentTypes = paymentTypeModels.data;

        let contributionStatusModels = await this.contributionStatusLookup.getAll();
        this.contributionStatuses = contributionStatusModels.data;
    }

    @action.bound async setStores() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: 'Choose Payment Type',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: (options) => this.queryUtility.filter.paymentTypeIds = (options ? _.map(options, item => { return item.id }) : null)
            },
            _.map(_.orderBy(this.paymentTypes, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );

        this.contributionStatusDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: 'Choose Contribution Status',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: (options) => this.queryUtility.filter.contributionStatusIds = (options ? _.map(options, item => { return item.id }) : null)
            },
            _.map(_.orderBy(this.contributionStatuses, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );
    }
}


export default BaseContributionListViewStore;