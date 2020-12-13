import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { CharityAddressService } from 'application/administration/charity/services';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';
import { CharityAddressEditForm } from 'application/administration/charity/forms';

@applicationContext
class CharityAddressViewStore extends BaseListViewStore {
    addressService = null;

    formAddress = new CharityAddressEditForm({
        onSuccess: async form => {
            const address = form.values();

            if (address.id) {
                await this.updateAddressAsync(address);
            }
            else {
                await this.createAddressAsync(address);
            }
        }
    });

    constructor(rootStore, props) {
        super(rootStore, {
            name: 'charity-addresses',
            routes: {
            },
            queryConfig: {
                filter: new FilterParams(),
                disableUpdateQueryParams: true
            },
            actions: () => {
                this.addressService = new CharityAddressService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.charityId = this.charityId;
                        params.orderBy = 'isPrimary';
                        params.orderDirection = 'desc';
                        return rootStore.application.administration.charityStore.findAddress(params);
                    }
                }
            }
        });

        this.charityId = rootStore.routerStore.routerState.params.id;
        this.createTableStore();
        this.addressModal = new ModalParams({});
    }

    @action.bound
    openAddressModal(address) {
        if (address) {
            this.formAddress.update(address);
        }
        else {
            this.formAddress.clear();
        }
        this.addressModal.open({
            formAddress: this.formAddress
        });
    }

    @action.bound
    async updateAddressAsync(entity) {
        try {
            await this.rootStore.application.administration.charityStore.updateAddress(entity);

            this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
            this.addressModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error('Error', err);
        }
    }

    @action.bound
    async createAddressAsync(entity) {
        try {
            await this.rootStore.application.administration.charityStore.createAddress({
                charityId: this.charityId,
                ...entity
            });

            this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
            this.addressModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error('Error', err);
        }
    }

    @action.bound
    async markPrimary(address) {
        this.loaderStore.suspend();
        address.isPrimary = true;
        await this.updateAddressAsync(address);
        this.loaderStore.resume();
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'addressLine1',
                    title: 'ADDRESS.LIST.COLUMNS.ADDRESS_LINE_1_LABEL',
                    onClick: (address) => this.openAddressModal(address)
                },
                {
                    key: 'addressLine2',
                    title: 'ADDRESS.LIST.COLUMNS.ADDRESS_LINE_2_LABEL',
                },
                {
                    key: 'city',
                    title: 'ADDRESS.LIST.COLUMNS.CITY_LABEL',
                },
                {
                    key: 'state',
                    title: 'ADDRESS.LIST.COLUMNS.STATE_LABEL',
                },
                {
                    key: 'zipCode',
                    title: 'ADDRESS.LIST.COLUMNS.ZIP_CODE_LABEL',
                },
                {
                    key: 'isPrimary',
                    title: 'ADDRESS.LIST.COLUMNS.PRIMARY_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                }
            ],
            actions: {
                onEdit: (address) => this.openAddressModal(address),
                onMarkPrimary: (address) => this.markPrimary(address),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            disablePaging: true
        }));
    }
}

export default CharityAddressViewStore;
