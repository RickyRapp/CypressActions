import { action, observable } from 'mobx';
import { BookletEditForm } from 'application/booklet/forms';
import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

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
            const data = await this.rootStore.application.booklet.bookletStore.updateCertificate(item);
            this.rootStore.notificationStore.success((data && data.message) ? data.message : 'EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
            this.loaderStore.resume();
            return data;
        }
    });

    constructor(rootStore) {
        super(rootStore);
        this.id = rootStore.routerStore.routerState.params.id;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.loadLookups(),
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
                'bookletOrder.donor',
                'certificates',
                'certificates.certificateStatus',
                'certificates.denominationType',
                'bookletType'
            ]
        }
        this.booklet = await this.rootStore.application.booklet.bookletStore.get(this.id, params);
    }

    @action.bound
    async saveRowChanges(item) {
        item.bookletId = this.booklet.id;
        this.form.update(item);
        this.form.submit();
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

                await this.getResource();
                this.loaderStore.resume();
            }
        );
    }

    async changeCertificatesStatus(status) {
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
                await this.getResource();
                this.loaderStore.resume();
            }
        );
    }

    @action.bound
    async onSetCleanStatusClick() {
        const status = this.certificateStatuses.find(c => c.abrv === 'clean');
        await this.changeCertificatesStatus(status);
    }

    async loadLookups() {
        this.certificateStatuses = await this.rootStore.application.lookup.certificateStatusStore.find();
    }
}

export default BookletEditViewStore;