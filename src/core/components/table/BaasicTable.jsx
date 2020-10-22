import React from 'react';
import PropTypes from 'prop-types';
import { BaasicTableTemplate } from 'themes/components';

function BaasicTable(props) {
    return <BaasicTableTemplate {...props} />;
}

BaasicTable.propTypes = {
    tableStore: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    actionsComponent: PropTypes.any,
    batchActionsComponent: PropTypes.any,
    noRecordsComponent: PropTypes.any,
    noRecordsState: PropTypes.object,
    emptyStateComponent: PropTypes.any,
    emptyState: PropTypes.object,
    scrollable: PropTypes.string,
    editField: PropTypes.string,
    authorization: PropTypes.any,
    t: PropTypes.func,
    onScroll: PropTypes.func,
    infiniteScrollCallback: PropTypes.func,
};

export default BaasicTable;
