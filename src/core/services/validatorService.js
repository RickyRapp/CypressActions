import Validator from 'validatorjs';
import _ from 'lodash';
import { localizationService } from 'core/services';
import { validationErrors } from 'core/utils/validation';

class ValidatorService {
    callbacks = [];

    constructor() {
        const localizeMessages = (obj) => {
            let messages = {};
            _.forOwn(obj, (value, key) => {                
                if (_.isObject(value)) {
                    messages[key] = localizeMessages(value);
                } else {
                    messages[key] = localizationService.t(value);
                }
            });

            return messages;
        }

        localizationService.on('languageChanged', (lng) => {            
            if (!Validator.getMessages(lng)) {
                Validator.setMessages(lng, localizeMessages(validationErrors));
            }            

            Validator.useLang(lng);

            _.each(this.callbacks, (c) => {
                if (c.name === 'onMessageSourceChange')
                    c.action();
            });
        }); 
    }

    on(name, callback) {
        this.callbacks.push({ name: name, action: callback });
    }
}

const service = new ValidatorService();

export default service;