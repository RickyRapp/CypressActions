import { action } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { DonorNoteService } from "common/data";
import { DonorNotePostForm } from "modules/donor-note/forms";
import _ from 'lodash';

class DonorNoteEditViewStore extends BaseEditViewStore {
    constructor(rootStore, { id, onAfterUpdate }) {
        const donorNoteService = new DonorNoteService(rootStore.app.baasic.apiClient);
        super(rootStore, {
            name: 'donor note',
            id: id,
            actions: {
                update: async donorNote => {
                    await donorNoteService.update({ id: id, ...donorNote });
                },
                get: async id => {
                    let params = {};
                    const response = await donorNoteService.get(id, params);
                    return response;
                }
            },
            FormClass: DonorNotePostForm,
            goBack: false,
            onAfterUpdate: onAfterUpdate
        });
    }
}

export default DonorNoteEditViewStore;