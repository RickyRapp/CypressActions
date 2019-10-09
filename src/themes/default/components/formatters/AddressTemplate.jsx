import { addressFormatter } from 'core/utils';
import { defaultTemplate } from 'core/hoc';

function AddressTemplate({ format, value }) {
    return addressFormatter.format(value, format);
}

export default defaultTemplate(AddressTemplate);
