import { action } from 'mobx';
import { GrantService, DonorAccountService } from "common/data";
import { BaasicDropdownStore } from "core/stores";
import { GrantListFilter } from 'modules/administration/grant/models';
import { ModalParams } from 'core/models';
import { renderGrantPurposeType } from 'modules/common/grant/components';
import { BaseGrantListViewStore } from 'modules/common/grant/stores';
import { getDonorNameDropdown } from 'core/utils';
import moment from 'moment';
import _ from 'lodash';

class GrantListViewStore extends BaseGrantListViewStore {
    constructor(rootStore) {
        const grantService = new GrantService(rootStore.app.baasic.apiClient);

        let filter = new GrantListFilter()
        if (rootStore.routerStore.routerState.queryParams) {
            if (rootStore.routerStore.routerState.queryParams.donorAccountId) {
                filter.donorAccountId = rootStore.routerStore.routerState.queryParams.donorAccountId;
            }
            if (rootStore.routerStore.routerState.queryParams.charityId) {
                filter.charityId = rootStore.routerStore.routerState.queryParams.charityId;
            }
        }

        const listViewStore = {
            name: 'grant',
            routes: {
                create: () =>
                    this.findDonorModalParams.open(),
                charityEdit: (charityId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.charity.edit', { userId: charityId }),
                donorAccountEdit: (userId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: userId }),
                edit: (grantId, userId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.grant.edit', { userId: userId, id: grantId }),
                grantScheduledPaymentEdit: (grantScheduledPaymentName) =>
                    this.rootStore.routerStore.navigate('master.app.administration.grant.scheduled.list', null, { name: grantScheduledPaymentName })
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = 'createdByCoreUser,donorAccount,coreUser,grantPurposeMember,charity,grantScheduledPayment';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await grantService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        }

        const config = {
            listViewStore: listViewStore
        }

        super(rootStore, config);

        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        this.findDonorModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.reviewModalParams = new ModalParams({
            onClose: () => { this.grantId = null; this.onClose }
        });

        this.setColumns = [
            {
                key: 'donorAccount.coreUser',
                title: 'DONORACCOUNT(CLICKONROW)',
                type: 'function',
                function: (item) => { return `${item.donorAccount.coreUser.firstName} ${item.donorAccount.coreUser.lastName}` },
                onClick: (item) => this.routes.donorAccountEdit(item.donorAccount.id)
            },
            {
                key: 'charity.name',
                title: 'CHARITY(CLICKONROW)',
                onClick: (item) => this.routes.charityEdit(item.charity.id)
            },
            {
                key: 'amount',
                title: 'AMOUNT',
                type: 'currency'
            },
            {
                key: 'createdByCoreUser',
                title: 'BY',
                type: 'function',
                function: (item) => { return item.createdByCoreUser ? `${item.createdByCoreUser.firstName} ${item.createdByCoreUser.lastName}` : 'System' },
            },
            {
                key: 'donationStatusId',
                title: 'STATUS',
                type: 'function',
                function: (item) => _.find(this.donationStatusModels, { id: item.donationStatusId }).name
            },
            {
                key: 'grantPurposeTypeId',
                title: 'PURPOSE',
                type: 'function',
                function: (item) => renderGrantPurposeType(item, this.grantPurposeTypeModels)
            },
            {
                key: 'grantScheduledPayment.name',
                title: 'PARTOF(CLICKONROW)',
                onClick: grant => this.routes.grantScheduledPaymentEdit(grant.grantScheduledPayment.name)
            },
            {
                key: 'dateCreated',
                title: 'DATECREATED',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm'
            },
        ];

        this.setActions = {
            onReview: (item) => { this.grantId = item.id; this.reviewModalParams.open(); }
        };

        this.setRenderActions = {
            renderReview: this.renderReview,
            renderEdit: this.renderEdit,
        }

        this.load();
    }

    setStores() {
        super.setStores();
        this.setAdditionalStores();
    }

    @action.bound renderReview(grant) {
        const statusesForReview = _.map(_.filter(this.donationStatusModels, function (o) { return o.abrv === 'pending'; }), function (x) { return x.id });
        return _.some(statusesForReview, (item) => { return item === grant.donationStatusId });
    }

    @action.bound renderEdit(grant) {
        const statusesForEdit = _.map(_.filter(this.donationStatusModels, function (o) { return o.abrv === 'pending'; }), function (x) { return x.id });
        if (_.some(statusesForEdit, (item) => { return item === grant.donationStatusId })) {
            return moment().local().isBefore(moment.utc(grant.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(15, 'minutes'));
        }
        return false;
    }

    @action.bound async onAfterReviewGrant() {
        this.queryUtility._reloadCollection();
        this.reviewModalParams.close();
    }

    @action.bound async setAdditionalStores() {
        this.donorAccountSearchDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Donor',
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = { page: 1, rpp: 15, embed: 'coreUser,donorAccountAddresses,address,companyProfile' };
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    let response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: (option) => this.queryUtility.filter.donorAccountId = (option ? option.id : null)
            }
        );

        if (this.queryUtility.filter.donorAccountId) {
            let params = {};
            params.embed = ['coreUser,donorAccountAddresses,address,companyProfile'];
            const donorAccount = await this.donorAccountService.get(this.queryUtility.filter.donorAccountId, params);
            let defaultSearchDonor = { id: donorAccount.id, name: getDonorNameDropdown(donorAccount) }
            let donorSearchs = [];
            donorSearchs.push(defaultSearchDonor);
            this.donorAccountSearchDropdownStore.items = donorSearchs;
        }
    }

    @action.bound async onChangeSearchDonor(option) {
        if (option) {
            this.rootStore.routerStore.navigate('master.app.administration.grant.create', {
                userId: option.id
            })
        }
    }
}

export default GrantListViewStore;