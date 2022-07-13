import React from 'react';
import PropTypes from 'prop-types';

const TableImageCellTemplate = function (props) {
    const {dataItem, field} = props;
    // console.log(dataItem, field);

    return (
        <td>
            image
        </td>)
};

TableImageCellTemplate.propTypes = {
    dataItem: PropTypes.object,
    field: PropTypes.string
};

export default TableImageCellTemplate;
