import { TableViewStore, BaseListViewStore } from 'core/stores';
import { FilterParams } from 'core/models';

class SessionPendingCertificateViewStore extends BaseListViewStore {
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
                        params.embed = [
                            'charity',
                            'certificate',
                            'certificate.denominationType',
                            'certificate.booklet',
                            'certificate.booklet.bookletOrder',
                            'certificate.booklet.bookletOrder.donor',
                            'session'
                        ];

                        const statuses = await rootStore.application.lookup.sessionPendingCertificateStatusStore.find();
                        params.sessionPendingCertificateStatusIds = statuses.find(c => c.abrv === 'pending').id;

                        return rootStore.application.administration.sessionStore.findSessionPendingCertificate(params);
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
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
        }));
    }
}

export default SessionPendingCertificateViewStore;
