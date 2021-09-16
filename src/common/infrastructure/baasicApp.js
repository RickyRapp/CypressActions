import { BaasicApp } from 'baasic-sdk-reactjs';
import { baasicOptions } from 'common/infrastructure';

export default new BaasicApp(baasicOptions.apiKey, {
	...baasicOptions,
});
