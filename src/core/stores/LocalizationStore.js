import { observable, action } from 'mobx';
import { localizationService } from 'core/services';

class LocalizationStore {
  rootStore;
  maxInitDuration = 10000;
  languageDropdownStore = null;

  @observable language = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setLanguage(lng) {
    this.language = lng;
  }

  @action
  changeLanguage = lng => {
    const {
      whitelist,
      fallbackLng
    } = localizationService.options;

    if (whitelist.indexOf(lng) === -1) {
      lng = fallbackLng[0];
    }

    localizationService.changeLanguage(lng);
  };

  @action
  async initialize() {
    localizationService.on('languageChanged', lng => {
      this.setLanguage(lng);
    });

    // throw error if languages don't load after specific time
    return new Promise((resolve, reject) => {
      const cancelID = setTimeout(() => {
        reject();
      }, this.maxInitDuration);

      const onInitialize = () => {
        this.setLanguage(localizationService.language);
        clearTimeout(cancelID);
        resolve();
      };

      if (localizationService.isInitialized) {
        onInitialize();
      } else {
        localizationService.on('initialized', () => {
          onInitialize();
        });
      }
    });
  }
}

export default LocalizationStore;
