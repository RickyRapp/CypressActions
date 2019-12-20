import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { DonorAccountPhoneNumberService } from 'application/donor-account/services';
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
                this.phoneNumberService = new DonorAccountPhoneNumberService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.donorAccountId = donorAccountId;
                        params.orderBy = 'isPrimary';
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
                    key: 'isPrimary',
                    title: 'PHONE_NUMBER.LIST.COLUMNS.PRIMARY_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                }
            ],
            actions: {
                onEdit: (phoneNumber) => this.openPhoneNumberModal(phoneNumber),
                onDelete: (phoneNumber) => this.deletePhoneNumber(phoneNumber),
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
    async updatePhoneNumberAsync(entity, message) {
        try {
            await this.phoneNumberService.update(entity);
            this.rootStore.notificationStore.success(message ? message : 'EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
            this.phoneNumberModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
    }

    @action.bound
    async createPhoneNumberAsync(entity) {
        try {
            await this.phoneNumberService.create({
                donorAccountId: this.donorAccountId,
                ...entity
            });

            this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
            this.phoneNumberModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
    }

    @action.bound
    async markPrimary(phoneNumber) {
        this.loaderStore.suspend();
        phoneNumber.isPrimary = true;
        await this.updatePhoneNumberAsync(phoneNumber);
        this.loaderStore.resume();
    }

    @action.bound
    async deletePhoneNumber(phoneNumber) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to delete phone number?`,
            async () => {
                phoneNumber.isDeleted = true;
                await this.updatePhoneNumberAsync(phoneNumber, 'EDIT_FORM_LAYOUT.SUCCESS_DELETE');
            }
        );
    }
}

export default DonorAccountPhoneNumberViewStore;
