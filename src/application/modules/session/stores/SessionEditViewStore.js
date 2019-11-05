import { action, runInAction, observable } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { LookupService, FeeService } from 'common/services';
import { applicationContext } from 'core/utils';
import { SessionEditForm } from 'application/session/forms';
import { SessionService } from 'application/session/services';
import { CharityService } from 'application/charity/services';
import { BookletService } from 'application/booklet/services';
import { ModalParams } from 'core/models';

@applicationContext
class SessionEditViewStore extends BaseEditViewStore {
    session = null;
    @observable makeRefund = false;
    @observable makeRefundFee = false;

    constructor(rootStore) {
        const service = new SessionService(rootStore.application.baasic.apiClient);
        const id = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'session-edit',
            id: id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        return await service.update({ id: this.id, ...resource });
                    },
                    get: async (id) => {
                        let params = {
                            embed: [
                                'donation',
                                'donation.charity',
                                'sessionCertificates',
                                'sessionCertificates.certificate',
                                'sessionCertificates.certificate.certificateStatus',
                                'sessionCertificates.certificate.booklet',
                                'sessionCertificates.certificate.booklet.denominationType',
                                'sessionCertificates.certificate.booklet.bookletOrderItemBooklets',
                                'sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem',
                                'sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem.bookletOrder',
                                'sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem.bookletOrder.accountType',
                            ]
                        }
                        let response = await service.get(id, params);
                        this.session = response.data;
                        return response.data;
                    }
                }
            },
            FormClass: SessionEditForm,
        });

        this.rootStore = rootStore;
        this.id = id;
        this.removeSessionCertificateModal = new ModalParams({});
        this.service = service;
        this.bookletService = new BookletService(rootStore.application.baasic.apiClient);

        this.certificateStatusDropdownStore = new BaasicDropdownStore();

        const charityService = new CharityService(rootStore.application.baasic.apiClient);
        this.charityDropdownStore = new BaasicDropdownStore({
            placeholder: 'SESSION.EDIT.FIELDS.SELECT_CHARITY',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await charityService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses',
                            'charityAddresses.address'
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name'
                        ]
                    });
                    return _.map(response.item, x => { return { id: x.id, name: x.name } });
                }
            });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.getResource(this.id),
                this.fetchCertificateStatuses()
            ]);
        }
    }

    @action.bound
    openRemoveSessionCertificate(sessionCertificate) {
        this.removeSessionCertificateModal.open({
            sessionCertificate: sessionCertificate,
            certificateStatusDropdownStore: this.certificateStatusDropdownStore,
            onRemove: this.onRemove,
            makeRefund: this.makeRefund,
            onMakeRefundChange: (value) => { this.makeRefund = value; this.makeRefundFee = value },
            makeRefundFee: this.makeRefundFee,
            onMakeRefundFeeChange: (value) => this.makeRefundFee = value
        });
    }

    @action.bound
    async onRemove(sessionCertificate) {
        const item = {
            id: sessionCertificate.id,
            note: sessionCertificate.certificate.note,
            certificateStatusId: this.certificateStatusDropdownStore.value.id,
            isActive: sessionCertificate.certificate.isActive,
            makeRefund: this.makeRefund,
            makeRefundFee: this.makeRefundFee
        }
        const response = await this.service.removeCertificate(item);
        await this.getResource(this.id);
        this.removeSessionCertificateModal.close();
    }

    @action.bound
    async fetchCertificateStatuses() {
        this.certificateStatusDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'certificate-status');
        const response = await service.getAll();
        runInAction(() => {
            this.certificateStatusDropdownStore.setItems(response.data);
            this.certificateStatusDropdownStore.setLoading(false);
        });
    }
}

export default SessionEditViewStore;
