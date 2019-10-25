import _ from 'lodash';
import { defaultTemplate } from 'core/hoc';

function LanguageMetadata({ item, propertyName, language }) {
    const propertyValue = _.get(item, `languageMetadata.${language}.${propertyName}`);
    let test = propertyValue || _.get(item, propertyName);
    return test || null;
}

export default defaultTemplate(LanguageMetadata);