import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { PhoneNumberService } from 'common/services';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';
import { CharityPhoneNumberEditForm } from 'application/charity/forms';

@applicationContext
class CharityPhoneNumberViewStore extends BaseListViewStore {
    phoneNumberService = null;

    formPhoneNumber = new CharityPhoneNumberEditForm({
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
        const charityId = rootStore.routerStore.routerState.params.id;
        super(rootStore, {
            name: 'charity-phone-numbers',
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
                        params.embed = ['charityPhoneNumbers'];
                        params.charityId = charityId;
                        params.orderBy = 'charityPhoneNumbers.primary';
                        params.orderDirection = 'desc';
                        const response = await this.phoneNumberService.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.charityId = charityId;
        this.phoneNumberModal = new ModalParams({});

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'number',
                    title: 'PHONE_NUMBER.LIST.COLUMNS.NUMBER_LABEL',
                    onClick: (phoneNumber) => this.routes.edit(phoneNumber.id),
                    authorization: this.authorization.update
                },
                {
                    key: 'charityPhoneNumbers[0].primary',
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
            await this.phoneNumberService.createCharityPhoneNumber({
                charityId: this.charityId,
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

export default CharityPhoneNumberViewStore;
