import { localStorageHandler } from 'core/services';

export default {
  useSSL: ApplicationSettings.useSSL,
  apiRootUrl: ApplicationSettings.appUrl,
  apiVersion: ApplicationSettings.appVersion,
  storageHandler: () => localStorageHandler
};
