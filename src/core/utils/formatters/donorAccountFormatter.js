import _ from 'lodash';
import { addressFormatter } from 'core/utils';

class DonorAccountFormatter {
    format(donorAccount, format) {
        switch (format.type) {
            case 'donor-name': {
                switch (format.value) {
                    case 'dropdown': {
                        let formattedDonorAccountName = donorAccount.donorName;
                        if (donorAccount.securityPin) {
                            formattedDonorAccountName += ', ' + donorAccount.securityPin;
                        }
                        if (donorAccount.donorAccountAddresses && donorAccount.donorAccountAddresses.length > 0) {
                            const address = _.find(donorAccount.donorAccountAddresses, { isPrimary: true });
                            formattedDonorAccountName += ', ' + addressFormatter.format(address, 'full');
                        }
                        return formattedDonorAccountName;
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
const donorAccountFormatter = new DonorAccountFormatter();
export default donorAccountFormatter;
