import { observable, action, runInAction } from 'mobx';
import { localizationService } from 'core/services';

class LocalizationStore {
  rootStore;
  maxInitDuration = 10000;

  @observable language;

  languages = [
    { value: 'en', label: 'English' },
    { value: 'hr', label: 'Croatian' },
    { value: 'it', label: 'Italian' }
  ];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action changeLanguage = lng => {
    const { whitelist, fallbackLng } = localizationService.options;

    if (whitelist.indexOf(lng) === -1) {
      lng = fallbackLng[0];
    }
    localizationService.changeLanguage(lng);
  };

  @action async initialize() {
    localizationService.on('languageChanged', lng => {
      runInAction(() => {
        this.language = lng;
      });
    });

    return new Promise((resolve, reject) => {
      const cancelID = setTimeout(() => {
        reject();
      }, this.maxInitDuration);

      const onInitialize = () => {
        clearTimeout(cancelID);
        resolve();
      };

      if (localizationService.isInitialized) {
        onInitialize();
      } else {
        localizationService.on('initialized', options => {
          onInitialize();
        });
      }
    });
  }
}

export default LocalizationStore;
