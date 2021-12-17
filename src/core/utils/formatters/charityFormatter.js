import _ from 'lodash';
import { addressFormatter } from 'core/utils';

class CharityFormatter {
    format(value, format) {
        switch (format.value) {
            case 'charity-name-display': {
                let formattedCharityName = value.name;
                if (value.taxId) {
                    formattedCharityName += ', ' + this.format(value.taxId, { value: 'tax-id' });
                }
                if (value.charityAddresses && value.charityAddresses.length > 0) {
                    const address = _.find(value.charityAddresses, { isPrimary: true });
                    formattedCharityName += ', ' + addressFormatter.format(address, 'full');
                } else if (value.addressLine1 && value.city) {
                    const address = value;
                    formattedCharityName += ', ' + addressFormatter.format(address, 'full');
                }
                return formattedCharityName;
            }
            case 'tax-id':
                return value.slice(0, 2) + "-" + value.slice(2);
            case 'name-taxid':
                return `${value.name}, ${value.taxId.slice(0, 2) + "-" + value.taxId.slice(2)}`;
            default:
                break;
        }
    }
}

const charityFormatter = new CharityFormatter();
export default charityFormatter;
