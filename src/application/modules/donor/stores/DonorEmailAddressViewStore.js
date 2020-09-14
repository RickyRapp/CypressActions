import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { DonorEmailAddressService } from 'application/donor/services';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';
import { DonorEmailAddressEditForm } from 'application/donor/forms';

@applicationContext
class DonorEmailAddressViewStore extends BaseListViewStore {
    emailAddressService = null;

    formEmailAddress = new DonorEmailAddressEditForm({
        onSuccess: async form => {
            const { id, email, description, isNotifyEnabled } = form.values();

            if (id) {
                await this.updateEmailAddressAsync({ id, email, description, isNotifyEnabled });
            }
            else {
                await this.createEmailAddressAsync({ email, description, isNotifyEnabled });
            }
        }
    });

    constructor(rootStore, donorId) {
        super(rootStore, {
            name: 'donor-email-addresses',
            authorization: 'theDonorsFundContactInfoSection',
            routes: {
            },
            queryConfig: {
                filter: new FilterParams(),
                disableUpdateQueryParams: true
            },
            actions: () => {
                this.emailAddressService = new DonorEmailAddressService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.donorId = donorId;
                        params.orderBy = 'isPrimary';
                        params.orderDirection = 'desc';
                        const response = await this.emailAddressService.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.donorId = donorId;
        this.emailAddressModal = new ModalParams({});

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'email',
                    title: 'EMAIL_ADDRESS.LIST.COLUMNS.EMAIL_LABEL',
                    onClick: (emailAddress) => this.openEmailAddressModal(emailAddress),
                    authorization: this.authorization.update
                },
                {
                    key: 'isPrimary',
                    title: 'EMAIL_ADDRESS.LIST.COLUMNS.PRIMARY_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                },
                {
                    key: 'isNotifyEnabled',
                    title: 'EMAIL_ADDRESS.LIST.COLUMNS.NOTIFY_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                }
            ],
            actions: {
                onEdit: (emailAddress) => this.openEmailAddressModal(emailAddress),
                onMarkPrimary: (emailAddress) => this.markPrimary(emailAddress),
                onDelete: (emailAddress) => this.deleteAddress(emailAddress),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            disablePaging: true,
            disableSorting: true
        }));
    }

    @action.bound
    openEmailAddressModal(emailAddress) {
        this.formEmailAddress.clear();
        if (emailAddress) {
            this.formEmailAddress.update(emailAddress);
        }
        this.emailAddressModal.open({
            formEmailAddress: this.formEmailAddress
        });
    }

    @action.bound
    async updateEmailAddressAsync(entity, message) {
        try {
            await this.emailAddressService.update(entity);

            this.rootStore.notificationStore.success(message ? message : 'EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
            this.emailAddressModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
    }

    @action.bound
    async createEmailAddressAsync(entity) {
        try {
            await this.emailAddressService.create({
                donorId: this.donorId,
                ...entity
            });

            this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
            this.emailAddressModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
    }

    @action.bound
    async markPrimary(emailAddress) {
        this.loaderStore.suspend();
        emailAddress.isPrimary = true;
        await this.updateEmailAddressAsync(emailAddress);
        this.loaderStore.resume();
    }

    @action.bound
    async deleteAddress(emailAddress) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to delete email address?`,
            async () => {
                emailAddress.isDeleted = true;
                await this.updateEmailAddressAsync(emailAddress, 'EDIT_FORM_LAYOUT.SUCCESS_DELETE');
            }
        );
    }
}

export default DonorEmailAddressViewStore;
