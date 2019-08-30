import React from 'react';
import { action, observable, computed } from 'mobx';
import { DonationService, DonorAccountService, CharityService } from "common/data";
import { DonationListFilter } from 'modules/main/donation/models';
import { ModalParams } from 'core/models';
import { BaseListViewStore, TableViewStore, BaasicDropdownStore } from 'core/stores';
import { getDonorNameDropdown, getDonorAccountDropdownOptions, getCharityNameDropdown, getCharityDropdownOptions } from 'core/utils';
import _ from 'lodash';
import NumberFormat from 'react-number-format';

class DonationListViewStore extends BaseListViewStore {
    @observable charitySearchDropdownStore = null;
    @observable donorAccountSearchDropdownStore = null;

    constructor(rootStore) {
        const donationService = new DonationService(rootStore.app.baasic.apiClient);

        let filter = new DonationListFilter()

        super(rootStore, {
            name: 'donation',
            routes: {
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = [
                        'grants',
                        'grants.donorAccount',
                        'grants.donorAccount.coreUser',
                        'grants.donorAccount.companyProfile',
                        'donationType',
                        'donationStatus'
                    ];
                    // params.fields = [
                    //     'id',
                    //     'dateCreated',
                    //     'grantStatusId',
                    //     'grantTypeId',
                    //     'confirmationNumber',
                    //     'description',
                    //     'grantStatusId',
                    //     'grantPurposeTypeId',
                    //     'grantPurposeMember',
                    //     'grantPurposeMember.name',
                    //     'grantScheduledPayment',
                    //     'grantScheduledPayment.name',
                    //     'createdByCoreUser',
                    //     'createdByCoreUser.firstName',
                    //     'createdByCoreUser.lastName',
                    //     'donorAccount',
                    //     'donorAccountId',
                    //     'donorAccount.id',
                    //     'donorAccount.donorName',
                    //     'charity',
                    //     'charity.id',
                    //     'charity.name',
                    // ];
                    const response = await donationService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        });

        this.rootStore = rootStore;
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'amount',
                        title: 'AMOUNT',
                        type: 'function',
                        function: (item) => <NumberFormat value={_.sumBy(item.grants, 'amount')} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix='$' />
                    },
                    {
                        key: 'donationStatus.name',
                        title: 'STATUS'
                    },
                    {
                        key: 'donationType.name',
                        title: 'TYPE'
                    },
                    {
                        key: 'dateCreated',
                        title: 'DATECREATED',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm'
                    },
                ],
                actions: {
                },
                actionsRender: {
                }
            })
        );
    }
}

export default DonationListViewStore;