import { action } from 'mobx';
import { BookletOrderService } from "common/data";
import { BookletOrderEditForm } from 'modules/common/booklet-order/forms';
import { BaseBookletOrderEditViewStore } from 'modules/common/booklet-order/stores';
import _ from 'lodash';

class BookletOrderEditViewStore extends BaseBookletOrderEditViewStore {
    constructor(rootStore) {
        const bookletOrderService = new BookletOrderService(rootStore.app.baasic.apiClient);
        const userId = rootStore.authStore.user.id;
        const id = rootStore.routerStore.routerState.params.id;

        const fields = [
            'id',
            'dateCreated',
            'deliveryMethodTypeId',
            'bookletOrderStatusId',
            'bookletOrderItems',
            'bookletOrderItems.count',
            'bookletOrderItems.denominationTypeId',
        ];

        const editViewStore = {
            name: 'booklet order',
            id: id,
            actions: {
                update: async item => {
                    return await bookletOrderService.update(item);
                },
                get: async id => {
                    let params = {};
                    params.embed = [
                        'bookletOrderItems'
                    ];
                    params.fields = fields;
                    this.bookletOrder = await bookletOrderService.get(id, params);
                    return this.bookletOrder;
                }
            },
            FormClass: BookletOrderEditForm,
            loader: true
        }

        const config = {};
        config.editViewStore = editViewStore;
        config.id = id;
        config.userId = userId;

        super(rootStore, config);

        this.load();
    }
}

export default BookletOrderEditViewStore;