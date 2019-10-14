import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { EmailAddressService } from 'common/services';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';
import { CharityEmailAddressEditForm } from 'application/charity/forms';

@applicationContext
class CharityEmailAddressViewStore extends BaseListViewStore {
    emailAddressService = null;

    formEmailAddress = new CharityEmailAddressEditForm({
        onSuccess: async form => {
            const { id, email, description } = form.values();

            if (id) {
                await this.updateEmailAddressAsync({ id, email, description });
            }
            else {
                await this.createEmailAddressAsync({ email, description });
            }
        }
    });

    constructor(rootStore) {
        const charityId = rootStore.routerStore.routerState.params.id;
        super(rootStore, {
            name: 'charity-email-addresses',
            routes: {
            },
            queryConfig: {
                filter: new FilterParams(),
                disableUpdateQueryParams: true
            },
            actions: () => {
                this.emailAddressService = new EmailAddressService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = ['charityEmailAddresses'];
                        params.charityId = charityId;
                        params.orderBy = 'charityEmailAddresses.primary';
                        params.orderDirection = 'desc';
                        const response = await this.emailAddressService.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.charityId = charityId;
        this.emailAddressModal = new ModalParams({});

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'email',
                    title: 'EMAIL_ADDRESS.LIST.COLUMNS.EMAIL_LABEL',
                    onClick: (emailAddress) => this.routes.edit(emailAddress.id),
                    authorization: this.authorization.update
                },
                {
                    key: 'charityEmailAddresses[0].primary',
                    title: 'EMAIL_ADDRESS.LIST.COLUMNS.PRIMARY_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                }
            ],
            actions: {
                onEdit: (emailAddress) => this.openEmailAddressModal(emailAddress),
                onMarkPrimary: (emailAddress) => this.markPrimary(emailAddress),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            disablePaging: true
        }));
    }

    @action.bound
    openEmailAddressModal(emailAddress) {
        if (emailAddress) {
            this.formEmailAddress.update(emailAddress);
        }
        this.emailAddressModal.open({
            formEmailAddress: this.formEmailAddress
        });
    }

    @action.bound
    async updateEmailAddressAsync(entity) {
        try {
            await this.emailAddressService.update(entity);

            this.rootStore.notificationStore.success('Resource updated');
            this.emailAddressModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error(err.data.message, err);
        }
    }

    @action.bound
    async createEmailAddressAsync(entity) {
        try {
            await this.emailAddressService.createCharityEmailAddress({
                charityId: this.charityId,
                ...entity
            });

            this.rootStore.notificationStore.success('Resource created');
            this.emailAddressModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error(err.data.message, err);
        }
    }

    @action.bound
    async markPrimary(emailAddress) {
        this.loaderStore.suspend();
        await this.emailAddressService.markPrimary(emailAddress);
        this.rootStore.notificationStore.success('Successfully marked primary');
        await this.queryUtility.fetch();
        this.loaderStore.resume();
    }
}

export default CharityEmailAddressViewStore;
