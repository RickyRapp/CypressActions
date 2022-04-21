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
                        data.grants = data.grants.filter(c => (c.donationStatus.abrv != 'donor-review-first' && c.donationStatus.abrv != 'donor-review-second' && c.donationStatus.abrv != 'pending') && (c.certificate.isBlankApprovedByAdmin != false && (c.certificate.openCertificateAmount && c.certificate.isBlankApprovedByAdmin) || !c.certificate.openCertificateAmount || (c.certificate.openCertificateAmount && (c.certificate.needsAdminReview == null || c.certificate.needsAdminReview == false))))
                        
                        const discarded = await rootStore.application.administration.sessionStore.getSession(id, params);
                        discarded.grants = discarded.grants.filter(c => (c.certificate.openCertificateAmount && c.certificate.isBlankApprovedByAdmin == false) || c.donationStatus.abrv == 'donor-review-declined')
                        
                        const pending = await rootStore.application.administration.sessionStore.getSession(id, params);
                        pending.grants = pending.grants.filter(c => !(c.certificate.openCertificateAmount && c.certificate.isBlankApprovedByAdmin == null && c.certificate.needsAdminReview) && c.donationStatus.abrv == 'pending')
                        
                        const donorReview = await rootStore.application.administration.sessionStore.getSession(id, params);
                        donorReview.grants = donorReview.grants.filter(c => (c.donationStatus.abrv == 'donor-review-first' || c.donationStatus.abrv == 'donor-review-second'))

                        const onHoldEmbed = [
                            'charity',
                            'certificate',
                            'certificate.denominationType',
                            'certificate.booklet',
                            'certificate.booklet.bookletOrder',
                            'certificate.booklet.bookletOrder.donor',
                            'session'
                        ];

                        const statuses = await rootStore.application.lookup.sessionPendingCertificateStatusStore.find();
                        const sessionPendingCertificateStatusIds = statuses.find(c => c.abrv === 'pending').id;
                        const confirmationNumber = data.confirmationNumber;

                        const onHold = await rootStore.application.administration.sessionStore.findSessionPendingCertificate({embed: onHoldEmbed, sessionPendingCertificateStatusIds: sessionPendingCertificateStatusIds, confirmationNumber: confirmationNumber});
                        console.log(onHold);
                        
                        const adminReview = await rootStore.application.administration.sessionStore.getSession(id, params);
                        adminReview.grants = adminReview.grants.filter(c => (c.certificate.openCertificateAmount && c.certificate.isBlankApprovedByAdmin == null && c.certificate.needsAdminReview))
                        
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
                        this.donorReviewTableStore.setData(_.orderBy(donorReview.grants, g => g.certificate.denominationType.value, "asc"));
                        if (!this.donorReviewTableStore.dataInitialized) {
                            this.donorReviewTableStore.dataInitialized = true;
                        }
                        this.adminReviewTableStore.setData(_.orderBy(adminReview.grants, g => g.certificate.denominationType.value, "asc"));
                        if (!this.adminReviewTableStore.dataInitialized) {
                            this.adminReviewTableStore.dataInitialized = true;
                        }
                        this.checksOnHoldTableStore.setData(onHold.item);
                        if (!this.checksOnHoldTableStore.dataInitialized) {
                            this.checksOnHoldTableStore.dataInitialized = true;
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
        this.createDonorReviewTableStore();
        this.createChecksOnHoldTableStore();
        this.createAdminReviewTableStore();
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
    async createDonorReviewTableStore() {
        this.donorReviewTableStore = new TableViewStore(null, {
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
    async createChecksOnHoldTableStore() {
        this.checksOnHoldTableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'charity.name',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.CHARITY_NAME_LABEL',
                },
                {
                    key: 'session.confirmationNumber',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.CONFIRMATION_LABEL',
                },
                {
                    key: 'certificate.booklet.bookletOrder.donor.donorName',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.DONOR_LABEL',
                },
                {
                    key: 'certificate.booklet.bookletOrder.donor.donorName',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.CHECK_NUMBER_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return (item && item.certificate.booklet && item.certificate.booklet.code) + '-' + (item && item.certificate && item.certificate.code);
                        }
                    }
                },
                {
                    key: 'certificate.denominationType',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.DENOMINATION_LABEL',
                    format: {
                        type: 'denomination',
                        value: 'short'
                    }
                },
                {
                    key: 'blankCertificateValue',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency'
                    }
                },
                {
                    key: 'dateCreated',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {},
            actionsRender: {}
        });
    }
    async createAdminReviewTableStore() {
        this.adminReviewTableStore = new TableViewStore(null, {
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
