import { action, observable, computed } from 'mobx';
import { BookletOrderCreateForm } from 'application/booklet-order/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { DonorService } from 'application/donor/services';
import { LookupService } from 'common/services';
import _ from 'lodash';

@applicationContext
class BookletOrderCreateViewStore extends BaseEditViewStore {
    @observable denominationTypes = null;
    @observable bookletTypes = null;
    applicationDefaultSetting = null;
    donor = null;

    constructor(rootStore) {
        super(rootStore, {
            name: 'booklet-order-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
                        return { statusCode: 200, data: resource }
                    }
                }
            },
            FormClass: BookletOrderCreateForm,
        });

        this.donorId = rootStore.routerStore.routerState.params.id;
        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore({
            placeholder: 'BOOKLET_ORDER.CREATE.FIELDS.DELIVERY_METHOD_TYPE_PLACEHOLDER'
        }, {
            fetchFunc: async () => {
                const service = new LookupService(this.rootStore.application.baasic.apiClient, 'delivery-method-type');
                const response = await service.getAll();
                return response.data;
            }
        });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonor(),
                this.fetchApplicationDefaultSetting(),
                this.fetchDenominationTypes(),
                this.fetchBookletTypes()
            ]);

            await this.fetch([
                this.setFormDefaults()
            ]);
        }
    }

    @action.bound
    setFormDefaults() {
        if (!this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            if (!this.donor.isInitialContributionDone) {
                this.rootStore.notificationStore.warning('BOOKLET_ORDER.CREATE.MISSING_INITIAL_CONTRIBUTION');
                this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: this.donorId });
            }
        }

        this.form.$('donorId').set('value', this.donorId);
        this.form.$('checkOrderUrl').set('value', `${window.location.origin}/app/booklet-orders/?confirmationNumber={confirmationNumber}`)
    }

    @computed get mostCommonDenominations() {
        if (this.denominationTypes) {
            const usedDenominationTypeIds = _.map(this.form.$('bookletOrderItems').value, 'denominationTypeId');
            return _.filter(this.denominationTypes, function (item) {
                return item.mostCommon && item.available && !_.includes(usedDenominationTypeIds, item.id);
            });
        }
        return [];
    }

    @computed get totalAndFee() {
        let totalAndFee = {};
        let total = 0;
        if (this.form && this.form.has('bookletOrderItems')) {
            _.forEach(this.form.$('bookletOrderItems').values(), (item) => {
                const denomination = _.find(this.denominationTypes, { id: item.denominationTypeId });
                if (denomination)
                    total = total + (denomination.value * denomination.certificateAmount * item.count);
            })
        }

        totalAndFee.total = total;

        if (this.donor && this.donor.accountType.abrv === 'regular') {
            total = total + total * (this.donor.certificateFeePercentage / 100)
        }

        if (this.deliveryMethodTypeDropdownStore.value && this.deliveryMethodTypeDropdownStore.value.abrv === 'express-mail') {
            total = total + this.applicationDefaultSetting.expressMailFeeAmount;
        }

        totalAndFee.totalWithFee = total;
        return totalAndFee;
    }

    @action.bound
    async fetchDonor() {
        const service = new DonorService(this.rootStore.application.baasic.apiClient);
        const response = await service.get(this.donorId, {
            embed: [
                'accountType'
            ],
            fields: [
                'id',
                'donorName',
                'isInitialContributionDone',
                'certificateFeePercentage',
                'accountType',
                'accountType.abrv'
            ]
        });
        this.donor = response.data;
    }

    @action.bound
    async fetchApplicationDefaultSetting() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'application-default-setting');
        const response = await service.getAll();
        this.applicationDefaultSetting = response.data[0];
    }

    @action.bound
    async fetchDenominationTypes() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'denomination-type');
        const response = await service.getAll();
        this.denominationTypes = response.data;
    }

    @action.bound
    async fetchBookletTypes() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'booklet-type');
        const response = await service.getAll();
        this.bookletTypes = response.data;
    }
}

export default BookletOrderCreateViewStore;
