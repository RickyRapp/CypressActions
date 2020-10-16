import React from 'react';
import PropTypes from 'prop-types';
import {defaultTemplate} from 'core/hoc';
import {GridDetailRow} from '@progress/kendo-react-grid';

class BaasicTableRowDetailTemplate extends GridDetailRow {
    render() {
        return (
            <div>
                {JSON.stringify(this.props.dataItem)}
            </div>
        )
    }
}

BaasicTableRowDetailTemplate.propTypes = {
    dataItem: PropTypes.object.isRequired,
    t: PropTypes.any
};

export default defaultTemplate(BaasicTableRowDetailTemplate);
