import { localStorageHandler } from 'core/services';

export default {
	useSSL: ApplicationSettings.useSSL,
	apiRootUrl: ApplicationSettings.appUrl,
	apiVersion: ApplicationSettings.appVersion,
	apiKey: ApplicationSettings.appId,
	storageHandler: () => localStorageHandler,	
};