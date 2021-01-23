import { emailAddressFormatter } from 'core/utils';
import { defaultTemplate } from 'core/hoc';

function EmailAddressTemplate({ format, value }) {
    return emailAddressFormatter.format(value, format);
}

export default defaultTemplate(EmailAddressTemplate);
