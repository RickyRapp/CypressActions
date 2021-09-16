import React from 'react';
import PropTypes from 'prop-types';
import { BaasicTableNoRecordsTemplate } from 'themes/components';

const BaasicTableNoRecords = function(props) {
    return <BaasicTableNoRecordsTemplate {...props} />
};

BaasicTableNoRecords.propTypes = {
    label: PropTypes.string,
    createFn: PropTypes.func
};

export default BaasicTableNoRecords;
