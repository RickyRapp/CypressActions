import { action } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { GrantGivingCardCreateForm } from 'application/charity/grant/forms';
import moment from 'moment';

@applicationContext
class GrantGivingCardCreateViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'grant-giving-card-create',
            id: undefined,
            actions: () => {
                return {
                    create: async (resource) => {
                        if(!resource.isRecurring)
                            await rootStore.application.charity.grantStore.createGrantGivingCard({ charityId: this.charityId, ...resource });
                        else {
                            resource.grantPurposeTypeId = this.grantPurposeTypeId;
                            resource.grantAcknowledgmentTypeId = this.grantAcknowledgmentTypeId;
                            try{
                                await rootStore.application.charity.grantStore.createScheduledGrant({ charityId: this.charityId, ...resource });
                            }catch(e){
                                console.log(e);
                            }
                        }
                    }
                }
            },
            FormClass: GrantGivingCardCreateForm,
        });
        
        this.charityId = rootStore.userStore.applicationUser.id;
        this.createGrantScheduleTypeDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.grantAcknowledgmentTypeId = ((await this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find()).find(g => g.abrv == 'name-and-address').id);
            this.grantPurposeTypeId = ((await this.rootStore.application.lookup.grantPurposeTypeStore.find()).find(g => g.abrv == 'where-deemed-most-needed').id);
            this.loaderStore.resume();
        }
    }
    @action.bound
	getNumberOfReocurrency(startDate, endDate, scheduledTypeId) {
		let number = 0;
		if (scheduledTypeId === this.weeklyGrantId) {
			while (startDate < endDate) {
				startDate = moment(startDate)
					.add(7, 'days')
					.toDate();
				number = number + 1;
			}
		} else if (scheduledTypeId === this.twiceAMonthGrantId) {
			while (startDate < endDate) {
				startDate = moment(startDate)
					.add(14, 'days')
					.toDate();
				number = number + 1;
			}
		} else if (scheduledTypeId === this.monthlyGrantId) {
			while (startDate < endDate) {
				startDate = moment(startDate)
					.add(1, 'months')
					.toDate();
				number = number + 1;
			}
		} else if (scheduledTypeId === this.quarterlyGrantId) {
			while (startDate < endDate) {
				startDate = moment(startDate)
					.add(3, 'months')
					.toDate();
				number = number + 1;
			}
		} else if (scheduledTypeId === this.annualGrantId) {
			while (startDate < endDate) {
				startDate = moment(startDate)
					.add(1, 'years')
					.toDate();
				number = number + 1;
			}
		}
		return number;
	}
    createGrantScheduleTypeDropdownStore() {
		this.grantScheduleTypeDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				const data = await this.rootStore.application.lookup.grantScheduleTypeStore.find();
				return data.filter(c => c.abrv != 'one-time');
			},
		});
	}
}

export default GrantGivingCardCreateViewStore;
