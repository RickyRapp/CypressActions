import { action, observable } from 'mobx';
import { LookupService } from "common/data";
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { ModalParams } from 'core/models';
import _ from 'lodash';

class BaseBookletOrderListViewStore extends BaseListViewStore {
    @observable deliveryMethodTypeDropdownStore = null;
    @observable bookletOrderStatusDropdownStore = null;
    @observable bookletOrderStatuses = null;
    @observable deliveryMethodTypes = null;
    @observable bookletOrderId = null;

    fields = [
        'id',
        'donorAccountId',
        'dateUpdated',
        'amount',
        'bookletOrderStatusId',
        'confirmationNumber',
        'bookletOrderStatusId',
        'createdByCoreUser',
        'createdByCoreUser.userId',
        'createdByCoreUser.firstName',
        'createdByCoreUser.lastName'
    ]
    setColumns = null;
    setActions = null;
    setRenderActions = null;
    setSelectedExportColumnsName = null;
    setAdditionalExportColumnsName = null;

    constructor(rootStore, config) {
        super(rootStore, config.listViewStore);

        this.bookletOrderStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'booklet-order-status');
        this.deliveryMethodTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'delivery-method-type');

        this.selectedExportColumnsName = _.union(['Amount', 'Delivery Method Type'], config.setSelectedExportColumnsName);
        this.additionalExportColumnsName = _.union(['Payer Name', 'Status', 'Created By', 'Date Created'], config.setAdditionalExportColumnsName);

        this.detailsModalParams = new ModalParams({
            onClose: () => { this.bookletOrderId = null; this.onClose },
            notifyOutsideClick: true
        });

        this.defaultActions = {
            onDetails: bookletOrder => { this.bookletOrderId = bookletOrder.id; this.detailsModalParams.open(); }
        };

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        this.setStores();

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: this.setColumns,
                actions: _.merge(this.defaultActions, this.setActions),
                actionsRender: _.merge(this.defaultRenderActions, this.setRenderActions)
            })
        );
    }

    @action.bound async loadLookups() {
        let deliveryMethodTypeModels = await this.deliveryMethodTypeLookup.getAll();
        this.deliveryMethodTypes = deliveryMethodTypeModels.data;

        let bookletOrderStatusModels = await this.bookletOrderStatusLookup.getAll();
        this.bookletOrderStatuses = bookletOrderStatusModels.data;
    }

    @action.bound async setStores() {
        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: 'Choose Delivery Type',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: (options) => this.queryUtility.filter.deliveryMethodTypeIds = (options ? _.map(options, item => { return item.id }) : null)
            },
            _.map(_.orderBy(this.deliveryMethodTypes, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );

        this.bookletOrderStatusDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: 'Choose Booklet Status',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: (options) => this.queryUtility.filter.bookletOrderStatusIds = (options ? _.map(options, item => { return item.id }) : null)
            },
            _.map(_.orderBy(this.bookletOrderStatuses, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );
    }
}

export default BaseBookletOrderListViewStore;