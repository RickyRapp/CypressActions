import { action, observable } from 'mobx';
import { LookupService, CharityService, GrantScheduledPaymentService } from "common/data";
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { getDonorNameDropdown, getCharityNameDropdown } from 'core/utils';
import _ from 'lodash';

class BaseGrantScheduledPaymentListViewStore extends BaseListViewStore {
    grantPurposeTypeModels = null;
    grantScheduleTypeModels = null;
    @observable charitySearchDropdownStore = null;
    @observable donorAccountSearchDropdownStore = null;
    @observable grantId = null;

    setColumns = null;
    setActions = null;
    setRenderActions = null;
    setSelectedExportColumnsName = null;
    setAdditionalExportColumnsName = null;

    constructor(rootStore, config) {
        super(rootStore, config.listViewStore)

        this.defaultActions = {
            onCancel: (item) => this.onCancel(item.id, item.name)
        };

        this.charityService = new CharityService(rootStore.app.baasic.apiClient);
        this.grantScheduleTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-schedule-type');
        this.grantPurposeTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-purpose-type');
        this.grantScheduledPaymentService = new GrantScheduledPaymentService(rootStore.app.baasic.apiClient);

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        this.setFilterDropdownStores();

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: this.setColumns,
                actions: _.merge(this.defaultActions, this.setActions),
                actionsRender: this.setRenderActions
            })
        );
    }

    @action.bound async loadLookups() {
        const grantScheduleTypeModels = await this.grantScheduleTypeLookup.getAll();
        this.grantScheduleTypeModels = grantScheduleTypeModels.data;

        const grantPurposeTypeModels = await this.grantPurposeTypeLookup.getAll();
        this.grantPurposeTypeModels = grantPurposeTypeModels.data;
    }

    @action.bound async setFilterDropdownStores() {
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

    @action.bound async onCancel(id, name) {
        this.rootStore.modalStore.showConfirm(
            'AREYOUSUREYOUWANTTOCANCEL',
            async () => {
                this.loaderStore.suspend();
                let response = null;
                try {
                    response = await this.grantScheduledPaymentService.cancel(id);
                    await this.queryUtility._reloadCollection();
                } catch (error) {
                    response = error;
                }
                this.rootStore.notificationStore.showMessageFromResponse(response);
                this.loaderStore.resume();
            }
        );
    }
}

export default BaseGrantScheduledPaymentListViewStore;