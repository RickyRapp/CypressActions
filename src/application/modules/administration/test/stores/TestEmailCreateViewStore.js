import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { TestEmailCreateForm } from 'application/administration/test/forms';
import { AdministrationService } from 'application/administration/test/services';
import { observable } from 'mobx';
import { LookupService } from 'common/services';
import _ from 'lodash'

class TestEmailCreateViewStore extends BaseEditViewStore {
    @observable needName = false;
    @observable needAmount = false;
    @observable needPaymentType = false;
    @observable needAccountType = false;
    @observable needDeliveryMethodType = false;
    @observable needConfirmationNumber = false;

    constructor(rootStore, item, onAfterAction) {
        super(rootStore, {
            name: 'test-email',
            actions: () => {
                return {
                    create: async (resource) => {
                        const service = new AdministrationService(rootStore.application.baasic.apiClient);
                        await service.sendEmail({ template: item.abrv, ...resource });
                    }
                }
            },
            onAfterAction: onAfterAction,
            FormClass: TestEmailCreateForm,
        });

        this.item = item;
        this.needName = false;
        this.needAmount = false;
        this.needPaymentType = false;
        this.needAccountType = false;
        this.needDeliveryMethodType = false;
        this.needConfirmationNumber = false;

        switch (item.abrv) {
            case 'register-notification-to-administrator':
                this.needName = true;
                break;
            case 'canceled-contribution-notification-to-donor':
                this.needName = true;
                this.needAmount = true;
                this.needConfirmationNumber = true;
                this.needPaymentType = true;
                this.needAccountType = true;
                break;
            case 'create-booklet-notification':
                this.needName = true;
                break;
            case 'create-booklet-order-notification':
                this.needName = true;
                this.needDeliveryMethodType = true;
                this.needAccountType = true;
                this.needConfirmationNumber = true;
                break;
            case 'create-contribution-notification-to-donor':
                this.needName = true;
                this.needAmount = true;
                this.needConfirmationNumber = true;
                this.needPaymentType = true;
                this.needAccountType = true;
                break;
            case 'declined-contribution-notification-to-donor':
                this.needName = true;
                this.needAmount = true;
                this.needConfirmationNumber = true;
                this.needPaymentType = true;
                this.needAccountType = true;
                break;
            case 'funded-contribution-notification-to-donor':
                this.needName = true;
                this.needAmount = true;
                this.needConfirmationNumber = true;
                this.needPaymentType = true;
                this.needAccountType = true;
                break;
            case 'low-balance-email':
                this.needName = true;
                break;
            case 'scheduled-grant-insufficient-fund':
                this.needName = true;
                this.needAmount = true;
                break;
            case 'scheduled-grant-skipped-due-to-insufficient-fund':
                this.needName = true;
                this.needAmount = true;
                break;
            default:
                break;
        }

        this.paymentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'payment-type');
                    const response = await service.getAll();
                    return response.data;
                }
            });

        this.accountTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'account-type');
                    const response = await service.getAll();
                    return response.data;
                }
            });

        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'delivery-method-type');
                    const response = await service.getAll();
                    return response.data;
                }
            });

        this.setAllCustom = () => {
            this.paymentTypeDropdownStore.setValue(_.find(this.paymentTypeDropdownStore.items, { abrv: 'check' }));
            this.accountTypeDropdownStore.setValue(_.find(this.accountTypeDropdownStore.items, { abrv: 'basic' }));
            this.deliveryMethodTypeDropdownStore.setValue(_.find(this.deliveryMethodTypeDropdownStore.items, { abrv: 'mail-usps' }));
            this.form.$('name').set('Hugh Marks');
            this.form.$('amount').set(150);
            this.form.$('confirmationNumber').set('456789');
            this.form.$('paymentTypeId').set(_.find(this.paymentTypeDropdownStore.items, { abrv: 'check' }).id);
            this.form.$('accountTypeId').set(_.find(this.accountTypeDropdownStore.items, { abrv: 'basic' }).id);
            this.form.$('deliveryMethodTypeId').set(_.find(this.deliveryMethodTypeDropdownStore.items, { abrv: 'mail-usps' }).id);
        }
    }
}

export default TestEmailCreateViewStore;
