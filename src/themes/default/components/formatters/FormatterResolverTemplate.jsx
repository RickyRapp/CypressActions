import React from 'react';

import _ from 'lodash';
import PropTypes from 'prop-types';

import { defaultTemplate } from 'core/hoc';
import { Date, Address, PhoneNumber } from 'core/components';

function FormatterResolver({ item, field, format }) {
    switch (format.type) {
        case 'date': {
            const date = _.get(item, field);
            if (date) {
                return <Date value={date} format={format.value} />
            }
            return null;
        }
        case 'currency':
            return <span>{format.value + _.get(item, field)}</span>
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
            return <PhoneNumber value={_.get(item, field)} />
        case 'routing-number':
            return <span>{_.get(item, field)}</span>
        case 'image':
            if (_.get(item, field)) {
                return <span onClick={() => window.open(format.fetch(_.get(item, field)), format.target)} className="u-icon u-icon--sml u-icon--arrow-right" /> //TODO replace with open in new tab
            }
            return null;
        case 'function':
            return format.value(item);
        case 'denomination': {
            const notAvailable = "Out Of Stock.";
            const denominationType = item.denominationType;
            switch (format.value) {
                case 'short': {
                    const oneCert = `$${denominationType.value}`;
                    const totalCert = `$${denominationType.value * denominationType.certificateAmount}`;
                    return <span>{oneCert} ({denominationType.certificateAmount} cert. - {totalCert}) {format.formatNotAvailable && !denominationType.available ? notAvailable : null}</span>
                }
                default:
                    return null;
            }
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