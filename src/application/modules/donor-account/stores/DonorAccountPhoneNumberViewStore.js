import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { PhoneNumberService } from 'common/services';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';
import { DonorAccountPhoneNumberEditForm } from 'application/donor-account/forms';

@applicationContext
class DonorAccountPhoneNumberViewStore extends BaseListViewStore {
    phoneNumberService = null;

    formPhoneNumber = new DonorAccountPhoneNumberEditForm({
        onSuccess: async form => {
            const { id, number, description } = form.values();

            if (id) {
                await this.updatePhoneNumberAsync({ id, number, description });
            }
            else {
                await this.createPhoneNumberAsync({ number, description });
            }
        }
    });

    constructor(rootStore) {
        const donorAccountId = rootStore.routerStore.routerState.params.id;
        super(rootStore, {
            name: 'donor-account-phone-numbers',
            authorization: 'theDonorsFundContactInfoSection',
            routes: {
            },
            queryConfig: {
                filter: new FilterParams(),
                disableUpdateQueryParams: true
            },
            actions: () => {
                this.phoneNumberService = new PhoneNumberService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = ['donorAccountPhoneNumbers'];
                        params.donorAccountId = donorAccountId;
                        params.orderBy = 'donorAccountPhoneNumbers.primary';
                        params.orderDirection = 'desc';
                        const response = await this.phoneNumberService.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.donorAccountId = donorAccountId;
        this.phoneNumberModal = new ModalParams({});

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'number',
                    title: 'PHONE_NUMBER.LIST.COLUMNS.NUMBER_LABEL',
                    onClick: (phoneNumber) => this.openPhoneNumberModal(phoneNumber),
                    authorization: this.authorization.update,
                    format: {
                        type: 'phone-number'
                    }
                },
                {
                    key: 'donorAccountPhoneNumbers[0].primary',
                    title: 'PHONE_NUMBER.LIST.COLUMNS.PRIMARY_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                }
            ],
            actions: {
                onEdit: (phoneNumber) => this.openPhoneNumberModal(phoneNumber),
                onMarkPrimary: (phoneNumber) => this.markPrimary(phoneNumber),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            disablePaging: true
        }));
    }

    @action.bound
    openPhoneNumberModal(phoneNumber) {
        this.formPhoneNumber.clear();
        if (phoneNumber) {
            this.formPhoneNumber.update(phoneNumber);
        }
        this.phoneNumberModal.open({
            formPhoneNumber: this.formPhoneNumber
        });
    }

    @action.bound
    async updatePhoneNumberAsync(entity) {
        try {
            await this.phoneNumberService.update(entity);

            this.rootStore.notificationStore.success('Resource updated');
            this.phoneNumberModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error(err.data.message, err);
        }
    }

    @action.bound
    async createPhoneNumberAsync(entity) {
        try {
            await this.phoneNumberService.createDonorAccountPhoneNumber({
                donorAccountId: this.donorAccountId,
                ...entity
            });

            this.rootStore.notificationStore.success('Resource created');
            this.phoneNumberModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error(err.data.message, err);
        }
    }

    @action.bound
    async markPrimary(phoneNumber) {
        this.loaderStore.suspend();
        await this.phoneNumberService.markPrimary(phoneNumber);
        this.rootStore.notificationStore.success('Successfully marked primary');
        await this.queryUtility.fetch();
        this.loaderStore.resume();
    }
}

export default DonorAccountPhoneNumberViewStore;
