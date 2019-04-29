import { action, observable } from 'mobx';
import { CharityCreateForm } from 'modules/administration/charity/forms';
import { CharityService, LookupService, DonorAccountService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { getDonorNameDropdown } from 'core/utils';
import _ from 'lodash';

class CharityCreateViewStore extends BaseEditViewStore {
    @observable charityTypeDropdownStore = null;
    @observable charityStatusDropdownStore = null;
    @observable suggestedByIdDropdownStore = null;

    constructor(rootStore) {
        const charityService = new CharityService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'charity',
            actions: {
                create: async charity => {
                    if (!charity.hasContact) {
                        charity.contactInformation = null;
                    }
                    if (!charity.hasLogin) {
                        charity.coreUser = null;
                    }
                    if (!charity.bankAccount) {
                        charity.bankAccount = null;
                    }
                    if (!charity.emailAddress.email) {
                        charity.emailAddress = null;
                    }
                    charity.taxId = charity.taxId.substr(0, 2) + '-' + charity.taxId.substr(2);
                    return await charityService.create(charity);
                }
            },
            FormClass: CharityCreateForm
        });

        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.setStores();
    }

    @action.bound async loadLookups() {
        this.charityTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'charity-type');
        let charityTypeModels = await this.charityTypeLookupService.getAll();
        this.charityType = _.orderBy(charityTypeModels.data, ['sortOrder'], ['asc']);

        this.charityStatusLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'charity-Status');
        let charityStatusModels = await this.charityStatusLookupService.getAll();
        this.charityStatus = _.orderBy(charityStatusModels.data, ['sortOrder'], ['asc']);
    }

    @action.bound async setStores() {
        this.charityTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Charity Type',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: (option) => this.form.$('charityTypeId').set('value', option ? option.id : null)
            },
            _.map(this.charityType, e => { return { 'id': e.id, 'name': e.name } })
        );

        this.charityStatusDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Set Charity Status',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: (option) => this.form.$('charityStatusId').set('value', option ? option.id : null)
            },
            _.map(this.charityStatus, e => { return { 'id': e.id, 'name': e.name } })
        );

        this.suggestedByIdDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = { page: 1, rpp: 15, embed: 'coreUser,donorAccountAddresses,address' };
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    const response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: (option) => this.form.$('suggestedById').set('value', option ? option.id : null)
            }
        );
    }
}

export default CharityCreateViewStore;