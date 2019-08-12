import { action, observable } from 'mobx';
import { GrantService, CharityService } from "common/data";
import { GrantListFilter } from 'modules/main/grant/models';
import { ModalParams } from 'core/models';
import { BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { getCharityDropdownOptions, getCharityNameDropdown } from 'core/utils';
import { renderGrantPurposeType } from 'modules/common/grant/components';
import moment from 'moment';
import _ from 'lodash';

class GrantList extends BaseListViewStore {
    @observable charitySearchDropdownStore = null;
    initCharitySearch = true;

    constructor(rootStore) {
        const grantService = new GrantService(rootStore.app.baasic.apiClient);

        let filter = new GrantListFilter()
        const userId = rootStore.authStore.user.id;
        filter.donorAccountId = userId;
        filter.orderBy = 'dateCreated';
        filter.orderDirection = 'desc';

        if (rootStore.routerStore.routerState.queryParams) {
            if (rootStore.routerStore.routerState.queryParams.charityId) {
                filter.charityId = rootStore.routerStore.routerState.queryParams.charityId;
            }
        }

        super(rootStore, {
            name: 'grant',
            routes: {
                create: () =>
                    this.rootStore.routerStore.navigate('master.app.main.grant.create'),
                edit: (grantId, donorAccountId) =>
                    this.rootStore.routerStore.navigate('master.app.main.grant.edit', { id: grantId, userId: donorAccountId }),
                grantScheduledPaymentEdit: (grantScheduledPaymentName) =>
                    this.rootStore.routerStore.navigate('master.app.main.grant.scheduled.list', null, { name: grantScheduledPaymentName }),
            },
            actions: {
                find: async params => {
                    params.embed = [
                        'donorAccount',
                        'donorAccount.companyProfile',
                        'donorAccount.coreUser',
                        'createdByCoreUser',
                        'grantScheduledPayment',
                        'donation',
                        'donation.donationStatus',
                        'grantPurposeType',
                        'donation.charity'
                    ];
                    return await grantService.find(params);
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true
            },
            tableConfig: {
                columns: [
                    {
                        key: 'donation.charity.name',
                        title: 'CHARITY',
                        onClick: (item) => this.routes.charityEdit(item.grant.charity.id)
                    },
                    {
                        key: 'amount',
                        title: 'AMOUNT',
                        type: 'currency',
                        onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
                    },
                    {
                        key: 'donation.donationStatus.name',
                        title: 'STATUS'
                    },
                    {
                        key: 'grantPurposeType.name',
                        title: 'PURPOSE',
                        type: 'function',
                        function: (item) => renderGrantPurposeType(item)
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
                        format: 'YYYY-MM-DD HH:mm',
                        onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
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
                    renderEdit: (item) => item.donation.donationStatus.abrv === 'pending' && moment().local().isBefore(moment.utc(item.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(15, 'minutes'))
                }
            }
        });

        this.charityService = new CharityService(rootStore.app.baasic.apiClient);

        this.detailsModalParams = new ModalParams({
            notifyOutsideClick: true,
            onClose: this.onClose
        });

        this.setStores();

    }

    @action.bound async setStores() {
        this.charitySearchDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Charity',
                // initFetch: true
            },
            {
                fetchFunc: async (term) => {
                    let options = getCharityDropdownOptions;
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }
                    if (this.initCharitySearch) {
                        this.initCharitySearch = false;
                        if (this.queryUtility.filter.charityId) {
                            options.id = this.queryUtility.filter.charityId
                        }
                    }

                    if (!(options.searchQuery || options.id)) {
                        return [];
                    }

                    let response = await this.charityService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getCharityNameDropdown(x) } });
                },
                onChange: (option) => this.queryUtility.filter.charityId = (option ? option.id : null)
            }
        );

        // if (this.queryUtility.filter.charityId) {
        //     let params = getCharityDropdownOptions;
        //     const charity = await this.charityService.get(this.queryUtility.filter.charityId, params);
        //     let defaultCharity = { id: charity.id, name: getCharityNameDropdown(charity) }
        //     let charitySearchs = [];
        //     charitySearchs.push(defaultCharity);
        //     this.charitySearchDropdownStore.items = charitySearchs;
        // }
    }
}

export default GrantList;