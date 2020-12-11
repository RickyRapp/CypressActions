import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';
import { DonorAddressEditForm } from 'application/administration/donor/forms';

@applicationContext
class DonorAddressViewStore extends BaseListViewStore {
    addressService = null;

    formAddress = new DonorAddressEditForm({
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

    constructor(rootStore) {
        super(rootStore, {
            name: 'donor-addresses',
            routes: {},
            queryConfig: {
                filter: new FilterParams(),
                disableUpdateQueryParams: true
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.donorId = this.donorId;
                        params.orderBy = 'isPrimary';
                        params.orderDirection = 'desc';
                        return rootStore.application.administration.donorStore.findAddress(params);
                    }
                }
            }
        });

        this.donorId = rootStore.routerStore.routerState.params.id;
        this.addressModal = new ModalParams({});

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
                onDelete: (address) => this.deleteAddress(address),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            disablePaging: true,
            disableSorting: true
        }));
    }

    @action.bound
    openAddressModal(address) {
        this.formAddress.clear();
        if (address) {
            this.formAddress.update(address);
        }
        this.addressModal.open({
            formAddress: this.formAddress
        });
    }

    @action.bound
    async updateAddressAsync(entity, message) {
        try {
            await this.rootStore.application.administration.donorStore.updateAddress(entity);
            this.rootStore.notificationStore.success(message ? message : 'EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
            this.addressModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
    }

    @action.bound
    async createAddressAsync(entity) {
        try {
            await this.rootStore.application.administration.donorStore.createAddress({
                donorId: this.donorId,
                ...entity
            });

            this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
            this.addressModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
    }

    @action.bound
    async markPrimary(address) {
        this.loaderStore.suspend();
        address.isPrimary = true;
        await this.updateAddressAsync(address);
        this.loaderStore.resume();
    }

    @action.bound
    async deleteAddress(address) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to delete address?`,
            async () => {
                address.isDeleted = true;
                await this.updateAddressAsync(address, 'EDIT_FORM_LAYOUT.SUCCESS_DELETE');
            }
        );
    }
}

export default DonorAddressViewStore;
