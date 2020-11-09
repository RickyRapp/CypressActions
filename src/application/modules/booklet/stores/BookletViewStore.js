import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { BookletListFilter } from 'application/activity/grant/models';
import _ from 'lodash';

@applicationContext
class BookletViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'booklet',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
                edit: (id) => { this.rootStore.routerStore.goTo('master.app.main.booklet.edit', { id: id }) },
                create: () => { this.rootStore.routerStore.goTo('master.app.main.booklet.create') },
            },
            queryConfig: {
                filter: new BookletListFilter('code', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.denominationTypeDropdownStore.setValue(null);
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'bookletStatus',
                            'bookletType',
                            'certificates',
                            'certificates.denominationType',
                            'certificates.certificateStatus'
                        ];

                        return this.rootStore.application.booklet.bookletStore.find(params);
                    }
                }
            }
        });

        this.createTableStore();
        this.createDenominationDropdownStore();
    }

    createTableStore() {
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
                                const denominations = _.uniq(item.certificates.map(c => { return c.denominationType.name }))
                                let wording = denominations.join(', ');
                                return `${item.bookletType.name} - ${wording}`;
                            }
                            else {
                                return item.certificates[0].denominationType.name;
                            }
                        }
                    }
                },
                {
                    key: 'certificates',
                    title: 'BOOKLET.LIST.COLUMNS.CERTIFICATES_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            const clean = item.certificates.filter(c => c.certificateStatus.abrv === 'clean').length;
                            const used = item.certificates.filter(c => c.certificateStatus.abrv === 'used').length;
                            const canceled = item.certificates.filter(c => c.certificateStatus.abrv === 'canceled').length;
                            const active = item.certificates.filter(c => c.isActive).length;
                            return `${clean} / ${used} / ${canceled} | ${active}`;
                        }
                    }
                },
                {
                    key: 'bookletStatus.name',
                    title: 'BOOKLET.LIST.COLUMNS.STATUS_LABEL'
                }
            ],
            actions: {
                onEdit: (booklet) => this.routes.edit(booklet.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));
    }

    createDenominationDropdownStore() {
        this.denominationTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.denominationTypeStore.find();
                },
                onChange: (denominationType) => {
                    this.queryUtility.filter.denominationTypeIds = denominationType.map((type) => { return type.id });
                }
            });
    }
}

export default BookletViewStore;
