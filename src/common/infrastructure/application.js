import { BaasicApp } from 'baasic-sdk-reactjs';

const application = new BaasicApp(ApplicationSettings.appId, {
	useSSL: ApplicationSettings.useSSL,
	apiRootUrl: ApplicationSettings.appUrl,
	apiVersion: ApplicationSettings.appVersion
});

export default application;