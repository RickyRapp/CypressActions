import React from 'react';
import PropTypes from 'prop-types';
import {BaasicTableRowDetailTemplate} from "themes/components";

const BaasicTableRowDetail = function (props) {
    return (
        <BaasicTableRowDetailTemplate {...props} />
    );
};

BaasicTableRowDetail.propTypes = {
    dataItem: PropTypes.object.isRequired
};

export default BaasicTableRowDetail;
