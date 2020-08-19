import { action, observable } from 'mobx';
import { BookletCreateForm } from 'application/booklet/forms';
import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { BookletService } from 'application/booklet/services';
import { LookupService } from 'common/services';

@applicationContext
class BookletCreateViewStore extends BaseEditViewStore {
    @observable bookletTypes = null;
    @observable denominationTypes = null;

    constructor(rootStore) {

        super(rootStore, {
            name: 'booklet-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                const service = new BookletService(rootStore.application.baasic.apiClient);
                return {
                    create: async (resource) => {
                        service.create(resource.items);
                        return { statusCode: 200, data: "Added To Queue. You Will Receive Email When Booklets Are Created." }
                    }
                }
            },
            FormClass: BookletCreateForm,
        });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDenominationTypes(),
                this.fetchBookletTypes(),
            ]);
        }
    }

    @action.bound
    async fetchDenominationTypes() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'denomination-type');
        const response = await service.getAll();
        this.denominationTypes = response.data;
    }

    @action.bound
    async fetchBookletTypes() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'booklet-type');
        const response = await service.getAll();
        this.bookletTypes = response.data;
    }
}

export default BookletCreateViewStore;
