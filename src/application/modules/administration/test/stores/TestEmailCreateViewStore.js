import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { TestEmailCreateForm } from 'application/administration/test/forms';
import { AdministrationService } from 'application/administration/test/services';
import { observable } from 'mobx';
import { LookupService } from 'common/services';

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
        this.emailName = item.name;
        this.needName = false;
        this.needAmount = false;
        this.needPaymentType = false;
        this.needAccountType = false;
        this.needDeliveryMethodType = false;
        this.needConfirmationNumber = false;

        switch (item.abrv) {
            case 'registerNotificationToAdministrator':
                this.needName = true;
                break;
            case 'canceledContributionNotificationToDonor':
                this.needName = true;
                this.needAmount = true;
                this.needConfirmationNumber = true;
                this.needPaymentType = true;
                this.needAccountType = true;
                break;
            case 'createBookletNotification':
                this.needName = true;
                break;
            case 'createBookletOrderNotification':
                this.needName = true;
                this.needDeliveryMethodType = true;
                this.needAccountType = true;
                this.needConfirmationNumber = true;
                break;
            case 'createContributionNotificationToDonor':
                this.needName = true;
                this.needAmount = true;
                this.needConfirmationNumber = true;
                this.needPaymentType = true;
                this.needAccountType = true;
                break;
            case 'declinedContributionNotificationToDonor':
                this.needName = true;
                this.needAmount = true;
                this.needConfirmationNumber = true;
                this.needPaymentType = true;
                this.needAccountType = true;
                break;
            case 'fundedContributionNotificationToDonor':
                this.needName = true;
                this.needAmount = true;
                this.needConfirmationNumber = true;
                this.needPaymentType = true;
                this.needAccountType = true;
                break;
            case 'lowBalanceEmail':
                this.needName = true;
                break;
            case 'scheduledGrantInsufficientFund':
                this.needName = true;
                this.needAmount = true;
                break;
            case 'scheduledGrantSkippedDueToInsufficientFund':
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
