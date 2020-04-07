import { action, observable } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore, TableViewStore } from 'core/stores';
import { LookupService } from 'common/services';
import { applicationContext, charityFormatter } from 'core/utils';
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
                                'sessionCertificates.certificate.booklet.donorAccount',
                                'sessionCertificates.certificate.booklet.denominationType',
                                'sessionCertificates.certificate.booklet.bookletOrderItemBooklets',
                                'sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem',
                                'sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem.bookletOrder',
                                'sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem.bookletOrder.accountType',
                            ]
                        }
                        let response = await service.get(id, params);
                        this.session = response.data;
                        this.tableStore.setData(_.orderBy(response.data.sessionCertificates, sc => sc.certificate.booklet.denominationType.value, "asc"))
                        return response.data;
                    }
                }
            },
            FormClass: SessionEditForm,
        });

        this.removeSessionCertificateModal = new ModalParams({});
        this.editBlankSessionCertificateModal = new ModalParams({});
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
                            'charityAddresses'
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name',
                            'charityAddresses'
                        ]
                    });
                    return _.map(response.data.item, x => { return { id: x.id, name: charityFormatter.format(x, { value: 'charity-name-display' }), item: x } });
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
                    key: 'certificate.booklet.denominationType',
                    title: 'SESSION.EDIT.LIST.COLUMNS.DENOMINATION_LABEL',
                    format: {
                        type: 'denomination',
                        value: 'short',
                        additionalField: 'blankCertificateValue'
                    }
                },
                {
                    key: 'amountAfterDeduction',
                    title: 'SESSION.EDIT.LIST.COLUMNS.VALUE_LABEL',
                    format: {
                        type: 'currency'
                    }
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

            if (this.item && this.item.charity) {
                this.charityDropdownStore.setValue({ id: this.item.charity.id, name: charityFormatter.format(this.item.charity, { value: 'charity-name-display' }), item: this.item.charity })
            }

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
            onAfterAction: () => {
                this.removeSessionCertificateModal.close();
                this.getResource(this.id);
            }
        });
    }

    @action.bound
    openEditBlankSessionCertificateModal(sessionCertificate) {
        this.editBlankSessionCertificateModal.open({
            sessionCertificate: sessionCertificate,
            onAfterAction: () => {
                this.editBlankSessionCertificateModal.close();
                this.getResource(this.id, false);
            }
        });
    }
}

export default SessionEditViewStore;
