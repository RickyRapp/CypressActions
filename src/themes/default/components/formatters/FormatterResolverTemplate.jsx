import React from 'react';

import _ from 'lodash';
import PropTypes from 'prop-types';

import { defaultTemplate } from 'core/hoc';
import { Date, Address, PhoneNumber } from 'core/components';

function FormatterResolver({ item, field, format }) {
    switch (format.type) {
        case 'date':
            return <Date value={_.get(item, field)} format={format.value} />
        case 'currency':
            return <span>{format.value + _.get(item, field)}</span>
        case 'boolean':
            switch (format.value) {
                case 'yes-no':
                    return <span>{_.get(item, field) ? 'Yes' : 'No'}</span>
                default:
                    return () => { };
            }
        case 'address':
            return <Address value={_.get(item, field)} format={format.value} />
        case 'phone-number':
            return <PhoneNumber value={_.get(item, field)} />
        case 'routing-number':
            return <span>{_.get(item, field)}</span>
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