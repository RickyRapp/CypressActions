import { TableViewStore, BaseListViewStore } from 'core/stores';
import { SessionPendingCertificateService } from 'application/session/services';
import _ from 'lodash';
import { FilterParams } from 'core/models';

class SessionPendingCertificateViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const service = new SessionPendingCertificateService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'session',
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
                            'certificate.booklet',
                            'certificate.booklet.denominationType'
                        ];
                        const response = await service.find(params);
                        return response.data;
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
                    key: 'amountAfterDeduction',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.AMOUNT_AFTER_DEDUCTION_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'certificate.booklet.denominationType.value',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.DENOMINATION_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
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
            actions: {
            },
            actionsRender: {
            }
        }));
    }
}

export default SessionPendingCertificateViewStore;
