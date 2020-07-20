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
                            formattedDonorName += ', ' + donor.securityPin;
                        }
                        if (donor.donorAddresses && donor.donorAddresses.length > 0) {
                            const address = _.find(donor.donorAddresses, { isPrimary: true });
                            formattedDonorName += ', ' + addressFormatter.format(address, 'full');
                        }
                        return formattedDonorName;
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
