import service from 'core/services/validatorService';
import { BaasicUploadStore, BasePreviewViewStore, TableViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { SessionService } from 'application/administration/session/services';
import _ from 'lodash';
import React from 'react';

@applicationContext
class SessionPreviewViewStore extends BasePreviewViewStore {
    constructor(rootStore) {
        const sessionService = new SessionService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'session',
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
                                'grants.donationStatus',
                                'grants.certificate.certificateStatus',
                                'grants.certificate.denominationType',
                                'grants.certificate.booklet'
                            ]
                        }
                        const data = await rootStore.application.administration.sessionStore.getSession(id, params);
                        data.grants = data.grants.filter(c => c.donationStatus.abrv != 'pending' && c.certificate.isBlankApprovedByAdmin != false && ((c.certificate.openCertificateAmount && c.certificate.isBlankApprovedByAdmin) || !c.certificate.openCertificateAmount || (c.certificate.openCertificateAmount && (c.certificate.needsAdminReview == null || c.certificate.needsAdminReview == false))))
                        const discarded = await rootStore.application.administration.sessionStore.getSession(id, params);
                        discarded.grants = discarded.grants.filter(c => (c.certificate.openCertificateAmount && c.certificate.isBlankApprovedByAdmin == false))
                        const pending = await rootStore.application.administration.sessionStore.getSession(id, params);
                        pending.grants = pending.grants.filter(c => c.donationStatus.abrv == 'pending' || (c.certificate.openCertificateAmount && c.certificate.isBlankApprovedByAdmin == null && c.certificate.needsAdminReview))
                        this.session = data;
                        
                        this.tableStore.setData(_.orderBy(data.grants, g => g.certificate.denominationType.value, "asc"));
                        if (!this.tableStore.dataInitialized) {
                            this.tableStore.dataInitialized = true;
                        }
                        this.discardedTableStore.setData(_.orderBy(discarded.grants, g => g.certificate.denominationType.value, "asc"));
                        if (!this.discardedTableStore.dataInitialized) {
                            this.discardedTableStore.dataInitialized = true;
                        }
                        this.pendingTableStore.setData(_.orderBy(pending.grants, g => g.certificate.denominationType.value, "asc"));
                        if (!this.pendingTableStore.dataInitialized) {
                            this.pendingTableStore.dataInitialized = true;
                        }
                        return data;
                    }
                }
            }
        });
        this.sessionService = sessionService;
        this.createImageUploadStore();
        this.createTableStore();
        this.createDiscardedTableStore();
        this.createPendingTableStore();
    }

    async createTableStore() {
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
                            try{
                                // this.sessionService.getBlank(item.certificate.coreMediaVaultEntryId)
                                // .then((res) => console.log(res))
                                // .then((r) => {
                                //     console.log(r); 
                                //     return <React.Fragment>
                                // {item.coreMediaVaultEntryId && 
                                //     <div className="imageheight_sml">
                                //         <img alt="" src="http://api.thedonorsfund.local/thedonorsfund/charity-file-streams"  />
                                //     </div>}
                                // </React.Fragment>});
                                // <React.Fragment>
                                //     {item.coreMediaVaultEntryId && 
                                //         <div className="imageheight_sml">
                                //             <img alt="" src={URL.createObjectURL(res.data)}  />
                                //         </div>}
                                //     </React.Fragment>);
                                //TODO: dynamic routing
                                this.baseUrl = ApplicationSettings.useSSL ? 'https://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" : 'http://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" ;

                                const url = this.baseUrl + "charity-file-streams/"+ item.certificate.coreMediaVaultEntryId;
                                return item.certificate.coreMediaVaultEntryId == '00000000-0000-0000-0000-000000000000' ? null : <b><a href={url} target="_blank">&#x21E9; Blank Certificate</a></b>
                                
                            }catch(e) {
                                console.log(e)
                            }
                            return '-';
                        }
                    }
                }
            ],
            actions: {},
            actionsRender: {}
        });
    }
    async createPendingTableStore() {
        this.pendingTableStore = new TableViewStore(null, {
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
                            try{
                                // this.sessionService.getBlank(item.certificate.coreMediaVaultEntryId)
                                // .then((res) => console.log(res))
                                // .then((r) => {
                                //     console.log(r); 
                                //     return <React.Fragment>
                                // {item.coreMediaVaultEntryId && 
                                //     <div className="imageheight_sml">
                                //         <img alt="" src="http://api.thedonorsfund.local/thedonorsfund/charity-file-streams"  />
                                //     </div>}
                                // </React.Fragment>});
                                // <React.Fragment>
                                //     {item.coreMediaVaultEntryId && 
                                //         <div className="imageheight_sml">
                                //             <img alt="" src={URL.createObjectURL(res.data)}  />
                                //         </div>}
                                //     </React.Fragment>);
                                //TODO: dynamic routing
                                this.baseUrl = ApplicationSettings.useSSL ? 'https://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" : 'http://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" ;

                                const url = this.baseUrl + "charity-file-streams/"+ item.certificate.coreMediaVaultEntryId;
                                return item.certificate.coreMediaVaultEntryId == '00000000-0000-0000-0000-000000000000' ? null : <b><a href={url} target="_blank">&#x21E9; Blank Certificate</a></b>
                                
                            }catch(e) {
                                console.log(e)
                            }
                            return '-';
                        }
                    }
                }
            ],
            actions: {},
            actionsRender: {}
        });
    }
    async createDiscardedTableStore() {
        this.discardedTableStore = new TableViewStore(null, {
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
                            try{
                                // this.sessionService.getBlank(item.certificate.coreMediaVaultEntryId)
                                // .then((res) => console.log(res))
                                // .then((r) => {
                                //     console.log(r); 
                                //     return <React.Fragment>
                                // {item.coreMediaVaultEntryId && 
                                //     <div className="imageheight_sml">
                                //         <img alt="" src="http://api.thedonorsfund.local/thedonorsfund/charity-file-streams"  />
                                //     </div>}
                                // </React.Fragment>});
                                // <React.Fragment>
                                //     {item.coreMediaVaultEntryId && 
                                //         <div className="imageheight_sml">
                                //             <img alt="" src={URL.createObjectURL(res.data)}  />
                                //         </div>}
                                //     </React.Fragment>);
                                //TODO: dynamic routing
                                this.baseUrl = ApplicationSettings.useSSL ? 'https://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" : 'http://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" ;

                                const url = this.baseUrl + "charity-file-streams/"+ item.certificate.coreMediaVaultEntryId;
                                return item.certificate.coreMediaVaultEntryId == '00000000-0000-0000-0000-000000000000' ? null : <b><a href={url} target="_blank">&#x21E9; Blank Certificate</a></b>
                                
                            }catch(e) {
                                console.log(e)
                            }
                            return '-';
                        }
                    }
                }
            ],
            actions: {},
            actionsRender: {}
        });
    }
    createImageUploadStore() {
        this.imageUploadStore = new BaasicUploadStore(null, {
            onDelete: () => { // eslint-disable-line
                //async call to delete if needed
                this.form.$('coreMediaVaultEntryId').clear();
            }
        });

    }
}

export default SessionPreviewViewStore;
