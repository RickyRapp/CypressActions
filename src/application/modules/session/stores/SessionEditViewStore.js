import { action, observable } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore, TableViewStore } from 'core/stores';
import { LookupService } from 'common/services';
import { applicationContext } from 'core/utils';
import { SessionEditForm } from 'application/session/forms';
import { SessionService } from 'application/session/services';
import { CharityService } from 'application/charity/services';
import { BookletService } from 'application/booklet/services';
import { ModalParams } from 'core/models';
import _ from 'lodash';

@applicationContext
class SessionEditViewStore extends BaseEditViewStore {
    session = null;
    @observable makeRefund = false;
    @observable makeRefundFee = false;
    @observable maxAmountError = false;

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
                        resource.charityId = resource.charity;
                        return await service.update({ id: this.id, ...resource });
                    },
                    get: async (id) => {
                        let params = {
                            embed: [
                                'donationStatus',
                                'charity',
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
                        if (response.data) {
                            response.data.charity = response.data.charity;
                        }
                        this.tableStore.setData(response.data.sessionCertificates)
                        return response.data;
                    }
                }
            },
            FormClass: SessionEditForm,
        });

        this.rootStore = rootStore;
        this.id = id;
        this.removeSessionCertificateModal = new ModalParams({});
        this.editBlankSessionCertificateModal = new ModalParams({});
        this.service = service;
        this.bookletService = new BookletService(rootStore.application.baasic.apiClient);

        this.certificateStatusDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                const service = new LookupService(this.rootStore.application.baasic.apiClient, 'certificate-status');
                const response = await service.getAll();
                return response.data;
            }
        });

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

        this.tableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'code',
                    title: 'SESSION.EDIT.LIST.COLUMNS.CODE_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => { return `${item.certificate.booklet.code}-${item.certificate.code}`; }
                    }
                },
                {
                    key: 'certificate.barcode',
                    title: 'SESSION.EDIT.LIST.COLUMNS.BARCODE_LABEL',
                },
                {
                    key: 'value',
                    title: 'SESSION.EDIT.LIST.COLUMNS.DENOMINATION_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            const value = item.certificate.booklet.denominationType.abrv === 'blank' ? '$' + item.blankCertificateValue : '$' + item.certificate.booklet.denominationType.value;
                            if (item.certificate.booklet.denominationType.abrv === 'blank') {
                                return `${value} (${item.certificate.booklet.denominationType.name})`;
                            }
                            return value;
                        }
                    }
                },
                {
                    key: 'deductionAmount',
                    title: 'SESSION.EDIT.LIST.COLUMNS.VALUE_LABEL'
                }
            ],
            actions: {
                onRemove: (sessionCertificate) => this.openRemoveSessionCertificate(sessionCertificate),
                onEdit: (sessionCertificate) => this.openEditBlankSessionCertificateModal(sessionCertificate)
            },
            actionsRender: {
                onEditRender: (sessionCertificate) => {
                    return sessionCertificate.certificate.booklet.denominationType.abrv === 'blank';
                },
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
                this.getResource(this.id)
            ]);

            if (this.session.donationStatus.abrv !== 'pending') {
                await this.rootStore.routerStore.goBack();
                this.rootStore.notificationStore.warning('SESSION.EDIT.NOT_IN_STATUS_FOR_EDIT_WARNING');
            }
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
        await this.service.removeCertificate(item);
        await this.getResource(this.id);
        this.removeSessionCertificateModal.close();
    }

    @action.bound
    openEditBlankSessionCertificateModal(sessionCertificate) {
        this.editBlankSessionCertificateModal.open({
            sessionCertificate: sessionCertificate,
            onSubmit: this.onSubmit
        });
    }

    @action.bound
    async onSubmit(data) {
        const item = {
            id: data.id,
            certificateValue: data.certificateValue
        }
        try {
            await this.service.updateBlankCertificate(item);
            await this.getResource(this.id);
            this.editBlankSessionCertificateModal.close();
        } catch (err) {
            if (err.data) {
                if (err.data.statusCode === 4000000009) {
                    this.maxAmountError = true;
                    this.rootStore.notificationStore.error('SESSION.EDIT.INSUFFICIENT_FUNDS_ERROR', err);
                }
            }
            else {
                this.rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_UPDATE');
            }
        }
    }
}

export default SessionEditViewStore;
