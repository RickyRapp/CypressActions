import { ActivityService } from "application/activity/services";
import { CharityService } from "application/charity/services";
import { DonationService } from "application/donation/services";
import { GrantRequestService } from "application/grant/services";

class ActivityStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.activityService = moduleStore.rootStore.createApplicationService(ActivityService);
		this.donationService = moduleStore.rootStore.createApplicationService(DonationService);
		this.charityService = moduleStore.rootStore.createApplicationService(CharityService);
		this.grantRequestService = moduleStore.rootStore.createApplicationService(GrantRequestService);

	}

	async findTransactions(params) {
		const response = await this.activityService.findTransactions(params);
		return response.data;
	}

	async findPastGrants(params) {
		const response = await this.donationService.findPastGrant(params);
		return response.data;
	}

	async findGrantRequest(params) {
		const response = await this.grantRequestService.find(params);
		return response.data;
	}

	async searchCharity(params) {
		const response = await this.charityService.search(params);
		return response.data.item;
	}

	async loadDonorData(id) {
		const response = await this.activityService.loadDonorData(id);
		return response.data;
	}

	async completeGrantRequest(id) {
		const response = await this.grantRequestService.complete(id);
		return response.data;
	}

	async declineGrantRequest(id) {
		const response = await this.grantRequestService.decline(id);
		return response.data;
	}
}
export default ActivityStore;