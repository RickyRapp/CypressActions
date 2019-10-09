import React from 'react';
import { PropTypes } from 'prop-types';

function TableBooleanColumnTemplate({ dataItem, field }) {
    return (
        <td>
            <span className={'icomoon icon-'+( dataItem[field] ? 'check-1' : 'remove')}></span>
        </td>
    )
}

TableBooleanColumnTemplate.propTypes = {
    dataItem: PropTypes.object,
    field: PropTypes.string
}

export default TableBooleanColumnTemplate;