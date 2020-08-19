import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { BookletService } from 'application/booklet/services';
import { applicationContext } from 'core/utils';
import { BookletListFilter } from 'application/booklet/models';
import _ from 'lodash';
import { LookupService } from 'common/services';

@applicationContext
class BookletViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const id = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') ? null : rootStore.userStore.applicationUser.id
        let filter = new BookletListFilter('code', 'desc')
        filter.donorId = id;

        super(rootStore, {
            name: 'booklet',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
                edit: (id) => {
                    this.setChildNavigationTitle(i => i.id === id, item => item.code);
                    this.rootStore.routerStore.goTo(
                        'master.app.main.booklet.edit',
                        { id: id }
                    );
                },
                create: () =>
                    this.rootStore.routerStore.goTo(
                        'master.app.main.booklet.create'
                    )
            },
            queryConfig: {
                filter: filter,
                onResetFilter: (filter) => {
                    filter.donorId = id;
                    filter.orderBy = 'code';
                    filter.orderDirection = 'desc';
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
                            'certificates.certificateStatus',
                            'donor',
                            'grantAcknowledgmentType',
                            'grantAcknowledgmentTypeByAmount',
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
                    key: 'code',
                    title: 'BOOKLET.LIST.COLUMNS.CODE_LABEL',
                    onClick: (item) => this.routes.edit(item.id),
                    authorization: this.authorization.update
                },
                {
                    key: 'donor.donorName',
                    title: 'BOOKLET.LIST.COLUMNS.ASSIGNED_TO_LABEL'
                },
                {
                    key: 'dateAssigned',
                    title: 'BOOKLET.LIST.COLUMNS.DATE_ASSIGNED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'bookletType.name',
                    title: 'BOOKLET.LIST.COLUMNS.TYPE_LABEL'
                },
                {
                    key: 'bookletStatus.name',
                    title: 'BOOKLET.LIST.COLUMNS.STATUS_LABEL'
                },
                {
                    key: 'shareName',
                    title: 'BOOKLET.LIST.COLUMNS.SHARE_NAME_LABEL',
                    format: {
                        type: 'share-name'
                    },
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
                },
                {
                    key: 'dateCreated',
                    title: 'BOOKLET.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
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
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'denomination-type');
                    const response = await service.getAll();
                    return response.data;
                },
                onChange: (denominationType) => {
                    this.queryUtility.filter['denominationTypeIds'] = _.map(denominationType, (type) => { return type.id });
                }
            });
    }
}

export default BookletViewStore;
