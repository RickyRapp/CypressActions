import { action } from 'mobx';
import { BookletOrderService } from "common/data";
import { BookletOrderCreateForm } from 'modules/common/booklet-order/forms';
import { BaseBookletOrderCreateViewStore } from 'modules/common/booklet-order/stores';
import _ from 'lodash';

class BookletOrderCreateViewStore extends BaseBookletOrderCreateViewStore {
    constructor(rootStore) {
        const bookletOrderService = new BookletOrderService(rootStore.app.baasic.apiClient);
        const userId = rootStore.routerStore.routerState.params.userId;

        const createViewStore = {
            name: 'booklet order',
            actions: {
                create: async item => {
                    return await bookletOrderService.create(item);
                }
            },
            FormClass: BookletOrderCreateForm,
            loader: true
        }

        const config = {};
        config.createViewStore = createViewStore;
        config.userId = userId;

        super(rootStore, config);

        this.load();
    }

    setFormDefaults() {
        super.setFormDefaults();
        this.form.$('checkOrderUrl').set('value', `${window.location.origin}/app/administration/booklet-order/?confirmationNumber={confirmationNumber}`)
    }
}

export default BookletOrderCreateViewStore;