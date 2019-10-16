import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { AddressService } from 'common/services';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';
import { CharityAddressEditForm } from 'application/charity/forms';

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

    constructor(rootStore) {
        const charityId = rootStore.routerStore.routerState.params.id;
        super(rootStore, {
            name: 'charity-addresses',
            routes: {
            },
            queryConfig: {
                filter: new FilterParams(),
                disableUpdateQueryParams: true
            },
            actions: () => {
                this.addressService = new AddressService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = ['charityAddresses'];
                        params.charityId = charityId;
                        params.orderBy = 'charityAddresses.primary';
                        params.orderDirection = 'desc';
                        const response = await this.addressService.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.charityId = charityId;
        this.addressModal = new ModalParams({});

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'addressLine1',
                    title: 'ADDRESS.LIST.COLUMNS.ADDRESS_LINE_1_LABEL',
                    onClick: (address) => this.routes.edit(address.id),
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
                    key: 'charityAddresses[0].primary',
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
            await this.addressService.update(entity);

            this.rootStore.notificationStore.success('Resource updated');
            this.addressModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error(err.data.message, err);
        }
    }

    @action.bound
    async createAddressAsync(entity) {
        try {
            await this.addressService.createCharityAddress({
                charityId: this.charityId,
                ...entity
            });

            this.rootStore.notificationStore.success('Resource created');
            this.addressModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error(err.data.message, err);
        }
    }

    @action.bound
    async markPrimary(address) {
        this.loaderStore.suspend();
        await this.addressService.markPrimary(address);
        this.rootStore.notificationStore.success('Successfully marked primary');
        await this.queryUtility.fetch();
        this.loaderStore.resume();
    }
}

export default CharityAddressViewStore;
