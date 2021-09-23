import { BaasicApp } from 'baasic-sdk-reactjs';

const application = new BaasicApp(ApplicationSettings.appId, {
	useSSL: ApplicationSettings.useSSL,
	apiRootUrl: ApplicationSettings.appUrl,
	apiVersion: ApplicationSettings.appVersion,
	appVersion: ApplicationSettings.apiVersion,
});

export default application;