import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { CharityFileStreamService } from 'common/services';
import { CharityService } from 'application/charity/services';
import { applicationContext } from 'core/utils';

@applicationContext
class CharityViewStore extends BaseViewStore {
    attachment = null;
    uploadTypes = null;
    @observable image = null;
    @observable currentImage = null;
    @observable uploadLoading = false;
    uploadTypes = ['.png', '.jpg', '.jpeg'];

    constructor(rootStore) {
        super(rootStore);

        this.rootStore = rootStore;
    }

    @action.bound
    async insertImage(processNow) {
        if (this.attachment != null) {
            try {
                const service = new CharityFileStreamService(this.rootStore.application.baasic.apiClient);
                this.uploadLoading = true;
                const response = await service.uploadCharityUpdateFile(this.attachment);
                if (processNow) {
                    const charityService = new CharityService(this.rootStore.application.baasic.apiClient);
                    await charityService.processUpdateFile();
                }
                this.uploadLoading = false;
                return response.data.id;
            }
            catch (err) {
                this.uploadLoading = false;
                this.rootStore.notificationStore.error('ERROR', err);
            }
        }
        return null;
    }

    @action.bound onAttachmentDrop(item) {
        this.attachment = item.affectedFiles[0].getRawFile();
    }
}

export default CharityViewStore;
