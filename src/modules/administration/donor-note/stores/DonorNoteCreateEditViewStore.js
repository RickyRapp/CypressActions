import { BaseEditViewStore } from "core/stores";
import { DonorNoteService } from "common/data";
import { DonorNoteCreateEditForm } from "modules/administration/donor-note/forms";
import _ from 'lodash';

class DonorNoteCreateEditViewStore extends BaseEditViewStore {
    constructor(rootStore, { onAfterCreateEdit, id, userId, onCancelEdit }) {
        const donorNoteService = new DonorNoteService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donor note',
            id: id,
            actions: {
                create: async donorNote => {
                    donorNote.donorAccountId = userId;
                    return await donorNoteService.create(donorNote);
                },
                update: async donorNote => {
                    return await donorNoteService.update({ id: id, ...donorNote });
                },
                get: async id => {
                    let params = {};
                    const response = await donorNoteService.get(id, params);
                    return response;
                }
            },
            FormClass: DonorNoteCreateEditForm,
            goBack: false,
            onAfterCreate: onAfterCreateEdit,
            onAfterUpdate: onAfterCreateEdit
        });

        this.onCancelEdit = onCancelEdit;
    }
}

export default DonorNoteCreateEditViewStore;