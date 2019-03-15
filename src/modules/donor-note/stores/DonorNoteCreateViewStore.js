import { action } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { DonorNoteService } from "common/data";
import { DonorNotePostForm } from "modules/donor-note/forms";
import _ from 'lodash';

class DonorNoteCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, { onAfterCreate }) {
        const donorNoteService = new DonorNoteService(rootStore.app.baasic.apiClient);
        super(rootStore, {
            name: 'donor note',
            actions: {
                create: async donorNote => {
                    donorNote.donorAccountId = rootStore.routerStore.routerState.params.id;
                    await donorNoteService.create(donorNote);
                }
            },
            FormClass: DonorNotePostForm,
            goBack: false,
            onAfterCreate: onAfterCreate
        });
    }
}

export default DonorNoteCreateViewStore;