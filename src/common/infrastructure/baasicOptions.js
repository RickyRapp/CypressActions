import { localStorageHandler } from 'core/services';

export default {
	useSSL: ApplicationSettings.useSSL,// eslint-disable-line
	apiRootUrl: ApplicationSettings.appUrl,// eslint-disable-line
	apiVersion: ApplicationSettings.appVersion,// eslint-disable-line
	apiKey: ApplicationSettings.appId,// eslint-disable-line
	storageHandler: () => localStorageHandler,	// eslint-disable-line
};