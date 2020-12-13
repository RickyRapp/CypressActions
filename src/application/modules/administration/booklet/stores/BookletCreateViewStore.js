import { action, observable } from 'mobx';
import { BookletCreateForm } from 'application/administration/booklet/forms';
import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

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
                return {
                    create: async (resource) => {
                        rootStore.application.administration.bookletStore.createBooklet(resource.items);
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
                this.loadLookups()
            ]);
        }
    }

    async loadLookups() {
        this.denominationTypes = await this.rootStore.application.lookup.denominationTypeStore.find();
        this.bookletTypes = await this.rootStore.application.lookup.bookletTypeStore.find();
    }
}

export default BookletCreateViewStore;
