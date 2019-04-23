import { BaseEditViewStore } from "core/stores";
import { DonorNoteService } from "common/data";
import { DonorNotePostForm } from "modules/administration/donor-note/forms";
import _ from 'lodash';

class DonorNoteCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, { onAfterCreate }) {
        const donorNoteService = new DonorNoteService(rootStore.app.baasic.apiClient);
        super(rootStore, {
            name: 'donor note',
            actions: {
                create: async donorNote => {
                    try {
                        donorNote.donorAccountId = rootStore.routerStore.routerState.params.userId;
                        return await donorNoteService.create(donorNote);
                    } catch (errorResponse) {
                        return errorResponse;
                    }
                }
            },
            FormClass: DonorNotePostForm,
            goBack: false,
            onAfterCreate: onAfterCreate
        });
    }
}

export default DonorNoteCreateViewStore;