import _ from 'lodash';

function getDonorNameDropdown(val) {
    let fullName = `${val.coreUser.firstName}`
    if (val.coreUser.json && JSON.parse(val.coreUser.json).middleName) {
        fullName += ` (${JSON.parse(val.coreUser.json).middleName})`
    }
    fullName += ` ${val.coreUser.lastName}`;

    fullName += ` - {${val.accountNumber}}`

    if (val.donorAccountAddresses) {
        var primaryAddress = _.find(val.donorAccountAddresses, { primary: true }).address;
        if (primaryAddress) {
            fullName += ` - ${primaryAddress.addressLine1}`
            if (primaryAddress.addressLine2) {
                fullName += ` ${primaryAddress.addressLine2}`
            }
            fullName += `, ${primaryAddress.city}, ${primaryAddress.state} ${primaryAddress.zipCode}`
        }
    }
    return fullName;
}

export { getDonorNameDropdown };