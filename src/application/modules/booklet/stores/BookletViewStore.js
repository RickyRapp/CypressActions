import { TableViewStore, BaseListViewStore } from 'core/stores';
import { BookletService } from 'application/booklet/services';
import { applicationContext } from 'core/utils';
import { BookletListFilter } from 'application/booklet/models';
import _ from 'lodash';

@applicationContext
class BookletViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'booklet',
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
                filter: new BookletListFilter()
            },
            actions: () => {
                const service = new BookletService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'bookletStatus',
                            'denominationType',
                            'certificates',
                            'certificates.certificateStatus',
                            'donorAccount',
                            'donorAccount.coreUser',
                            'donorAccount.companyProfile'
                        ];
                        params.fields = [];
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
                    onClick: item => this.routes.edit(item.id),
                    authorization: this.authorization.update
                },
                {
                    key: 'denominationType.name',
                    title: 'BOOKLET.LIST.COLUMNS.DENOMINATION_LABEL',
                    format: {
                        type: 'denomination',
                        value: 'short'
                    }
                },
                {
                    key: 'donorAccount.donorName',
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
                    key: 'bookletStatus.name',
                    title: 'BOOKLET.LIST.COLUMNS.STATUS_LABEL'
                },
                {
                    key: 'certificates',
                    title: 'BOOKLET.LIST.COLUMNS.CERTIFICATES_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            const clean = _.filter(item.certificates, { certificateStatus: { abrv: 'clean' } }).length;
                            const used = _.filter(item.certificates, { certificateStatus: { abrv: 'used' } }).length;
                            const canceled = _.filter(item.certificates, { certificateStatus: { abrv: 'canceled' } }).length;
                            const active = _.filter(item.certificates, { isActive: true }).length;
                            return `${clean} / ${used} / ${canceled} | ${active}`;
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
    }
}

export default BookletViewStore;
