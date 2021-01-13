import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorGivingCardSettingForm } from 'application/administration/donor/forms';
import { action } from 'mobx';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorGivingCardSettingEditViewStore extends BaseEditViewStore {
    constructor(rootStore, setting) {
        super(rootStore, {
            name: 'giving-card-setting-edit',
            id: setting && setting.id || undefined,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        await rootStore.application.administration.donorStore.updateGivingCardSetting(resource);
                    },
                    create: async (resource) => {
                        await rootStore.application.administration.donorStore.createGivingCardSetting({ donorId: this.donorId, ...resource });
                    },
                    get: async () => {
                        return setting;
                    }
                }
            },
            FormClass: DonorGivingCardSettingForm,
        });

        this.donorId = rootStore.routerStore.routerState.params.id;

        this.createGrantPurposeTypeDropdownStore();
        this.createGrantAcknowledgmentTypeDropdownStore();
        this.createGivingCardDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            if (this.isEdit) {
                await this.fetch([
                    this.getResource(this.id),
                ]);
                this.onChangeIsEnabled();
                if (this.item.givingCard) {
                    this.givingCardDropdownStore.setValue({
                        id: this.item.givingCard.id,
                        name: `${this.item.givingCard.cardNumber} - ${this.item.givingCard.cvv} - ${this.item.givingCard.expirationDate}`,
                    })
                }
            }
        }
    }

    @action.bound
    onChangeIsEnabled() {
        this.form.$('grantAcknowledgmentTypeId').set('disabled', !this.form.$('isEnabled').value);
        this.form.$('grantPurposeTypeId').set('disabled', !this.form.$('isEnabled').value);
        this.form.$('maxAmount').set('disabled', !this.form.$('isEnabled').value);
        this.form.$('maxTimesPerDay').set('disabled', !this.form.$('isEnabled').value);

        this.form.$('grantAcknowledgmentTypeId').setRequired(this.form.$('isEnabled').value);
        this.form.$('grantAcknowledgmentTypeId').resetValidation();
        this.form.$('grantPurposeTypeId').setRequired(this.form.$('isEnabled').value);
        this.form.$('grantPurposeTypeId').resetValidation();
    }

    createGrantPurposeTypeDropdownStore() {
        this.grantPurposeTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.grantPurposeTypeStore.find();
                },
            });
    }

    createGrantAcknowledgmentTypeDropdownStore() {
        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();
                },
            });
    }

    createGivingCardDropdownStore() {
        this.givingCardDropdownStore = new BaasicDropdownStore({
            placeholder: 'DONOR_GIVING_CARD_SETTING.EDIT.FIELDS.SELECT_GIVING_CARD',
            initFetch: false,
            filterable: true,
            clearable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.givingCardStore.findGivingCard({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'cardNumber|asc',
                        isAssigned: false
                    });

                    return data.item.map(c => {
                        return {
                            id: c.id,
                            name: `${c.cardNumber} - ${c.cvv} - 12/30`,
                        }
                    });
                }
            });
    }
}

export default DonorGivingCardSettingEditViewStore;
