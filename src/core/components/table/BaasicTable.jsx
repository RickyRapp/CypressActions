import React from 'react';
import PropTypes from 'prop-types';
import { BaasicTableTemplate } from 'themes/components';

function BaasicTable(props) {
    return (
        <BaasicTableTemplate {...props} />
    )
}

BaasicTable.propTypes = {
    tableStore: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    actionsComponent: PropTypes.any,
    noRecordsComponent: PropTypes.any,
    editField: PropTypes.string
};

export default BaasicTable;
