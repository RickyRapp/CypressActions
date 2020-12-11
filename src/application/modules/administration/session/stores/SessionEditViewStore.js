import { action, observable } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore, TableViewStore } from 'core/stores';
import { applicationContext, charityFormatter } from 'core/utils';
import { SessionEditForm } from 'application/administration/session/forms';
import { ModalParams } from 'core/models';
import _ from 'lodash';

@applicationContext
class SessionEditViewStore extends BaseEditViewStore {
    session = null;
    @observable makeRefund = false;
    @observable makeRefundFee = false;
    @observable maxAmountError = false;

    constructor(rootStore) {
        super(rootStore, {
            name: 'session-edit',
            id: rootStore.routerStore.routerState.params.id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        await rootStore.application.session.sessionStore.update(resource);
                    },
                    get: async (id) => {
                        let params = {
                            embed: [
                                'charity',
                                'grants',
                                'grants.certificate',
                                'grants.certificate.denominationType',
                                'grants.certificate.certificateStatus',
                                'grants.certificate.booklet',
                                'grants.certificate.booklet.donor',
                                'grants.certificate.booklet.bookletOrder'
                            ]
                        }
                        this.session = await this.rootStore.application.session.sessionStore.getSession(id, params);
                        this.tableStore.setData(_.orderBy(this.session.grants, g => g.certificate.denominationType.value, "asc"));
                        if (!this.tableStore.dataInitialized) {
                            this.tableStore.dataInitialized = true;
                        }
                        return this.session;
                    }
                }
            },
            FormClass: SessionEditForm,
        });

        this.createTableStore();
        this.createCharityDropdownStore();
        this.createCertificateStatusDropdownStore();

        this.removeSessionCertificateModal = new ModalParams({});
        this.editBlankSessionCertificateModal = new ModalParams({});
        this.advancedSearchModal = new ModalParams({});
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
                this.charityDropdownStore.setValue({
                    id: this.item.charity.id,
                    name: charityFormatter.format(this.item.charity, { value: 'charity-name-display' }), item: this.item.charity
                })
            }
        }
    }

    @action.bound
    openAdvancedSearchModal() {
        this.advancedSearchModal.open();
    }

    @action.bound
    onCharitySelected(item) {
        this.charityDropdownStore.setValue({ id: item.id, name: charityFormatter.format(item, { value: 'charity-name-display' }), item: item });
        this.form.$('charityId').set(item.id);
        this.advancedSearchModal.close();
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

    createTableStore() {
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
                    key: 'certificate.denominationType',
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
                    return sessionCertificate.certificate.denominationType.abrv === 'blank';
                },
            }
        });
    }

    createCharityDropdownStore() {
        this.charityDropdownStore = new BaasicDropdownStore({
            placeholder: 'SESSION.EDIT.FIELDS.SELECT_CHARITY',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.session.sessionStore.searchCharity({
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
                    return _.map(data.item, x => { return { id: x.id, name: charityFormatter.format(x, { value: 'charity-name-display' }), item: x } });
                }
            });
    }

    createCertificateStatusDropdownStore() {
        this.certificateStatusDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return this.rootStore.application.lookup.certificateStatusStore.find();
            }
        });
    }
}

export default SessionEditViewStore;
