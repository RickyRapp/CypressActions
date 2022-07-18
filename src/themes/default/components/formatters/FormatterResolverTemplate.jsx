import React from 'react';

import _ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import { defaultTemplate } from 'core/hoc';
import { Date, Address } from 'core/components';
import { donorFormatter, charityFormatter } from 'core/utils';
import NumberFormat from 'react-number-format';
import { FileStreamRouteService } from 'common/services';

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
        case 'date-no_utc': {
            const date = _.get(item, field);
            if (date) {
                return <Date value={moment.utc(date).format('L')} format={format.value} />
            }
            return null;
        }
        case 'currency': {
            params.value = _.get(item, field);
            return <NumberFormat {...params} />
        }
        case 'percentage': {
            params.value = _.get(item, field) * 100;
            params.prefix = null;
            params.suffix = '%';
            if (format.decimalScale) {
                params.decimalScale = format.decimalScale;
            }
            return <NumberFormat {...params} />
        }
        case 'share-name': {
            let shareName = item.grantAcknowledgmentType.name;

            if (item.grantAcknowledgmentTypeByAmount && item.acknowledgmentByAmount) {
                params.value = item.acknowledgmentByAmount;
                const formatAmount = <span><NumberFormat {...params} /></span>
                return <span>{shareName} (over {formatAmount} will be {item.grantAcknowledgmentTypeByAmount.name})</span>
            }
            else {
                return shareName;
            }
        }
        case 'transaction-currency': {
            const paymentTransaction = _.get(item, field);
            const type = paymentTransaction.paymentTransactionType.abrv;
            params.value = paymentTransaction.amount;
            return <NumberFormat {...params} />
        }
        case 'transaction-currency-charity': {
            const paymentTransaction = _.get(item, field);
            const type = paymentTransaction.paymentTransactionType.abrv;
            params.value = paymentTransaction.amount;
            return <NumberFormat {...params} />
        }
        case 'boolean':
            switch (format.value) {
                case 'yes-no':
                    return <span>{_.get(item, field) ? 'Yes' : 'No'}</span>
                case 'custom':
                    return <span>{_.get(item, field) ? format.yesLabel : format.noLabel}</span>
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
                const routeService = new FileStreamRouteService();
                return <span onClick={() => window.open(routeService.getPreview(_.get(item, field)), format.target)} className="u-icon u-icon--base u-icon--arrow-right" /> //TODO replace with open in new tab
            }
            return null;
        case 'function':
            try {
                return format.value(item);
            } catch (error) {
                console.log('FormatResolverError:', error);
            }
        case 'denomination': {
            const notAvailable = "Out Of Stock.";
            const denominationType = _.get(item, field);
            const value = denominationType.abrv === 'blank' && format.additionalField ? _.get(item, format.additionalField) : denominationType.value;
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
            return donorFormatter.format(_.get(item, field), format)
        case 'created-by': {
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
                    else if (coreUser.userName) {
                        return coreUser.userName;
                    }
                    return '';
                }
                default:
                    return null;
            }
        }
        case 'charity':
            return charityFormatter.format(_.get(item, field), format)
        case 'count': {
            const items = _.get(item, field);
            return items.length;
        }
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