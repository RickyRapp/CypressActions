import { SessionPendingCertificateStatusService } from 'application/common/lookup/session-pending-certificate-status/services';
import { cacheService } from 'core/services';

const key = 'sessionPendingCertificateStatuss';

class SessionPendingCertificateStatusStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.sessionPendingCertificateStatusService = moduleStore.rootStore.createApplicationService(SessionPendingCertificateStatusService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.sessionPendingCertificateStatusService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default SessionPendingCertificateStatusStore;
