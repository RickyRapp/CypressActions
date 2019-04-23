import { action, observable, computed } from 'mobx';
import { ContributionService, LookupService, DonorAccountService } from "common/data";
import { BaasicDropdownStore, BaseViewStore } from "core/stores";
import { ModalParams } from 'core/models';
import _ from 'lodash';

class ContributionDetailsViewStore extends BaseViewStore {
    contributionStatusDropdownStore = null;
    @observable contributionStatuses = null;
    @observable contribution = null;
    @observable paymentTypes = null;
    @observable showPayerInformation = false;
    @observable showStockAndMutualFundsContactInfo = false;

    constructor(rootStore) {
        super(rootStore);

        this.id = rootStore.routerStore.routerState.params.id;
        this.contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.contributionStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'contribution-status');
        this.paymentTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-type');

        this.permissions = {
            employeeRead: rootStore.authStore.hasPermission('theDonorsFundAdministrationSection.read')
        }

        this.reviewContributionModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.setFilterDropdownStores();

        let params = {};
        params.embed = ['payerInformation,address,emailAddress,phoneNumber,paymentType,bankAccount,createdByCoreUser,contributionStatus,donorAccount,coreUser'];
        let model = await this.contributionService.get(this.id, params);
        if (model.json && JSON.parse(model.json).paymentTypeInformations) {
            _.forOwn(JSON.parse(model.json).paymentTypeInformations, function (value, key) {
                model[key] = value;
            });
        }
        this.contribution = model;
    }

    @action.bound async onChangeShowPayerInformation(event) {
        this.showPayerInformation = event.target.checked;
    }

    @action.bound async onChangeShowStockAndMutualFundsContactInfo(event) {
        this.showStockAndMutualFundsContactInfo = event.target.checked;
    }

    @computed get achId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'ach' }).id : null;
    }

    @computed get wireTransferId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'wire-transfer' }).id : null;
    }

    @computed get chaseQuickPayId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'chase-quickpay' }).id : null;
    }

    @computed get stockAndMutualFundsId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'stock-and-mutual-funds' }).id : null;
    }

    @computed get checkId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'check' }).id : null;
    }

    @action.bound async setFilterDropdownStores() {
        this.contributionStatusDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: 'Choose Contribution Status',
                textField: 'name',
                dataItemKey: 'id',
                clearable: true
            },
            {
                onChange: (options) => this.queryUtility.filter.contributionStatusIds = (options ? _.map(options, item => { return item.id }) : null)
            },
            _.map(_.orderBy(this.contributionStatuses, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );
    }

    @action.bound async loadLookups() {
        let paymentTypeModels = await this.paymentTypeLookup.getAll();
        this.paymentTypes = _.orderBy(paymentTypeModels.data, ['sortOrder'], ['asc']);

        let contributionStatusModels = await this.contributionStatusLookup.getAll();
        this.contributionStatuses = contributionStatusModels.data;
    }
}

export default ContributionDetailsViewStore;