import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { BookletListFilter } from 'application/administration/booklet/models';
import _ from 'lodash';
import { action, observable, toJS } from 'mobx';
// import { BookletExportForm } from '../forms';
import { saveAs } from '@progress/kendo-file-saver';

@applicationContext
class BookletViewStore extends BaseListViewStore {
    @observable resourcesModel = { codeEnd: 0, codeStart: 0 };
    @observable remainingAmount;

    // @observable form = new BookletExportForm({
    //     onSuccess: async form => {
    //         this.loaderStore.suspend();
    //         const item = form.values();
    //         const data = await this.rootStore.application.administration.bookletStore.export(item);
    //         this.rootStore.notificationStore.success((data && data.message) ? data.message : 'EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
    //         this.loaderStore.resume();
    //         return data;
    //     }
    // });

    constructor(rootStore) {
        super(rootStore, {
            name: 'booklet',
            authorization: 'theDonorsFundBookletSection',
            routes: {
            },
            queryConfig: {
                filter: new BookletListFilter('code', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.denominationTypeDropdownStore.setValue(null);
                    this.bookletStatusDropdownStore.setValue(null);
                    this.bookletTypeDropdownStore.setValue(null);
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
                        params.donorId = rootStore.userStore.applicationUser.id;
                        this.remainingAmount = await rootStore.application.administration.bookletStore.remainingAmount(rootStore.userStore.applicationUser.id);
                        console.log('remaining', this.remainingAmount);                
                        return rootStore.application.administration.bookletStore.findBooklet(params);
                    }
                }
            }
        });

        this.createTableStore();
        this.createDenominationDropdownStore();
        this.createBookletStatusDropdownStore();
        this.createBookletTypeDropdownStore();
        this.fileName = '';
    }
    @action.bound
    async exportExcel() {
        const data = await this.rootStore.application.administration.bookletStore.exportBooklets(toJS(this.resourcesModel));
        try {
            this.fileName = `Booklets ${this.resourcesModel.codeStart} - ${this.resourcesModel.codeEnd}.xlsx`;
            saveAs(data, this.fileName);
        } catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'dateCreated',
                    title: 'BOOKLET.LIST.COLUMNS.DATE_ORDERED_LABEL',
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
                            if (item.bookletType.abrv === 'mixed_500' || item.bookletType.abrv === 'mixed_2000') {
                                const denominations = _.orderBy(item.certificates.map(c => { return c.denominationType }), ['value'], ['asc'])
                                const uniqueDenominationNames = _.uniq(denominations.map(c => { return `$${c.value.toFixed(2)}` }))
                                let wording = uniqueDenominationNames.join(', ');
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
                            return `${clean} / ${item.certificateCount}`;
                        }
                    }
                },
                {
                    key: 'remainingAmount',
                    title: 'BOOKLET.LIST.COLUMNS.REMAININGAMOUNT_LABEL',
                    format: {
                        type: 'currency'
                    }
                },
                {
                    key: 'bookletStatus.name',
                    title: 'BOOKLET.LIST.COLUMNS.STATUS_LABEL'
                }
            ],
            actions: {
                // onEdit: (booklet) => this.routes.edit(booklet.id),
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

    createBookletStatusDropdownStore() {
        this.bookletStatusDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.bookletStatusStore.find();
                },
                onChange: (status) => {
                    this.queryUtility.filter.bookletStatusIds = status.map((type) => { return type.id });
                }
            });
    }

    createBookletTypeDropdownStore() {
        this.bookletTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.bookletTypeStore.find();
                },
                onChange: (type) => {
                    this.queryUtility.filter.bookletTypeIds = type.map((type) => { return type.id });
                }
            });
    }
}

export default BookletViewStore;
