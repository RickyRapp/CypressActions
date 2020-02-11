import { TableViewStore, BaseListViewStore } from 'core/stores';
import { CharityService } from 'application/charity/services';
import { applicationContext } from 'core/utils';
import { CharityCertificatesListFilter } from 'application/charity/models';

@applicationContext
class CharityCertificatesViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const service = new CharityService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'charity-certificates',
            routes: {},
            queryConfig: {
                filter: new CharityCertificatesListFilter()
            },
            actions: () => {
                return {
                    find: async (params) => {
                        const response = await service.findCertificates(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donorName',
                    title: 'CHARITY_CERTIFICATES.LIST.COLUMNS.DONOR_LABEL',
                    visible: this.hasPermission('theDonorsFundCharityAdvancedSection.read')
                },
                {
                    key: 'amountAfterDeduction',
                    title: 'CHARITY_CERTIFICATES.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'confirmationNumber',
                    title: 'CHARITY_CERTIFICATES.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
                    visible: this.hasPermission('theDonorsFundCharityAdvancedSection.read')
                },
                {
                    key: 'codeDisplay',
                    title: 'CHARITY_CERTIFICATES.LIST.COLUMNS.CODE_LABEL'
                },
                {
                    key: 'dateProcessed',
                    title: 'CHARITY_CERTIFICATES.LIST.COLUMNS.DATE_PROCESSED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'dateCreated',
                    title: 'CHARITY_CERTIFICATES.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));
    }
}

export default CharityCertificatesViewStore;
