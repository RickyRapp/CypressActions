import _ from 'lodash';
import { addressFormatter } from 'core/utils';

class DonorFormatter {
    format(donor, format) {
        switch (format.type) {
            case 'donor-name': {
                switch (format.value) {
                    case 'dropdown': {
                        let formattedDonorName = donor.donorName;
                        if (donor.securityPin) {
                            formattedDonorName += ', PIN: ' + donor.securityPin;
                        }
                        if (donor.donorAddresses && donor.donorAddresses.length > 0) {
                            const address = _.find(donor.donorAddresses, { isPrimary: true });
                            formattedDonorName += ', ADDRESS: ' + addressFormatter.format(address, 'full');
                        }
                        return formattedDonorName;
                    }
                    default:
                        break;
                }
                break;
            }
            case 'grant-acknowledgment-type': {
                switch (format.value) {
                    case 'name-and-address': {
                        return `${donor.donorName} - ${addressFormatter.format(donor.donorAddress, 'full')}`
                    }
                    case 'fund-name-and-address': {
                        return `${donor.fundName} - ${addressFormatter.format(donor.donorAddress, 'full')}`
                    }
                    case 'fund-name': {
                        return donor.fundName;
                    }
                    case 'remain-anonymous': {
                        return 'Anonymous'
                    }
                    default:
                        break;
                }
                break;
            }
            default:
                break;
        }
    }
}
const donorFormatter = new DonorFormatter();
export default donorFormatter;
