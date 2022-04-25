import React from 'react';
import { BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { ReconcileListFilter } from 'application/administration/reconcile/models';
import { SelectTableWithLoadOnDemand } from 'application/administration/donation/stores';
import SelectTableWithLoadOnDemandCharityReconcile from './SelectTableWithLoadOnDemandCharityReconcile';
import { action } from 'mobx';


class PaymentsViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'charity-payments',
            authorization: 'theDonorsFundDonationSection',
            routes: {},
            queryConfig: {
                filter: new ReconcileListFilter('dateCreated', 'desc')
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.charityId = this.charityId;
                        params.embed = [
                            'charity',
                            'paymentTransaction',
                            'paymentType'
                        ];
                        return await rootStore.application.administration.reconcileStore.findReconcile(params);
                    }
                }
            }
        });

        this.charityId = rootStore.userStore.applicationUser.id;

        this.createTableStore(this.getGrantsByCwtId);
        this.createPaymentTypeDropodownStore();
    }

    createTableStore(loadMethod) {
        this.setTableStore(new SelectTableWithLoadOnDemandCharityReconcile(this.queryUtility, {
            columns: [
                {
                    key: 'paymentNumber',
                    title: 'RECONCILE.LIST.COLUMNS.PAYMENT_NUMBER_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            if (item.paymentType.abrv === 'ach' && item.achBatchNumber) {
                                return `${item.achBatchNumber} - ${item.paymentNumber}`;
                            }
                            return item.paymentNumber;
                        }
                    }
                },
                {
                    key: 'paymentType.name',
                    title: 'RECONCILE.LIST.COLUMNS.PAYMENT_TYPE_LABEL'
                },
                {
                    key: 'paymentTransaction.amount',
                    title: 'RECONCILE.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'charity.name',
                    title: 'RECONCILE.LIST.COLUMNS.CHARITY_NAME_LABEL',
                    format:  {
                        type: 'function',
                        value: (item) => {
                            return <div>
                                {item.charity.name} 
                                <small style={{ display: "block" }}>
                                    {item.charity.charityAddress.addressLine1}, 
                                    {item.charity.charityAddress.addressLine2}, 
                                    {item.charity.charityAddress.city}, 
                                    {item.charity.charityAddress.state}, 
                                    {item.charity.charityAddress.zipCode}
                                    </small>
                            </div>
                        }
                    },
                },
                {
                    key: 'isCashed',
                    title: 'RECONCILE.LIST.COLUMNS.STATUS_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return item.isCashed ? 'Payment Received' : 'Payment Submited'
                        }
                    }
                },
                {
                    key: 'dateCashed',
                    title: 'RECONCILE.LIST.COLUMNS.DATE_UPDATED',
                    format: {
                        type: 'date',
                        value: 'full'
                    }
                },
                {
                    key: 'description',
                    title: 'RECONCILE.LIST.COLUMNS.DESCRIPTION_LABEL'
                },
                {
                    key: 'dateCreated',
                    title: 'RECONCILE.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'full'
                    }
                }
            ],
            actions: {},
            disablePaging: false,
        }, false, loadMethod));
    }
    createPaymentTypeDropodownStore() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: () => {
                    return this.rootStore.application.lookup.paymentTypeStore.find();
                },
                onChange: (paymentType) => {
                    this.queryUtility.filter.paymentTypeIds = paymentType.map(type => { return type.id });
                }
            });

        }

    @action.bound
    async getGrantsByCwtId(id) {
        var data = await this.rootStore.application.administration.reconcileStore.getGrantsByReconcileId(id);
        return data;
    }

}

export default PaymentsViewStore;
