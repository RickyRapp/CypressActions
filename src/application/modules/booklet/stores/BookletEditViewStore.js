import { action, runInAction, observable } from 'mobx';
import { BookletEditForm } from 'application/booklet/forms';
import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { BookletService } from 'application/booklet/services';
import { LookupService } from 'common/services';

@applicationContext
class BookletEditViewStore extends BaseViewStore {
    @observable booklet = null;
    @observable certificateStatuses = null;
    @observable certificateStatusDropdownStore = null;

    loaderStore = this.createLoaderStore();
    form = new BookletEditForm({
        onSuccess: async form => {
            this.loaderStore.suspend();
            const item = form.values();
            const response = await this.service.updateCertificate(item);
            this.rootStore.notificationStore.success((response && response.data && response.data.message) ? response.data.message : 'EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
            this.loaderStore.resume();
            return response;
        }
    });

    constructor(rootStore) {
        super(rootStore);

        this.id = rootStore.routerStore.routerState.params.id;
        this.rootStore = rootStore;
        this.service = new BookletService(rootStore.application.baasic.apiClient);
        this.certificateStatusDropdownStore = new BaasicDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.form.clear();
            await this.fetch([
                this.fetchCertificateStatuses(),
                this.getResource(this.id)
            ]);
        }
    }

    @action.bound
    async getResource() {
        let params = {
            embed: [
                'bookletOrder',
                'bookletOrder.accountType',
                'certificates',
                'certificates.certificateStatus',
                'certificates.denominationType',
                'donor',
                'createdByCoreUser',
                'bookletType'
            ]
        }
        const response = await this.service.get(this.id, params);
        this.booklet = response.data;
    }

    @action.bound
    async saveRowChanges(item) {
        item.bookletId = this.booklet.id;
        this.form.update(item);
        await this.form.submit();
    }

    @action.bound
    async onRowStatusChange(e, item) {
        this.certificateStatusDropdownStore.setValue(e.target.value);
        item.certificateStatus = e.target.value
    }

    @action.bound
    async isActiveConfirm(active) {
        this.rootStore.modalStore.showConfirm(
            `Are You Sure You Want To Set ${active ? 'Active' : 'In Active'} All Certificates In This Booklet?`,
            async () => {
                this.loaderStore.suspend();
                await this.saveRowChanges({
                    bookletId: this.booklet.id,
                    id: '',
                    isActive: active,
                    certificateStatusId: '',
                    note: ''
                });

                this.getResource();
                this.loaderStore.resume();
            }
        );
    }

    @action.bound
    async certificateStatusIdConfirm(status) {
        this.rootStore.modalStore.showConfirm(
            `Are You Sure You Want To Set Status ${status.name} For All Certificates In This Booklet?`,
            async () => {
                this.loaderStore.suspend();
                await this.saveRowChanges({
                    bookletId: this.booklet.id,
                    id: '',
                    isActive: '',
                    certificateStatusId: status.id,
                    note: ''
                });

                this.getResource();
                this.loaderStore.resume();
            }
        );
    }

    @action.bound
    async fetchCertificateStatuses() {
        this.certificateStatusDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'certificate-status');
        const response = await service.getAll();
        this.certificateStatuses = response.data;
        runInAction(() => {
            this.certificateStatusDropdownStore.setItems(response.data);
            this.certificateStatusDropdownStore.setLoading(false);
        });
    }
}

export default BookletEditViewStore;