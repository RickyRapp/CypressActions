import { action, observable } from 'mobx';
import { LookupService, CharityService } from "common/data";
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { ModalParams } from 'core/models';
import { getCharityNameDropdown } from 'core/utils';
import _ from 'lodash';

class BaseGrantListViewStore extends BaseListViewStore {
    grantPurposeTypeModels = null;
    donationStatusModels = null;
    @observable charitySearchDropdownStore = null;
    @observable donorAccountSearchDropdownStore = null;
    @observable grantId = null;

    setColumns = null;
    setActions = null;
    setRenderActions = null;
    setSelectedExportColumnsName = null;
    setAdditionalExportColumnsName = null;

    constructor(rootStore, config) {
        super(rootStore, config.listViewStore);

        this.detailsModalParams = new ModalParams({
            notifyOutsideClick: true,
            onClose: () => { this.grantId = null; this.onClose }
        });

        this.defaultActions = {
            onEdit: (item) => this.routes.edit(item.id),
            onDetails: (item) => { this.grantId = item.id; this.detailsModalParams.open(); }
        };

        this.defaultRenderActions = {
            renderEdit: this.renderEdit
        };

        this.charityService = new CharityService(rootStore.app.baasic.apiClient);
        this.donationStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'donation-status');
        this.grantPurposeTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-purpose-type');
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

    @action.bound renderEdit(grant) {
        const statusesForEdit = _.map(_.filter(this.donationStatusModels, function (o) { return o.abrv === 'pending'; }), function (x) { return x.id });
        return _.some(statusesForEdit, (item) => { return item === grant.donationStatusId });
    }

    @action.bound async loadLookups() {
        let donationStatusModels = await this.donationStatusLookup.getAll();
        this.donationStatusModels = donationStatusModels.data;

        let grantPurposeTypeModels = await this.grantPurposeTypeLookup.getAll();
        this.grantPurposeTypeModels = grantPurposeTypeModels.data;
    }

    @action.bound async setStores() {
        this.charitySearchDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Charity',
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = { page: 1, rpp: 15, embed: 'charityAddresses,address' };
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }
                    options.charityAddressPrimary = true;

                    let response = await this.charityService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getCharityNameDropdown(x) } });
                },
                onChange: (option) => this.queryUtility.filter.charityId = (option ? option.id : null)
            }
        );

        if (this.queryUtility.filter.charityId) {
            let params = {};
            params.embed = ['charityAddresses,address'];
            const charity = await this.charityService.get(this.queryUtility.filter.charityId, params);
            let defaultCharity = { id: charity.id, name: getCharityNameDropdown(charity) }
            let charitySearchs = [];
            charitySearchs.push(defaultCharity);
            this.charitySearchDropdownStore.items = charitySearchs;
        }
    }
}

export default BaseGrantListViewStore;