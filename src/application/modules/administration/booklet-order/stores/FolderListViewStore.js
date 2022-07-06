import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore, SelectTableWithRowDetailsViewStore } from 'core/stores';
import { donorFormatter } from 'core/utils';
import { ModalParams } from 'core/models';
import { BookletOrderListFilter } from 'application/administration/booklet-order/models';
import moment from 'moment';
import { saveAs } from '@progress/kendo-file-saver';
class FolderListViewStore extends BaseListViewStore {
    @observable deliveryPickUp;

    constructor(rootStore) {
        
        super(rootStore, {
            name: 'booklet-order',
            authorization: 'theDonorsFundBookletOrderSection',
            routes: {
                create: () => {
                    this.openSelectDonorModal();
                },
                review: (id) => {
                    this.rootStore.routerStore.goTo('master.app.main.administration.booklet-order.review', { id: id });
                },
                details: (id) => {t
                    this.rootStore.routerStore.goTo('master.app.main.administration.booklet-order.details', { id: id });
                },
                edit: (id) => {
                    this.rootStore.routerStore.goTo('master.app.main.administration.booklet-order.edit', { id: id });
                }
            },
            queryConfig: {
                filter: new BookletOrderListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.deliveryMethodTypeDropdownStore.setValue(null);
                    this.bookletOrderStatusDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                    this.searchDonorDropdownStore.setValue(null);
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        var response = await this.rootStore.application.administration.bookletOrderStore.getFolderOrders(params);
                        this.deliveryPickUp = (await this.rootStore.application.lookup.deliveryMethodTypeStore.find()).find(x => x.abrv == 'pick-up');
                        return response.data;
                    }
                }
            }
        });
        this.createTableStore();
        if (!this.tableStore.dataInitialized) {
            this.tableStore.dataInitialized = true;
        }
    }


    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
                    title: 'BOOKLET_ORDER.LIST.COLUMNS.DONOR_NAME_LABEL',
                    disableClick: true
                },
                {
                    key: 'dateCreated',
                    title: 'BOOKLET_ORDER.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'bookletOrders[0].confirmationNumber',
                    title: 'BOOKLET_ORDER.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL'
                },
                {
                    key: 'isDelivered',
                    title: 'Is delivered',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                },
                {
                    key: 'bookletOrders[0].shippingAddressLine1',
                    title: 'Shipping address',
                    format: {
                        type: 'function',
                        value: (item) => {
                            if(item.bookletOrders.length > 0 && item.bookletOrders[0].deliveryMethodTypeId == this.deliveryPickUp.id) {
                                return '1777 Ave of The States, Suite 103, Lakewood, NJ 08701';
                            }
                            return `${item.bookletOrders[0].shippingAddressLine1}, ${item.bookletOrders[0].shippingCity}, ${item.bookletOrders[0].shippingState}, ${item.bookletOrders[0].shippingZipCode}`
                        }
                    }
                },
                {
                    key: 'trackingNumber',
                    title: 'Tracking Number',
                }
            ],
            actions: {
                onReview: async (item) => {
                    await this.rootStore.application.administration.bookletOrderStore.folderReview({id: item});
                    this.queryUtility.fetch();
                },
                onDetails: (bookletOrderId) => this.routes.details(bookletOrderId),
                onSort: (column) => this.queryUtility.changeOrder(column.key),
                onCancel: async (item) => await this.cancelBookletOrder(item.id),
                onEdit: (item) => this.routes.edit(item.id)
            },
            actionsRender: {
                onReviewRender: (item) => {
                    return item && !item.isDelivered;
                },
                onDetailsRender: (item) => {
                    return false;
                },
                onCancelRender: (item) => {
                    return false;
                },
                onEditRender: (item) => {
                    return false;
                }
            }
        }, true));
    }
   
}

export default FolderListViewStore;
