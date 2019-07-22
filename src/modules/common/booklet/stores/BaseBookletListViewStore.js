import { action, observable, computed } from 'mobx';
import { LookupService } from "common/data";
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { ModalParams } from 'core/models';
import { formatDenomination } from 'core/utils';
import _ from 'lodash';

class BaseBookletListViewStore extends BaseListViewStore {
    @observable certificateStatuses = null;
    @observable denominationTypes = null;
    @observable bookletStatuses = null;
    @observable bookletId = null;


    setColumns = null;
    setActions = null;
    setRenderActions = null;
    setSelectedExportColumnsName = null;
    setAdditionalExportColumnsName = null;

    constructor(rootStore, config) {
        super(rootStore, config.listViewStore);

        this.bookletStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'booklet-status');
        this.denominationTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'denomination-type');
        this.certificateStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'certificate-status');

        this.detailsModalParams = new ModalParams({
            onClose: () => { this.bookletId = null; this.onClose },
            notifyOutsideClick: true
        });

        this.defaultActions = {
            onDetails: booklet => { this.bookletId = booklet.id; this.detailsModalParams.open(); }
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
        let bookletStatusModels = await this.bookletStatusLookup.getAll();
        this.bookletStatuses = bookletStatusModels.data;

        let denominationTypeModels = await this.denominationTypeLookup.getAll();
        this.denominationTypes = denominationTypeModels.data;

        let certificateStatusModels = await this.certificateStatusLookup.getAll();
        this.certificateStatuses = certificateStatusModels.data;
    }

    @action.bound async setStores() {
        this.denominationTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: "Denomination",
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: (options) => this.queryUtility.filter.denominationTypeIds = (options ? _.map(options, item => { return item.id }) : null)
            },
            _.map(_.orderBy(this.denominationTypes, ['sortOrder'], ['asc']), item => { return { id: item.id, name: formatDenomination(item, true) } })
        );

        this.bookletStatusDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: "Status",
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: (options) => this.queryUtility.filter.bookletStatusIds = (options ? _.map(options, item => { return item.id }) : null)
            },
            _.map(_.orderBy(this.bookletStatuses, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );
    }

    @computed get usedCertificateStatusId() {
        return this.certificateStatuses ? _.find(this.certificateStatuses, { abrv: 'used' }).id : null;
    }

    @computed get cleanCertificateStatusId() {
        return this.certificateStatuses ? _.find(this.certificateStatuses, { abrv: 'clean' }).id : null;
    }

    @computed get canceledCertificateStatusId() {
        return this.certificateStatuses ? _.find(this.certificateStatuses, { abrv: 'canceled' }).id : null;
    }
}


export default BaseBookletListViewStore;