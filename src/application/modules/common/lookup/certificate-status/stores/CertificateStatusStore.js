import { CertificateStatusService } from 'application/common/lookup/certificate-status/services';
import { cacheService } from 'core/services';

const key = 'certificateStatuses';

class CertificateStatusStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.certificateStatusService = moduleStore.rootStore.createApplicationService(CertificateStatusService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.certificateStatusService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default CertificateStatusStore;
