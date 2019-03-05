import { action } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { DonorNoteService } from "common/data";
import { DonorNotePutForm } from "modules/donor-note/forms";
import _ from 'lodash';

class DonorNoteCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, { id, onAfterCreate }) {
        const donorNoteService = new DonorNoteService(rootStore.app.baasic.apiClient);
        super(rootStore, {
            name: 'donor note',
            id: id,
            actions: {
                create: async donorNote => {
                    await donorNoteService.create(donorNote);
                },
                get: async id => {
                    let params = {};
                    const response = await donorNoteService.get(id, params);
                    return response;
                }
            },
            FormClass: DonorNotePutForm,
            goBack: false,
            onAfterCreate: onAfterCreate
        });
    }
}

export default DonorNoteCreateViewStore;