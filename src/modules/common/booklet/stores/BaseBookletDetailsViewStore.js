import { action, observable, computed } from 'mobx';
import { BookletService, CertificateService, LookupService } from "common/data";
import { BaseViewStore, BaasicDropdownStore } from "core/stores";
import { BookletUpdateForm } from "modules/administration/booklet/forms";
import { ModalParams } from 'core/models';
import _ from 'lodash';

class BookletDetailsViewStore extends BaseViewStore {
    @observable bookletStatuses = null;
    @observable booklet = null;
    @observable denominationTypes = null;
    @observable certificateStatuses = null;
    @observable certificateStatusDropdownStore = null;

    fields = [
        'id',
        'dateCreated',
        'dateAssigned',
        'bookletStatus',
        'bookletStatus.name',
        'bookletStatus.abrv',
        'denominationType',
        'denominationType.name',
        'denominationType.value',
        'denominationType.certificateAmount',
        'denominationType.available',
        'code',
        'donorAccountId',
        'donorAccount',
        'donorAccount.donorName',
        'createdByCoreUser',
        'createdByCoreUser.firstName',
        'createdByCoreUser.lastName',
        'certificates',
        'certificates.id',
        'certificates.code',
        'certificates.certificateStatus',
        'certificates.certificateStatus.id',
        'certificates.certificateStatus.name',
        'certificates.certificateStatus.abrv',
        'certificates.barcode',
        'certificates.note',
        'certificates.isActive',
        'bookletOrderItemBooklets',
        'bookletOrderItemBooklets.bookletOrderItem',
        'bookletOrderItemBooklets.bookletOrderItem.id',
        'bookletOrderItemBooklets.bookletOrderItem.bookletOrder',
        'bookletOrderItemBooklets.bookletOrderItem.bookletOrder.deduction',
        'bookletOrderItemBooklets.bookletOrderItem.bookletOrder.feeCharge',
        'bookletOrderItemBooklets.bookletOrderItem.bookletOrder.accountType',
        'bookletOrderItemBooklets.bookletOrderItem.bookletOrder.accountType.name',
        'bookletOrderItemBooklets.bookletOrderItem.bookletOrder.accountType.abrv',
    ]

    constructor(rootStore, { id }) {
        super(rootStore);

        this.id = id;
        this.rootStore = rootStore;
        this.bookletService = new BookletService(rootStore.app.baasic.apiClient);
        this.certificateService = new CertificateService(rootStore.app.baasic.apiClient);
        this.bookletStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'booklet-status');
        this.certificateStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'certificate-status');
        this.denominationTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'denomination-type');
        this.accountTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'account-type');

        this.load();
    }

    @action.bound async load() {
        this.loaderStore.suspend();
        await this.loadLookups();
        await this.setStores();

        await this.getResource();

        this.form = new BookletUpdateForm({
            onSuccess: async form => {
                const item = form.values();
                var response = await this.certificateService.update(item);
                this.rootStore.notificationStore.showMessageFromResponse(response);

            },
            onError(form) {
                alert('### see console');
                console.log('Form Errors', form.errors());
                console.log('Form Values', form.values());
            },
        });

        this.loaderStore.resume();
    }

    @action.bound async getResource() {
        let params = {};
        params.embed = [
            'bookletOrderItemBooklets',
            'bookletOrderItemBooklets.bookletOrderItem',
            'bookletOrderItemBooklets.bookletOrderItem.bookletOrder',
            'bookletOrderItemBooklets.bookletOrderItem.bookletOrder.accountType',
            'certificates',
            'certificates.certificateStatus',
            'denominationType',
            'donorAccount',
            'donorAccount.coreUser',
            'donorAccount.companyProfile',
            'createdByCoreUser'
        ];
        params.fields = this.fields;

        this.booklet = await this.bookletService.get(this.id, params);
    }

    @action.bound async saveRowChanges(item) {
        item.bookletId = this.booklet.id;
        this.form.update(item);
        await this.form.submit();
    }

    @action.bound async loadLookups() {
        let denominationTypesModels = await this.denominationTypeLookupService.getAll();
        this.denominationTypes = _.orderBy(denominationTypesModels.data, ['sortOrder'], ['asc']);

        const bookletStatusModels = await this.bookletStatusLookup.getAll();
        this.bookletStatuses = _.orderBy(bookletStatusModels.data, ['sortOrder'], ['asc']);

        const accountTypeModels = await this.accountTypeLookupService.getAll();
        this.accountTypes = _.orderBy(accountTypeModels.data, ['sortOrder'], ['asc']);

        const certificateStatusModels = await this.certificateStatusLookup.getAll();
        this.certificateStatuses = _.orderBy(certificateStatusModels.data, ['sortOrder'], ['asc']);
    }

    @action.bound async setStores() {
        this.certificateStatusDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
            },
            _.map(_.filter(this.certificateStatuses, function (item) { return item.abrv !== 'used' }), item => { return { id: item.id, name: item.name, abrv: item.abrv } })
        );
    }

    @action.bound async isActiveConfirm(active) {
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

    @action.bound async certificateStatusIdConfirm(statusId) {
        this.rootStore.modalStore.showConfirm(
            `Are You Sure You Want To Set Status ${_.find(this.certificateStatuses, { id: statusId }).name} For All Certificates In This Booklet?`,
            async () => {
                this.loaderStore.suspend();
                await this.saveRowChanges({
                    bookletId: this.booklet.id,
                    id: '',
                    isActive: '',
                    certificateStatusId: statusId,
                    note: ''
                });

                await this.getResource();
                this.loaderStore.resume();
            }
        );
    }

    @computed get usedCertificateStatusId() {
        return this.certificateStatuses ? _.find(this.certificateStatuses, { abrv: 'used' }).id : null;
    }

    @computed get cleanCertificateStatusId() {
        return this.certificateStatuses ? _.find(this.certificateStatuses, { abrv: 'clean' }).id : null;
    }

    @computed get canceledCertificateStatusId() {
        return this.certificateStatuses ? _.find(this.certificateStatuses, { abrv: 'canceled' }).id : null;
    }
}

export default BookletDetailsViewStore;