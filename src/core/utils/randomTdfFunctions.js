import React from 'react'
import _ from 'lodash';
import NumberFormat from 'react-number-format';

function getDonorName(val, middleName = true) {
    let fullName = null;
    if (val) {
        if (val.companyProfile) {
            fullName = `${val.companyProfile.name}`
        }
        else if (val.coreUser) {
            fullName = `${val.coreUser.firstName}`
            if (middleName && val.coreUser.json && JSON.parse(val.coreUser.json).middleName) {
                fullName += ` (${JSON.parse(val.coreUser.json).middleName})`
            }
            fullName += ` ${val.coreUser.lastName}`;
        }
    }

    return fullName;
}

function getDonorNameDropdown(val) {
    let fullName = getDonorName(val, true);

    fullName += ` - {${val.accountNumber}} - `

    if (val.donorAccountAddresses) {
        fullName += getFormattedPrimaryAddress(val.donorAccountAddresses);
    }
    return fullName;
}

function getFormattedPrimaryAddress(val) {
    if (val) {
        var primaryAddress = _.find(val, { primary: true }).address;
        if (primaryAddress) {
            return getFormattedAddress(primaryAddress);
        }
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

function formatDenomination(item, longer = false) {
    if (item) {
        const totalCert = <NumberFormat
            value={item.value * item.certificateAmount}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            decimalScale={longer ? 2 : 0}
            fixedDecimalScale={true} />;

        const oneCert = <NumberFormat
            value={item.value}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            decimalScale={longer ? 2 : 0}
            fixedDecimalScale={true} />;

        return <span>{oneCert} ({item.certificateAmount} {longer ? 'certificates' : 'cert.'} - {totalCert})</span>
    }
    return '';
}

function isErrorCode(statusCode) {
    return statusCode >= 400 && statusCode < 506;
}

function isSuccessCode(statusCode) {
    return statusCode >= 200 && statusCode < 207;
}

function converter(fileSize, from, to) {
    let convertedFileSize = null;
    if (from === 'B' && to === 'MB') {
        convertedFileSize = Math.round(fileSize / (1024 * 1024) * 1000) / 1000;
    }

    return convertedFileSize;
}

export {
    getDonorNameDropdown, getFormattedAddress, getFormattedPrimaryAddress, getCharityNameDropdown, getDonorName, formatCharityTaxId,
    isErrorCode, isSuccessCode, converter, formatDenomination
};