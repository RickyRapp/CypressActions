import React from 'react';

import _ from 'lodash';
import PropTypes from 'prop-types';

import { defaultTemplate } from 'core/hoc';
import { Date, Address } from 'core/components';
import { donorAccountFormatter, charityFormatter } from 'core/utils';
import NumberFormat from 'react-number-format';

function FormatterResolver({ item, field, format }) {
    const params = {
        displayType: 'text',
        thousandSeparator: true,
        prefix: format.value ? format.value : '$',
        fixedDecimalScale: true,
        decimalScale: 2
    }

    switch (format.type) {
        case 'date': {
            const date = _.get(item, field);
            if (date) {
                return <Date value={date} format={format.value} />
            }
            return null;
        }
        case 'currency': {
            params.value = _.get(item, field);
            return <NumberFormat {...params} />
        }
        case 'transaction-currency': {
            const paymentTransaction = _.get(item, field);
            const type = paymentTransaction.paymentTransactionType.abrv;
            params.value = paymentTransaction.amount;
            if (type === 'debit') {
                params.value = params.value * (-1)
            }
            return <NumberFormat {...params} />
        }
        case 'boolean':
            switch (format.value) {
                case 'yes-no':
                    return <span>{_.get(item, field) ? 'Yes' : 'No'}</span>
                default:
                    return null;
            }
        case 'address':
            return <Address value={_.get(item, field)} format={format.value} />
        case 'phone-number':
            return <NumberFormat value={_.get(item, field)} format='(###) ###-####' displayType='text' />
        case 'routing-number':
            return <NumberFormat value={_.get(item, field)} format='###-###-###' displayType='text' />
        case 'image':
            if (_.get(item, field)) {
                return <span onClick={() => window.open(format.fetch(_.get(item, field)), format.target)} className="u-icon u-icon--sml u-icon--arrow-right" /> //TODO replace with open in new tab
            }
            return null;
        case 'function':
            return format.value(item);
        case 'denomination': {
            const notAvailable = "Out Of Stock.";
            const denominationType = _.get(item, field);
            const value = denominationType.abrv === 'blank' ? _.get(item, format.additionalField) : denominationType.value;
            const oneCert = <span><NumberFormat value={value} displayType='text' thousandSeparator={true} prefix='$' fixedDecimalScale={true} decimalScale={2} />{denominationType.abrv === 'blank' ? ' (Blank)' : ''}</span>;

            switch (format.value) {
                case 'long': {
                    const totalCert = <NumberFormat value={value * denominationType.certificateAmount} displayType='text' thousandSeparator={true} prefix='$' fixedDecimalScale={true} decimalScale={2} />;
                    return <span>{oneCert} ({denominationType.certificateAmount} cert. - {totalCert}) {format.formatNotAvailable && !denominationType.available ? notAvailable : null}</span>
                }
                case 'short': {
                    return oneCert
                }
                default:
                    return null;
            }
        }
        case 'number-format':
            return <NumberFormat value={_.get(item, field)} format={format.value} displayType='text' />;
        case 'donor-name':
            return donorAccountFormatter.format(_.get(item, field), format)
        case 'created-by':
            const coreUser = _.get(item, field);
            switch (format.value) {
                case 'short': {
                    if (coreUser.firstName || coreUser.lastName) {
                        if (coreUser.firstName && coreUser.lastName) {
                            return coreUser.firstName + ' ' + coreUser.lastName;
                        }
                        else if (coreUser.firstName) {
                            return coreUser.firstName;
                        }
                        else {
                            return coreUser.lastName;
                        }
                    }
                    else if (coreUser.displayName) {
                        return coreUser.displayName;
                    }
                    else if (coreUser.username) {
                        return coreUser.username;
                    }
                }
                default:
                    return null;
            }
        case 'charity':
            return charityFormatter.format(_.get(item, field), format)
        default:
            return () => { };
    }
}

FormatterResolver.propTypes = {
    item: PropTypes.object,
    field: PropTypes.string,
    format: PropTypes.object
};

export default defaultTemplate(FormatterResolver);