import { action, observable } from 'mobx';
import { BookletService, LookupService } from "common/data";
import { BookletCreateForm } from 'modules/administration/booklet/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { formatDenomination } from 'core/utils';
import _ from 'lodash';

class BookletCreateViewStore extends BaseEditViewStore {
    @observable denominationTypeDropdownStore = null;
    @observable denominationTypes = null;
    @observable refresh = 1;

    constructor(rootStore) {
        const bookletService = new BookletService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'booklet',
            actions: {
                create: async item => {
                    bookletService.create(item.items);
                    return { statusCode: 200, data: "Added To Queue. You Will Receive Email When Booklets Are Created." }
                }
            },
            FormClass: BookletCreateForm
        });

        this.denominationTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'denomination-type');

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        this.setStores();
    }

    @action.bound async loadLookups() {
        const denominationTypeModels = await this.denominationTypeLookup.getAll();
        this.denominationTypes = denominationTypeModels.data;
    }

    @action.bound setStores() {
        this.denominationTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: () => {
                    const disabledDenominationTypeIds = _.map(this.form.$('items').value, e => { return e.denominationTypeId });
                    var newItems = _.map(this.denominationTypes, item => { return { id: item.id, name: formatDenomination(item, true), disabled: _.includes(disabledDenominationTypeIds, item.id) } })
                    this.denominationTypeDropdownStore.setItems(newItems)
                    this.refresh = this.refresh + 1;
                }
            },
            _.map(this.denominationTypes, item => { return { id: item.id, name: formatDenomination(item, true), disabled: false } })
        );
    }

    @action.bound onDel(item) {
        if (item.$('denominationTypeId').value) {
            _.find(this.denominationTypeDropdownStore.items, { id: item.$('denominationTypeId').value }).disabled = false;
        }
        item.del();
        this.refresh = this.refresh + 1
    }
}

export default BookletCreateViewStore;