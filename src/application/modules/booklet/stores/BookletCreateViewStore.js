import { action, runInAction, observable } from 'mobx';
import { BookletCreateForm } from 'application/booklet/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext, isSome } from 'core/utils';
import { BookletService } from 'application/booklet/services';
import { LookupService } from 'common/services';

@applicationContext
class BookletCreateViewStore extends BaseEditViewStore {
    @observable countError = null;
    @observable denominationError = null;
    originalDenominationTypes = null;
    @observable count = '';

    constructor(rootStore) {
        const service = new BookletService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'booklet',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
                        service.create(resource.items);
                        return { statusCode: 200, data: "Added To Queue. You Will Receive Email When Booklets Are Created." }
                    }
                }
            },
            FormClass: BookletCreateForm,
        });

        this.service = service;
        this.denominationTypeDropdownStore = new BaasicDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDenominationTypes()
            ]);
        }
    }

    @action.bound onDel(item) {
        item.del();
        this.resetDenominationDropdownStore();
    }

    @action.bound onAdd() {
        if (this.count && this.denominationTypeDropdownStore.value) {
            this.form.$('items').add([{ count: this.count, denominationTypeId: this.denominationTypeDropdownStore.value.id }])
            this.count = '';
            this.denominationTypeDropdownStore.setValue(null);
            this.resetDenominationDropdownStore();
        }
    }

    @action.bound onEdit(item) {
        this.count = item.$('count').value;
        this.denominationTypeDropdownStore.setValue(_.find(this.originalDenominationTypes, { id: item.$('denominationTypeId').value }));
        item.del();
        this.resetDenominationDropdownStore();
    }

    @action
    resetDenominationDropdownStore() {
        const usedDenominationTypeIds = _.map(this.form.$('items').value, e => { return e.denominationTypeId });
        const availableDenominations = _.filter(this.originalDenominationTypes, function (params) { return !_.includes(usedDenominationTypeIds, params.id) })
        this.denominationTypeDropdownStore.setItems(availableDenominations);
    }

    @action.bound onCountChange(event) {
        this.count = event.target.value;
        this.countError = !(this.count !== null && this.count !== undefined && this.count !== '');
    }

    @action.bound
    async fetchDenominationTypes() {
        this.denominationTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'denomination-type');
        const response = await service.getAll();
        this.originalDenominationTypes = response.data;
        runInAction(() => {
            this.denominationTypeDropdownStore.setItems(this.originalDenominationTypes);
            this.denominationTypeDropdownStore.setLoading(false);
        });
    }
}

export default BookletCreateViewStore;
