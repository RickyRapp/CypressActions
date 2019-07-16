import { action } from 'mobx';
import { BookletOrderService } from "common/data";
import { BookletOrderCreateForm } from 'modules/administration/booklet-order/forms';
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
                    console.log(item)
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
}

export default BookletOrderCreateViewStore;