import _ from 'lodash';

function getDonorNameDropdown(val) {
    let fullName = `${val.coreUser.firstName}`
    if (val.coreUser.json && JSON.parse(val.coreUser.json).middleName) {
        fullName += ` (${JSON.parse(val.coreUser.json).middleName})`
    }
    fullName += ` ${val.coreUser.lastName}`;

    fullName += ` - {${val.accountNumber}} - `

    if (val.donorAccountAddresses) {
        fullName += getFormattedPrimaryAddress(val.donorAccountAddresses);
    }
    return fullName;
}

function getFormattedPrimaryAddress(val) {
    var primaryAddress = _.find(val, { primary: true }).address;
    if (primaryAddress) {
        return getFormattedAddress(primaryAddress);
    }
    return '';
}

function getFormattedAddress(val) {
    let fullAddress = val.addressLine1;
    if (val.addressLine2) {
        fullAddress += ` ${val.addressLine2}`
    }
    fullAddress += `, ${val.city}, ${val.state} ${val.zipCode}`;
    return fullAddress;
}

function getCharityNameDropdown(val) {
    let fullName = `${val.name}`
    fullName += ` - {${formatCharityTaxId(val.taxId)}} - `;

    if (val.charityAddresses) {
        fullName += getFormattedPrimaryAddress(val.charityAddresses);
    }
    return fullName;
}

function formatCharityTaxId(val) {
    if (val) {
        if (val.length > 3) {
            return [val.slice(0, 2), '-', val.slice(2)].join(''); //inserts '-' on 3rd place in taxId
        }
    }
    return '';
}

export { getDonorNameDropdown, getFormattedAddress, getFormattedPrimaryAddress, getCharityNameDropdown };