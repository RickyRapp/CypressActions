import React from 'react';
import PropTypes from 'prop-types';
import {defaultTemplate} from 'core/hoc';

const UserCellTemplate = function (props) {
    const {dataItem, field} = props;
    return (
        <td>{dataItem[field].firstName} {dataItem[field].lastName}</td>
    )
};

UserCellTemplate.propTypes = {
    dataItem: PropTypes.any,
    field: PropTypes.string,
    t: PropTypes.any
};

export default defaultTemplate(UserCellTemplate);
