import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SimpleBaasicTableTemplate} from "themes/components";

class SimpleBaasicTable extends Component {
    render() {
        return (
            <SimpleBaasicTableTemplate {...this.props} />
        );
    }
}

SimpleBaasicTable.propTypes = {
    tableStore: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    actionsComponent: PropTypes.any,
    noRecordsComponent:PropTypes.any,
    scrollable: PropTypes.bool,
    editField: PropTypes.string
};

export default SimpleBaasicTable;
