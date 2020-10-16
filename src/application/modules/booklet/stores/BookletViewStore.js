import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { BookletService } from 'application/booklet/services';
import { applicationContext } from 'core/utils';
import { BookletListFilter } from 'application/booklet/models';
import _ from 'lodash';

@applicationContext
class BookletViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const filter = new BookletListFilter('code', 'desc')
        if (rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) {
            if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.donorId) {
                filter.donorId = rootStore.routerStore.routerState.queryParams.donorId;
            }
        }

        super(rootStore, {
            name: 'booklet',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {},
            queryConfig: {
                filter: filter,
                onResetFilter: () => {
                    this.denominationTypeDropdownStore.setValue(null);
                }
            },
            actions: () => {
                const service = new BookletService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'bookletStatus',
                            'bookletType',
                            'certificates',
                            'certificates.denominationType',
                            'certificates.certificateStatus'
                        ];

                        let userId = null;
                        if (!this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) {
                            userId = rootStore.userStore.user.id
                        }

                        const response = await service.find({ userId: userId, ...params });
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'dateCreated',
                    title: 'BOOKLET.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'code',
                    title: 'BOOKLET.LIST.COLUMNS.CODE_LABEL'
                },
                {
                    key: 'denominationType',
                    title: 'BOOKLET.LIST.COLUMNS.DENOMINATION_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            if (item.bookletType.abrv === 'mixed') {
                                const denominations = _.uniq(_.map(item.certificates, 'denominationType'))
                                let wording = denominations.join(', ');
                                return `${item.bookletType.name} - ${wording}`
                            }
                            else {
                                return `${item.certificates[0].denominationType.name} - `
                            }
                        }
                    }
                },
                {
                    key: 'certificates',
                    format: {
                        type: 'function',
                        value: (item) => {
                            const clean = _.filter(item.certificates, { certificateStatus: { abrv: 'clean' } }).length;
                            const used = _.filter(item.certificates, { certificateStatus: { abrv: 'used' } }).length;
                            const canceled = _.filter(item.certificates, { certificateStatus: { abrv: 'canceled' } }).length;
                            const active = _.filter(item.certificates, { isActive: true }).length;
                            return `${clean} / ${used} / ${canceled} | ${active}`;
                        }
                    },
                    header: {
                        title: 'BOOKLET.LIST.COLUMNS.CERTIFICATES_LABEL',
                        tooltip: {
                            text: 'BOOKLET.LIST.COLUMNS.CERTIFICATES_TOOLTIP_LABEL'
                        }
                    }
                }
            ],
            actions: {
                onEdit: (booklet) => this.routes.edit(booklet.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));

        this.denominationTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.denominationTypeStore.find();
                },
                onChange: (denominationType) => {
                    this.queryUtility.filter['denominationTypeIds'] = _.map(denominationType, (type) => { return type.id });
                }
            });
    }
}

export default BookletViewStore;
