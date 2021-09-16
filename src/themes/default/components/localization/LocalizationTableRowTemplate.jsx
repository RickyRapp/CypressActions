import React from 'react';

import _ from 'lodash';
import PropTypes from 'prop-types';

import { defaultTemplate } from 'core/hoc';
import { BasicInput } from 'core/components';

function LocalizationTableRow({ dataItem, field }) {
    let item = _.get(dataItem, field);
    let value = null;
    let dataField = null;

    if (_.isString(item)) {
        value = item;
    } else {
        dataField = item;
        value = dataField.value;
    }

    if (dataItem.inEdit === true && dataField !== null) {
        return (
            <td key={field} className="table__body--data">
                <div>
                    <BasicInput field={dataField} showLabel={false} autoComplete="off" />
                </div>
            </td>
        );
    }

    return (
        <td>
            <span key={field}>{value}</span>
        </td>
    );
}

LocalizationTableRow.propTypes = {
    dataItem: PropTypes.object,
    field: PropTypes.string,
};

export default defaultTemplate(LocalizationTableRow);
