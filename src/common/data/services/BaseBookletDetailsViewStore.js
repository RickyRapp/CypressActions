import { action, observable } from 'mobx';
import { BookletService, CertificateService, LookupService } from "common/data";
import { BaseViewStore } from "core/stores";
import { BookletUpdateForm } from "modules/administration/booklet/forms";
import _ from 'lodash';

class BookletDetailsViewStore extends BaseViewStore {
    @observable bookletStatuses = null;
    @observable booklet = null;
    @observable denominationTypes = null;
    @observable certificateStatuses = null;

    fields = [
        'id',
        'dateCreated',
        'dateAssigned',
        'bookletStatusId',
        'denominationTypeId',
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
        'certificates.certificateStatusId',
        'certificates.barcode',
        'certificates.note',
        'certificates.isActive',
        'bookletOrderItemBooklets',
        'bookletOrderItemBooklets',
        'bookletOrderItemBooklets.bookletOrderItem',
        'bookletOrderItemBooklets.bookletOrderItem.id',
        'bookletOrderItemBooklets.bookletOrderItem.bookletOrder',
        'bookletOrderItemBooklets.bookletOrderItem.bookletOrder.deduction',
        'bookletOrderItemBooklets.bookletOrderItem.bookletOrder.feeCharge',
        'bookletOrderItemBooklets.bookletOrderItem.bookletOrder.accountTypeId',
    ]

    constructor(rootStore, { id }) {
        super(rootStore);

        this.id = id;
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

        let params = {};
        params.embed = [
            'bookletOrderItemBooklets',
            'bookletOrderItemBooklets.bookletOrderItem',
            'bookletOrderItemBooklets.bookletOrderItem.bookletOrder',
            'certificates',
            'donorAccount',
            'donorAccount.coreUser',
            'donorAccount.companyProfile',
            'createdByCoreUser'
        ];
        params.fields = this.fields;
        this.booklet = await this.bookletService.get(this.id, params);

        let certificates = [];
        const bookletId = this.booklet.id;
        _.forEach(this.booklet.ceritifcates, function (item) {
            certificates.push({
                id: item.id,
                bookletId: bookletId,
                isActive: item.isActive,
                certificateStatusId: item.certificateStatusId,
                note: item.note
            });
        });

        this.form = new BookletUpdateForm({
            onSuccess: form => {
                const item = form.values();
                return this.certificateService.update(item);
            },
            onError(form) {
                alert('### see console');
                console.log('Form Errors', form.errors());
                console.log('Form Values', form.values());
            },
        });

        this.form.update(certificates);

        this.loaderStore.resume();
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
}

export default BookletDetailsViewStore;