import _ from 'lodash';
import { defaultTemplate } from 'core/hoc';

function LanguageMetadata({ item, propertyName, language }) {
    const propertyValue = _.get(item, `languageMetadata.${language}.${propertyName}`);
    let test = propertyValue || _.get(item, propertyName);
    return test === undefined ? null : test; //e.g. number 0 is treated as false and null was returned. If _.get(item, propertyName) does not find anything it will return undefined and in that way return null, otherwise return value (test) 
}

export default defaultTemplate(LanguageMetadata);