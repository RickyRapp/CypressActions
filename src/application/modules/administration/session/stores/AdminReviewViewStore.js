import { TableViewStore, BaseListViewStore } from 'core/stores';
import { FilterParams, ModalParams } from 'core/models';
import { action } from 'mobx';

class AdminReviewViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'session-pending-certificates',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {},
            queryConfig: {
                filter: new FilterParams()
            },
            actions: () => {
                return {
                    find: async (params) => {
                        return rootStore.application.administration.sessionStore.findAdminReviewCertificate(params);
                    }
                }
            }
        });
        this.adminReviewModal = new ModalParams({});
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'charityName',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.CHARITY_NAME_LABEL',
                },
                {
                    key: 'openCertificateAmount',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency'
                    }
                },
                {
                    key: 'donorName',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.DONOR_LABEL',
                },
                {
                    key: 'confirmationNumber',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.CONFIRMATION_LABEL'
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
            actions: {
                onReview: (item) => this.openReviewModal(item)
            },
            actionsRender: {}
        }));
    }
    @action.bound
    openReviewModal(item) {
        this.baseUrl = ApplicationSettings.useSSL ? 'https://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" : 'http://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" ;
        const url = this.baseUrl + "charity-file-streams/"+ item.coreMediaVaultEntryId;

        console.log(url);

        this.adminReviewModal.open({
            imgSrc: url,
            certificate: item,
            onClick: async (certificate) => {
                await this.rootStore.application.administration.sessionStore.updateAdminReviewCertificate({id: certificate.id, isApproved: true});
                this.adminReviewModal.close();
                this.queryUtility.fetch();
            },
            onClose: () => {
                this.adminReviewModal.close();
            },
            onDisapprove: async (certificate) => {
                await this.rootStore.application.administration.sessionStore.updateAdminReviewCertificate({id: certificate.id, isApproved: false});
                this.adminReviewModal.close();
                this.queryUtility.fetch();
            }
        })
    }
}

export default AdminReviewViewStore;
