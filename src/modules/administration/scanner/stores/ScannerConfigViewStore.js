import { action, observable } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { SessionService } from "common/data";
import { ScannerConnectionCreateForm } from 'modules/administration/scanner/forms';
import _ from 'lodash';

class ScannerConfigViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        const sessionService = new SessionService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'scanner configuration',
            actions: {
                create: async (item) => {
                    return await sessionService.createScannerConnection(item);
                }
            },
            FormClass: ScannerConnectionCreateForm,
            goBack: false,
            onAfterCreate: (response) => this.saveScannerIdAndRedirect(response.data.response)
        });

        this.rootStore = rootStore;
    }

    @action.bound saveScannerIdAndRedirect(scannerId) {
        localStorage.setItem('scannerId', scannerId);
        this.rootStore.routerStore.goTo('master.app.scanner.info.start')
    }
}

export default ScannerConfigViewStore;
