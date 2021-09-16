import _ from 'lodash';

class AddressFormatter {
    format(address, format) {
        let formattedAddress = '';
        if (format === 'full') {
            if (address && address.length != null && address.length > 0) {
                address = _.find(address, { isPrimary: true });
            }
            formattedAddress = address.addressLine1;
            if (address.addressLine2) {
                formattedAddress += ` ${address.addressLine2}`
            }
            formattedAddress += `, ${address.city}, ${address.state} ${address.zipCode}`;
        }
        return formattedAddress;
    }
}

const addressFormatter = new AddressFormatter();
export default addressFormatter;
