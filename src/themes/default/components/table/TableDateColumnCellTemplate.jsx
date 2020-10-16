import React from 'react';
import PropTypes from 'prop-types';
import { GridCell } from '@progress/kendo-react-grid';

const TableDateColumnCellTemplate = function (props) {
    const {dataItem, field} = props;

    const dateItem = new Date(dataItem[field]);

    return <GridCell {...props} dataItem={{...dataItem, [field]: dateItem}} />
};

TableDateColumnCellTemplate.propTypes = {
    dataItem: PropTypes.object,
    field: PropTypes.string
};

export default TableDateColumnCellTemplate;
