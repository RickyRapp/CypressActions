import { action, observable, computed } from 'mobx';
import { GrantService, GrantDonorAccountService, CharityService, LookupService } from "common/data";
import { GrantListFilter } from 'modules/main/grant-donor-account/models';
import { ModalParams } from 'core/models';
import { BaseListViewStore, TableViewStore, BaasicDropdownStore } from 'core/stores';
import { renderGrantPurposeType } from 'modules/common/grant/components';
import moment from 'moment';
import _ from 'lodash';

class GrantDonorAccountList extends BaseListViewStore {
    @observable grantPurposeTypeModels = null;
    @observable grantStatusModels = null;
    @observable charitySearchDropdownStore = null;
    @observable donorAccountSearchDropdownStore = null;

    constructor(rootStore) {
        const grantDonorAccountService = new GrantDonorAccountService(rootStore.app.baasic.apiClient);

        let filter = new GrantListFilter()
        const userId = rootStore.authStore.user.id;
        filter.donorAccountId = userId;

        if (rootStore.routerStore.routerState.queryParams) {
            if (rootStore.routerStore.routerState.queryParams.charityId) {
                filter.charityId = rootStore.routerStore.routerState.queryParams.charityId;
            }
        }

        super(rootStore, {
            name: 'grant',
            routes: {
                create: () =>
                    this.rootStore.routerStore.navigate('master.app.main.grant-donor-account.create'),
                edit: (grantId, donorAccountId) =>
                    this.rootStore.routerStore.navigate('master.app.main.grant-donor-account.edit', { id: grantId, userId: donorAccountId }),
                grantScheduledPaymentEdit: (grantScheduledPaymentName) =>
                    this.rootStore.routerStore.navigate('master.app.main.grant.scheduled.list', null, { name: grantScheduledPaymentName }),
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = [
                        'donorAccount',
                        'donorAccount.companyProfile',
                        'donorAccount.coreUser',
                        'createdByCoreUser',
                        'grantScheduledPayment',
                        'grant',
                        'grant.charity'
                    ];
                    params.orderBy = params.orderBy || 'dateCreated';
                    params.orderDirection = params.orderDirection || 'desc';
                    const response = await grantDonorAccountService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true
            }
        });

        this.charityService = new CharityService(rootStore.app.baasic.apiClient);
        this.grantStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-status');
        this.grantPurposeTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-purpose-type');
        this.grantTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-type');

        this.detailsModalParams = new ModalParams({
            notifyOutsideClick: true,
            onClose: this.onClose
        });

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        this.setStores();

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'grant.charity.name',
                    title: 'CHARITY',
                    onClick: (item) => this.routes.charityEdit(item.grant.charity.id)
                },
                {
                    key: 'amount',
                    title: 'AMOUNT',
                    type: 'currency'
                },
                {
                    key: 'grant.grantStatusId',
                    title: 'STATUS',
                    type: 'function',
                    function: (item) => _.find(this.grantStatusModels, { id: item.grant.grantStatusId }).name
                },
                {
                    key: 'grant.grantPurposeTypeId',
                    title: 'PURPOSE',
                    type: 'function',
                    function: (item) => renderGrantPurposeType(item.grant, this.grantPurposeTypeModels)
                },
                {
                    key: 'grantScheduledPayment.name',
                    title: 'PARTOF',
                    onClick: (item) => this.routes.grantScheduledPaymentEdit(item.grantScheduledPayment.name)
                },
                {
                    key: 'dateCreated',
                    title: 'DATECREATED',
                    type: 'date',
                    format: 'YYYY-MM-DD HH:mm'
                },
                {
                    key: 'createdByCoreUser',
                    title: 'BY',
                    type: 'function',
                    function: (item) => item.createdByCoreUser ?
                        (item.createdByCoreUser.userId === item.donorAccount.id ? item.donorAccount.donorName : `${item.createdByCoreUser.firstName} ${item.createdByCoreUser.lastName}`)
                        :
                        'System'
                }
            ],
            actions: {
                onEdit: (item) => this.routes.edit(item.id, item.donorAccountId),
                onDetails: (item) => this.detailsModalParams.open(item.id)
            },
            actionsRender: {
                renderEdit: this.renderEdit,
            }
        })
        );
    }

    @action.bound async loadLookups() {
        let grantStatusModels = await this.grantStatusLookup.getAll();
        this.grantStatusModels = grantStatusModels.data;

        let grantPurposeTypeModels = await this.grantPurposeTypeLookup.getAll();
        this.grantPurposeTypeModels = grantPurposeTypeModels.data;

        let grantTypeModels = await this.grantTypeLookup.getAll();
        this.grantTypeModels = grantTypeModels.data;
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
                    let options = getCharityDropdownOptions;
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    let response = await this.charityService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getCharityNameDropdown(x) } });
                },
                onChange: (option) => this.queryUtility.filter.charityId = (option ? option.id : null)
            }
        );

        if (this.queryUtility.filter.charityId) {
            let params = getCharityDropdownOptions;
            const charity = await this.charityService.get(this.queryUtility.filter.charityId, params);
            let defaultCharity = { id: charity.id, name: getCharityNameDropdown(charity) }
            let charitySearchs = [];
            charitySearchs.push(defaultCharity);
            this.charitySearchDropdownStore.items = charitySearchs;
        }
    }


    @action.bound renderEdit(grant) {
        const statusesForEdit = _.map(_.filter(this.grantStatusModels, function (o) { return o.abrv === 'pending'; }), function (x) { return x.id });
        if (_.some(statusesForEdit, (item) => { return item === grant.grantStatusId })) {
            return moment().local().isBefore(moment.utc(grant.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(15, 'minutes'));
        }
        return false;
    }

    @computed get regularGrantTypeId() {
        return this.grantTypeModels ? _.find(this.grantTypeModels, { abrv: 'regular' }).id : null;
    }
}

export default GrantDonorAccountList;