import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { DonorAccountAddressService } from 'application/donor-account/services';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';
import { DonorAccountAddressEditForm } from 'application/donor-account/forms';

@applicationContext
class DonorAccountAddressViewStore extends BaseListViewStore {
    addressService = null;

    formAddress = new DonorAccountAddressEditForm({
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
        const donorAccountId = rootStore.routerStore.routerState.params.id;
        super(rootStore, {
            name: 'donor-account-addresses',
            authorization: 'theDonorsFundContactInfoSection',
            routes: {
            },
            queryConfig: {
                filter: new FilterParams(),
                disableUpdateQueryParams: true
            },
            actions: () => {
                this.addressService = new DonorAccountAddressService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.donorAccountId = donorAccountId;
                        params.orderBy = 'primary';
                        params.orderDirection = 'desc';
                        const response = await this.addressService.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.donorAccountId = donorAccountId;
        this.addressModal = new ModalParams({});

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'addressLine1',
                    title: 'ADDRESS.LIST.COLUMNS.ADDRESS_LINE_1_LABEL',
                    onClick: (address) => this.openAddressModal(address),
                    authorization: this.authorization.update
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
            disablePaging: true
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
            await this.addressService.update(entity);
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
            await this.addressService.create({
                donorAccountId: this.donorAccountId,
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

export default DonorAccountAddressViewStore;
