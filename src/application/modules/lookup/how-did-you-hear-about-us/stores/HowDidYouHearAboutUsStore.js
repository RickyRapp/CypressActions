import { HowDidYouHearAboutUsService } from 'application/lookup/how-did-you-hear-about-us/services';
import { cacheService } from 'core/services';

const key = 'howDidYouHearAboutUss';

class HowDidYouHearAboutUsStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.howDidYouHearAboutUsService = moduleStore.rootStore.createApplicationService(HowDidYouHearAboutUsService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.howDidYouHearAboutUsService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default HowDidYouHearAboutUsStore;
