import _ from 'lodash';
import {observable, action } from 'mobx';
import {localizationService } from 'core/services';
import {BaasicDropdownStore} from 'core/stores';

class LocalizationStore {
    rootStore;
    maxInitDuration = 10000;
    languageDropdownStore = null;

    @observable language = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.languageDropdownStore = new BaasicDropdownStore(
        {
            initFetch: false,
            defaultItem: null
        },
        {
            fetchFunc: async () => {
                const response = await rootStore.application.lookup.languageModule.languageStore.find({
                    pageNumber: 1,
                    pageSize: 1000
                });

                const whitelist = localizationService.options.whitelist;
                const languageKey = 'culture';

                const availableLanguages = _.filter(response.item, (i) => _.includes(whitelist, i[languageKey]));
                return _.map(availableLanguages, i => {
                    const value = i[languageKey];
                    const flagSuffix = _.split(value, '-')[0];
                    return {
                        name: i.name,
                        id: value,
                        flagSuffix: flagSuffix
                    }
                });

            },
            onChange: this.changeLanguage
        });
    }

    @action setLanguage(lng) {
        this.language = lng;
    }

    @action
    changeLanguage = (lng) => {
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
        localizationService.on('languageChanged', (lng) => {
            this.setLanguage(lng);
        });

        await this.languageDropdownStore.filterAsync();

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
