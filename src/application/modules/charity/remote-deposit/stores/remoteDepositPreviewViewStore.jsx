import { BasePreviewViewStore, TableViewStore } from 'core/stores';
import { remoteDepositService } from "application/charity/remote-deposit/services";
import { applicationContext } from 'core/utils';
import _ from 'lodash';
import React from 'react';

@applicationContext
class remoteDepositPreviewViewStore extends BasePreviewViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'remote-deposit',
            autoInit: true,
            id: rootStore.routerStore.routerState.params.id,
            routes: {},
            actions: () => {
                return {
                    get: async (id) => {
                        let params = {
                            embed: [
                                'charity',
                                'grants',
                                'grants.donor',
                                'grants.certificate',
                                'grants.charityVirtualTransaction',
                                'grants.charityVirtualTransaction.paymentTransaction',
                                'grant.donationStatus',
                                'grants.certificate.certificateStatus',
                                'grants.certificate.denominationType',
                                'grants.certificate.booklet'
                            ]
                        }
                        const service = new remoteDepositService(rootStore.application.baasic.apiClient);
                        const response = await service.get(id, params);
                        this.session = response.data;
                        this.tableStore.setData(_.orderBy(this.session.grants, g => g.certificate.denominationType.value, "asc"));
                        if (!this.tableStore.dataInitialized) {
                            this.tableStore.dataInitialized = true;
                        }
                        return response.data;
                    }
                }
            }
        });

        this.createTableStore();
    }

    createTableStore() {
        this.tableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'code',
                    title: 'SESSION.EDIT.LIST.COLUMNS.CODE_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => { return `${item.certificate.booklet.code}-${item.certificate.code}`; }
                    }
                },
                {
                    key: 'donor.donorName',
                    title: 'SESSION.EDIT.LIST.COLUMNS.DONOR_LABEL',
                },
                {
                    key: 'certificate.barcode',
                    title: 'SESSION.EDIT.LIST.COLUMNS.BARCODE_LABEL',
                },
                {
                    key: 'amount',
                    title: 'SESSION.EDIT.LIST.COLUMNS.VALUE_LABEL',
                    format: {
                        type: 'currency'
                    }
                },
                {
                    key: 'charityVirtualTransaction.paymentTransaction.amount',
                    title: 'SESSION.EDIT.LIST.COLUMNS.AMOUNT_AFTER_FEE_LABEL',
                    format: {
                        type: 'currency'
                    }
                },
                {
                    key: 'certificate.coreMediaVaultEntryId',
                    title: 'Media',
                    format: {
                        type: 'function',
                        value: (item) => {
                            console.log(item);
                            try{
                                this.baseUrl = ApplicationSettings.useSSL ? 'https://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" : 'http://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" ;

                                const url = this.baseUrl + "charity-file-streams/"+ item.certificate.coreMediaVaultEntryId;
                                
                                return item.certificate.coreMediaVaultEntryId == '00000000-0000-0000-0000-000000000000' ? null : <b><a href={url} target="_blank">&#x21E9; Blank Certificate</a></b>
                                
                            }catch(e) {
                                console.log('ex')
                            }
                            return ' ';
                        }
                    }
                }
            ],
            actions: {},
            actionsRender: {}
        });
    }
}

export default remoteDepositPreviewViewStore;
