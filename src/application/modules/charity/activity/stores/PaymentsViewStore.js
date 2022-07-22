import React from 'react';
import { BaseListViewStore, BaasicDropdownStore, SelectTableWithRowDetailsViewStore } from 'core/stores';
import { ReconcileListFilter } from 'application/administration/reconcile/models';
import ReconcileSelectTableWithLoadOnDemand from 'application/administration/donation/stores/ReconcileSelectTableWithLoadOnDemand';
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
                            'paymentType',
                            'grants'
                        ];
                        return await rootStore.application.administration.reconcileStore.findReconcile(params);
                    }
                }
            }
        });

        this.charityId = rootStore.userStore.applicationUser.id;

        this.createTableStore(this.getReconcileDetailsByCharityId);
        this.createPaymentTypeDropodownStore();
    }

    @action.bound
    async getReconcileDetailsByCharityId(id){
        this.data = await this.rootStore.application.administration.reconcileStore.getReconcileDetailsByCwtId(id);
        return this.data;
    }

    createTableStore(loadMethod) {
        this.setTableStore(new ReconcileSelectTableWithLoadOnDemand(this.queryUtility, {
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
                            if(item.id == '7cccc43a-f85f-4a7b-b422-ae8a0178f358' || item.id =='f7c79590-604d-4319-bdda-ae8a017a512c') {
                                return <div>
                                    {item.charity.name} (*)
                                </div>
                            } else if(item.address){
                                return <div>
                                    {item.charity.name} 
                                    <small style={{ display: "block" }}>
                                        {item.address}
                                        </small>
                                        {item.paymentType.abrv === 'ach' && (
                                            <small style={{ display: "block" }}>
                                            {item.bankAccount}
                                            </small>
                                        )}
                                </div>
                            } else {
                                return <div>
                                    {item.charity.name} 
                                </div>
                            }
                            
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
                    key: 'isWithdraw',
                    title: 'RECONCILE.LIST.COLUMNS.IS_WITHDRAW',
                    format : {
                        type: 'function',
                        value: (item) => {
                            return item.isWithdraw ? <div className="type--center" ><i class="u-icon u-icon--approve u-icon--base "></i></div> : null;

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
}

export default PaymentsViewStore;
