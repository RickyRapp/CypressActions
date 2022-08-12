import { BasePreviewViewStore, TableViewStore } from 'core/stores';
import { applicationContext, isSome } from 'core/utils';
import { action, observable } from 'mobx';
import { CustomCellTemplate } from 'themes/application/donor/booklet-order/components';

@applicationContext
class BookletOrderPreviewViewStore extends BasePreviewViewStore {
    @observable bookletTypes = null;
    @observable denominationTypes = null;

    constructor(rootStore) {
        super(rootStore, {
            name: 'booklet-order-details',
            id: rootStore.routerStore.routerState.params.id,
            routes: {
                bookletCode: (code) => {
                    this.rootStore.routerStore.goTo('master.app.main.donor.booklet.list', null, { codes: code });
                }
            },
            autoInit: false,
            actions: () => {
                return {
                    get: async (id) => {
                        const params = {
                            embed: [
                                'donor',
                                'bookletOrderStatus',
                                'deliveryMethodType',
                                'booklets',
                                'booklets.bookletType',
                                'booklets.certificates',
                                'booklets.certificates.denominationType',
                                'booklets.certificates.certificateStatus',
                            ]
                        }
                        return rootStore.application.administration.bookletOrderStore.getBookletOrder(id, params);
                    }
                }
            }
        });
        this.certificateStatusLookup = null;
        this.createTableStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        } else {
            await this.fetch([this.getResource(this.id), this.loadLookups()]);
            this.certificateStatusLookup = await this.rootStore.application.lookup.certificateStatusStore.find();
            if (this.item) {
                if (this.item.json) {
                    let tempArray = JSON.parse(this.item.json);
                    for (let index = 0; index < tempArray.length; index++) {
                        tempArray[index].bookletType = this.bookletTypes.find(c => c.id === tempArray[index].bookletTypeId);
                        if (tempArray[index].denominationTypeId) {
                            tempArray[index].denominationType = this.denominationTypes.find(c => c.id === tempArray[index].denominationTypeId);
                        }
                        if (this.item.bookletOrderStatus.abrv === 'finished') {
                            tempArray[index].booklets = this.item.booklets.filter(c => {
                                return (
                                    c.bookletType.id === tempArray[index].bookletTypeId &&
                                    (!isSome(tempArray[index].denominationTypeId) || c.certificates.some(d => d.denominationType.id === tempArray[index].denominationTypeId))
                                )
                            })
                        }
                    }
                    this.tableStore.setData(tempArray);
                    if (!this.tableStore.dataInitialized) {
                        this.tableStore.dataInitialized = true;
                    }
                }
            }
        }
    }

    createTableStore() {
        this.tableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'bookletCount',
                    title: 'BOOKLET_ORDER.PREVIEW.COLUMNS.COUNT_LABEL'
                },
                {
                    key: 'bookletType.name',
                    title: 'BOOKLET_ORDER.PREVIEW.COLUMNS.BOOKLET_TYPE_LABEL'
                },
                {
                    key: 'denominationType.name',
                    title: 'BOOKLET_ORDER.PREVIEW.COLUMNS.DENOMINATION_TYPE_LABEL'
                },
                {
                    key: 'isPrePaid',
                    title: 'BOOKLET_ORDER.PREVIEW.COLUMNS.IS_PRE_PAID_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                },
                {
                    key: 'isSessionFeePayedByCharity',
                    title: 'BOOKLET_ORDER.PREVIEW.COLUMNS.IS_SESSION_FEE_PAYED_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return item.isPrePaid ? (item.isSessionFeePayedByCharity ? 'Yes' : 'No') : '-'
                        }
                    }
                },
                {
                    key: 'booklets',
                    title: 'BOOKLET_ORDER.PREVIEW.COLUMNS.BOOKLETS_LABEL',
                    cell: CustomCellTemplate,
                    onClick: this.onCodeClick
                },
                {
                    key: 'used',
                    title: 'Used certificates',
                    format: {
                        type: 'function',
                        value: (item) => { 
                            let usedCount = 0;
                            let totalCount = 0;
                            if(typeof item !== 'undefined' && item.bookletCount && item.bookletCount > 0){
                                const usedId = this.certificateStatusLookup.find(c => c.abrv === 'used').id;
                                for (let i = 0; i < (item.booklets && item.booklets.length); i++) {
                                    if(typeof item.booklets[i] !== 'undefined' || typeof item.booklets[i].certificates !== 'undefined'){ 
                                        //usedCount += item.booklets[i].certificates.find(c => c.certificateStatusId === usedId).length;
                                        totalCount += item.booklets[i].certificates.length;
                                        item.booklets[i].certificates.forEach(certificate => {
                                            if(certificate.certificateStatusId === usedId)
                                            usedCount += 1;
                                        });
                                    }
                                }
                            }
                            
                            return `${parseInt(usedCount)}/${parseInt(totalCount)}`;
                        }
                    }
                }
                /*{
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
                },*/
            ],
        });
    }

    async loadLookups() {
        this.denominationTypes = await this.rootStore.application.lookup.denominationTypeStore.find();
        this.bookletTypes = await this.rootStore.application.lookup.bookletTypeStore.find();
    }

    @action.bound
    onCodeClick(code) {
        this.routes.bookletCode(code)
    }
}

export default BookletOrderPreviewViewStore;
